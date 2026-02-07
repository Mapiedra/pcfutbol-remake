/**
 * SoundEffects - Biblioteca de sonidos generados por JS
 * Proporciona efectos de sonido para la interfaz sintetizados mediante Web Audio API
 */
import { appState } from './AppState.js'
import { Logger } from '../config.js'

class SoundEffects {
    constructor() {
        this.ctx = null
        this.masterGain = null
        this.enabled = false

        // Configuración inicial
        this._initAudioContext()

        // Suscribirse a cambios en AppState
        appState.subscribe((event, data) => {
            if (event === 'settingChanged' && data.category === 'effects') {
                this.updateVolume()
            }
        })
    }

    /**
     * Inicializa el contexto de audio
     * @private
     */
    _initAudioContext() {
        // El contexto se crea pero suele nacer 'suspended' hasta interacción del usuario
        const AudioContextClass = window.AudioContext || window.webkitAudioContext
        if (!AudioContextClass) {
            Logger.warn('[SoundEffects] Web Audio API no soportada en este navegador')
            return
        }

        this.ctx = new AudioContextClass()
        this.masterGain = this.ctx.createGain()
        this.masterGain.connect(this.ctx.destination)

        this.updateVolume()
        this.enabled = true

        // Manejar el desbloqueo del AudioContext por el navegador
        const resume = () => {
            if (this.ctx.state === 'suspended') {
                this.ctx.resume()
            }
            document.removeEventListener('click', resume)
            document.removeEventListener('keydown', resume)
        }
        document.addEventListener('click', resume)
        document.addEventListener('keydown', resume)
    }

    /**
     * Actualiza el volumen según la configuración de AppState
     */
    updateVolume() {
        if (!this.masterGain) return

        const { volume, muted } = appState.settings.effects
        // Convertimos 0-100 a 0-1
        const targetVolume = muted ? 0 : volume / 100

        // Suavizamos el cambio de volumen
        if (this.ctx && this.ctx.state !== 'closed') {
            this.masterGain.gain.setTargetAtTime(targetVolume, this.ctx.currentTime, 0.05)
        } else {
            this.masterGain.gain.value = targetVolume
        }
    }

