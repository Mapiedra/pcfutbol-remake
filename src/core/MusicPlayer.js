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
        this.currentFolder = appState.settings.music.folder || 'PC-Futbol-Remake'
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
            // Cargar playlist según la carpeta seleccionada
            const folderPath = `${this.basePath}${this.currentFolder}/`
            const response = await fetch(encodeURI(`${folderPath}playlist.json`))
            if (!response.ok) {
                throw new Error(`No se pudo cargar playlist.json en ${this.currentFolder}: ${response.statusText}`)
            }
            Logger.debug(`[MusicPlayer] Cargando playlist desde: ${folderPath}`)
            const files = await response.json()

            if (Array.isArray(files) && files.length > 0) {
                this.playlist = files
                Logger.info(`[MusicPlayer] Playlist cargada (${this.currentFolder}): ${this.playlist.length} canciones`)

                // Aplicar configuración inicial
                this.applySettings()

                // Configurar arranque con interacción de usuario (para navegadores que bloquean autoplay)
                this.setupAutoplayHandlers()

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
     * Configura listeners para iniciar el audio con la primera interacción del usuario
     * Necesario para políticas de autoplay de navegadores
     */
    setupAutoplayHandlers() {
        const handleInteraction = () => {
            // Si ya está sonando, solo limpiamos
            if (this.isPlaying && !this.audio.paused) {
                this.cleanupAutoplayHandlers(handleInteraction)
                return
            }

            // Si no está muteado y no está sonando, intentamos reproducir
            if (!appState.settings.music.muted) {
                Logger.debug('[MusicPlayer] Intentando reproducir por interacción de usuario')
                if (this.currentTrack) {
                    this.play()
                } else {
                    this.playRandom()
                }
            }

            // Limpiamos los listeners después del primer intento
            this.cleanupAutoplayHandlers(handleInteraction)
        }

        // Guardamos la referencia para poder removerlos
        this.interactionHandler = handleInteraction

        document.addEventListener('click', handleInteraction)
        document.addEventListener('keydown', handleInteraction)
        document.addEventListener('touchstart', handleInteraction)
    }

    /**
     * Limpia los listeners de interacción
     */
    cleanupAutoplayHandlers(handler) {
        const h = handler || this.interactionHandler
        if (h) {
            document.removeEventListener('click', h)
            document.removeEventListener('keydown', h)
            document.removeEventListener('touchstart', h)
        }
    }

    /**
     * Maneja los cambios de configuración
     * @param {object} settings - Nuevos ajustes { volume, muted }
     */
    handleSettingsChange(settings) {
        // 1. Actualizar volumen
        this.audio.volume = settings.volume / 100

        // 2. Manejar Cambio de Carpeta
        if (settings.folder && settings.folder !== this.currentFolder) {
            Logger.info(`[MusicPlayer] Cambiando carpeta de música a: ${settings.folder}`)
            this.currentFolder = settings.folder
            this.isPlaying = false
            this.audio.pause()
            this.init() // Recargar playlist y empezar de nuevo
            return // init se encarga del resto
        }

        // 3. Manejar Mute/Unmute
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
        this.audio.src = encodeURI(`${this.basePath}${this.currentFolder}/${this.currentTrack}`)

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
