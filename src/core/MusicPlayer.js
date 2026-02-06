/**
 * MusicPlayer - Reproductor de música de fondo
 * Gestiona la reproducción aleatoria de música y los ajustes de volumen
 */
import { appState } from './AppState.js'
import { Logger } from '../config.js'

class MusicPlayer {
    constructor() {
        this.audio = new Audio()
        this.playlist = []
        this.basePath = '/assets/music/'
        this.currentTrack = null
        this.isPlaying = false

        // Configuración inicial del objeto Audio
        this.audio.loop = false
    }

    /**
     * Inicializa el reproductor
     */
    async init() {
        try {
            // Cargar playlist
            const response = await fetch(`${this.basePath}playlist.json`)
            if (!response.ok) {
                throw new Error(`No se pudo cargar playlist.json: ${response.statusText}`)
            }

            const files = await response.json()

            if (Array.isArray(files) && files.length > 0) {
                this.playlist = files
                Logger.info(`[MusicPlayer] Playlist cargada: ${this.playlist.length} canciones`)

                // Aplicar configuración inicial
                this.applySettings()

                // Suscribirse a cambios en AppState
                appState.subscribe((event, data) => {
                    if (event === 'settingChanged' && data.category === 'music') {
                        this.handleSettingsChange(data.setting)
                    }
                })

                // Evento cuando termina una canción
                this.audio.addEventListener('ended', () => {
                    Logger.debug('[MusicPlayer] Canción terminada, siguiente...')
                    this.playRandom()
                })

                // Intentar reproducir si no está muteado
                if (!appState.settings.music.muted) {
                    this.playRandom()
                }

            } else {
                Logger.warn('[MusicPlayer] La playlist está vacía o no es un array válido')
            }
        } catch (error) {
            Logger.warn('[MusicPlayer] Error al inicializar:', error)
        }
    }

    /**
     * Maneja los cambios de configuración
     * @param {object} settings - Nuevos ajustes { volume, muted }
     */
    handleSettingsChange(settings) {
        // 1. Actualizar volumen
        this.audio.volume = settings.volume / 100

        // 2. Manejar Mute/Unmute
        if (settings.muted) {
            if (!this.audio.paused) {
                this.audio.pause()
                this.audio.currentTime = 0
                this.isPlaying = false
                Logger.debug('[MusicPlayer] Detenido por mute')
            }
        } else {
            // Si NO está muteado (UNMUTE o cambio de volumen)

            // Solo iniciamos la reproducción si estaba parado
            if (this.audio.paused) {
                if (this.currentTrack) {
                    // Empezamos desde el principio
                    this.audio.currentTime = 0
                    this.play()
                } else {
                    this.playRandom()
                }
            }
            // Si ya estaba sonando, el cambio de volumen ya se aplicó arriba y sigue reproduciendo
        }
    }

    /**
     * Aplica los ajustes actuales de AppState
     */
    applySettings() {
        const settings = appState.settings.music
        this.audio.volume = settings.volume / 100
    }

    /**
     * Reproduce una canción aleatoria
     */
    playRandom() {
        if (this.playlist.length === 0) return

        // Evitar repetir la misma canción inmediatamente si hay opciones
        let nextTrack
        let attempts = 0
        do {
            const index = Math.floor(Math.random() * this.playlist.length)
            nextTrack = this.playlist[index]
            attempts++
        } while (this.playlist.length > 1 && nextTrack === this.currentTrack && attempts < 5)

        this.currentTrack = nextTrack
        this.audio.src = `${this.basePath}${this.currentTrack}`

        // Solo reproducir si NO está muteado
        if (!appState.settings.music.muted) {
            this.play()
        }
    }

    /**
     * Intenta reproducir el audio
     */
    play() {
        this.audio.play()
            .then(() => {
                this.isPlaying = true
                Logger.info('[MusicPlayer] Reproduciendo:', this.currentTrack)
            })
            .catch(error => {
                // El error "DOMException: The play() request was interrupted" es común si se cambia rápido de canción
                // O si el navegador bloquea el autoplay
                if (error.name !== 'AbortError') {
                    Logger.warn('[MusicPlayer] No se pudo reproducir:', error)
                }
            })
    }
}

export const musicPlayer = new MusicPlayer()