    /**
     * Ejecuta una envolvente de ganancia simple
     * @private
     */
    _createEnvelope(gainNode, startTime, duration, attack = 0.01, release = 0.1) {
        gainNode.gain.setValueAtTime(0, startTime)
        gainNode.gain.linearRampToValueAtTime(1, startTime + attack)
        gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + attack + release)
        gainNode.gain.setValueAtTime(0, startTime + attack + release + 0.01)
    }

    /**
     * Sonido de Click: Rápido y limpio
     */
    playClick() {
        if (!this.enabled || this.ctx.state !== 'running') return

        const now = this.ctx.currentTime
        const osc = this.ctx.createOscillator()
        const gain = this.ctx.createGain()

        osc.type = 'sine'
        osc.frequency.setValueAtTime(800, now)
        osc.frequency.exponentialRampToValueAtTime(100, now + 0.1)

        gain.connect(this.masterGain)
        osc.connect(gain)

        this._createEnvelope(gain, now, 0.1, 0.005, 0.08)

        osc.start(now)
        osc.stop(now + 0.15)
    }

    /**
     * Sonido de Hover: Sutil y cortito
     */
    playHover() {
        if (!this.enabled || this.ctx.state !== 'running') return

        const now = this.ctx.currentTime
        const osc = this.ctx.createOscillator()
        const gain = this.ctx.createGain()

        osc.type = 'sine'
        osc.frequency.setValueAtTime(1200, now)

        gain.connect(this.masterGain)
        osc.connect(gain)

        gain.gain.setValueAtTime(0, now)
        gain.gain.linearRampToValueAtTime(0.1, now + 0.01)
        gain.gain.linearRampToValueAtTime(0, now + 0.03)

        osc.start(now)
        osc.stop(now + 0.05)
    }

    /**
     * Sonido de Notificación: Campana suave
     */
    playNotification() {
        if (!this.enabled || this.ctx.state !== 'running') return

        const now = this.ctx.currentTime
        const osc = this.ctx.createOscillator()
        const gain = this.ctx.createGain()

        osc.type = 'sine'
        osc.frequency.setValueAtTime(880, now) // A5
        osc.frequency.exponentialRampToValueAtTime(440, now + 0.5) // A4

        gain.connect(this.masterGain)
        osc.connect(gain)

        gain.gain.setValueAtTime(0, now)
        gain.gain.linearRampToValueAtTime(0.3, now + 0.05)
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5)

        osc.start(now)
        osc.stop(now + 0.6)
    }

    /**
     * Sonido de Transición: Barrido suave
     */
    playTransition() {
        if (!this.enabled || this.ctx.state !== 'running') return

        const now = this.ctx.currentTime
        const osc = this.ctx.createOscillator()
        const gain = this.ctx.createGain()
        const filter = this.ctx.createBiquadFilter()

        osc.type = 'sine'
        osc.frequency.setValueAtTime(200, now)
        osc.frequency.exponentialRampToValueAtTime(800, now + 0.3)

        filter.type = 'lowpass'
        filter.frequency.setValueAtTime(1000, now)

        osc.connect(filter)
        filter.connect(gain)
        gain.connect(this.masterGain)

        gain.gain.setValueAtTime(0, now)
        gain.gain.linearRampToValueAtTime(0.2, now + 0.1)
        gain.gain.linearRampToValueAtTime(0, now + 0.3)

        osc.start(now)
        osc.stop(now + 0.35)
    }

    /**
     * Sonido de Éxito: Arpegio ascendente más brillante
     */
    playSuccess() {
        if (!this.enabled || this.ctx.state !== 'running') return

        const now = this.ctx.currentTime
        const notes = [523.25, 659.25, 783.99, 1046.50] // C5, E5, G5, C6

        notes.forEach((freq, i) => {
            const time = now + (i * 0.07)
            const osc = this.ctx.createOscillator()
            const gain = this.ctx.createGain()

            // Mezcla de seno y triángulo para un sonido más rico
            osc.type = i === 3 ? 'sine' : 'triangle'
            osc.frequency.setValueAtTime(freq, time)

            gain.connect(this.masterGain)
            osc.connect(gain)

            this._createEnvelope(gain, time, 0.3, 0.01, 0.2)

            osc.start(time)
            osc.stop(time + 0.4)
        })
    }

    /**
     * Sonido de Error: Frecuencia baja y disonante
     */
    playError() {
        if (!this.enabled || this.ctx.state !== 'running') return

        const now = this.ctx.currentTime

        // Dos tonos disonantes
        const freqs = [150, 155]

        freqs.forEach(freq => {
            const osc = this.ctx.createOscillator()
            const gain = this.ctx.createGain()

            osc.type = 'sawtooth'
            osc.frequency.setValueAtTime(freq, now)
            osc.frequency.exponentialRampToValueAtTime(40, now + 0.3)

            const filter = this.ctx.createBiquadFilter()
            filter.type = 'lowpass'
            filter.frequency.setValueAtTime(400, now)

            osc.connect(filter)
            filter.connect(gain)
            gain.connect(this.masterGain)

            this._createEnvelope(gain, now, 0.4, 0.02, 0.3)

            osc.start(now)
            osc.stop(now + 0.45)
        })
    }
    /**
     * Vincula sonidos de clic y hover a un elemento
     * @param {HTMLElement} element - Elemento al que se vincularán los sonidos
     */
    attachToElement(element) {
        if (!element) return

        element.addEventListener('mouseenter', () => this.playHover())
        element.addEventListener('click', () => this.playClick())
    }

    /**
     * Vincula sonidos a todos los elementos que coincidan con un selector
     * @param {string} selector - Selector CSS (ej: 'button, .interactive')
     */
    attachToSelectors(selector) {
        const elements = document.querySelectorAll(selector)
        elements.forEach(el => this.attachToElement(el))
    }

    /**
     * Reproduce un sonido por su nombre de clave
     * @param {string} type - 'click', 'hover', 'success', 'error', 'notification', 'transition'
     */
    play(type) {
        switch (type.toLowerCase()) {
            case 'click': this.playClick(); break;
            case 'hover': this.playHover(); break;
            case 'success': this.playSuccess(); break;
            case 'error': this.playError(); break;
            case 'notification': this.playNotification(); break;
            case 'transition': this.playTransition(); break;
            default: Logger.warn(`[SoundEffects] Sonido desconocido: ${type}`);
        }
    }
}

// Exportar instancia única (Singleton)
export const soundEffects = new SoundEffects()
