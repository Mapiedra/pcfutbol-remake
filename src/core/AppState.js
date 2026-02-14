/**
 * AppState - Estado central de la aplicación
 * Gestiona el estado global del juego y la navegación
 */
class AppState {
  constructor() {
    this.currentScreen = 'mainMenu'
    this.screenParams = {}
    this.gameState = null
    this.isInitialized = false
    this.listeners = []
    this.settings = {
      music: { volume: 100, muted: false, folder: 'PC-Futbol-Remake' },
      effects: { volume: 100, muted: false },
      voices: { volume: 100, muted: false }
    }
    this.loadSettings()
  }

  /**
   * Guarda la configuración en localStorage
   */
  saveSettings() {
    try {
      localStorage.setItem('pcfutbol_settings', JSON.stringify(this.settings))
      console.log('[AppState] Configuración guardada')
    } catch (error) {
      console.error('[AppState] Error al guardar configuración:', error)
    }
  }

  /**
   * Carga la configuración desde localStorage
   */
  loadSettings() {
    try {
      const saved = localStorage.getItem('pcfutbol_settings')
      if (saved) {
        // Merge profundo simple para asegurar que nuevos settings tengan valor default
        const parsed = JSON.parse(saved)
        this.settings = { ...this.settings, ...parsed }
      }
    } catch (error) {
      console.error('[AppState] Error al cargar configuración:', error)
    }
  }

  /**
   * Suscribe una función a los cambios de estado
   * @param {Function} callback - Función a ejecutar cuando cambia el estado
   * @returns {Function} - Función para cancelar la suscripción
   */
  subscribe(callback) {
    this.listeners.push(callback)
    return () => this.listeners = this.listeners.filter(l => l !== callback)
  }

  /**
   * Notifica a los suscriptores de un cambio de estado
   * @param {string} event - Tipo de evento
   * @param {object} data - Datos del evento
   */
  notify(event, data) {
    this.listeners.forEach(callback => callback(event, data))
  }

  /**
   * Actualiza una configuración específica
   * @param {string} category - 'music', 'effects', 'voices'
   * @param {object} values - { volume, muted }
   */
  updateSetting(category, values) {
    if (this.settings[category]) {
      this.settings[category] = { ...this.settings[category], ...values }
      this.saveSettings()
      this.notify('settingChanged', { category, setting: this.settings[category] })
    }
  }

  /**
   * Navega a una pantalla diferente
   * @param {string} screenName - Nombre de la pantalla
   * @param {object} params - Parámetros a pasar a la pantalla
   */
  navigate(screenName, params = {}) {
    console.log(`[AppState] Navegando a: ${screenName}`, params)
    this.currentScreen = screenName
    this.screenParams = params
    this.saveToSession()
  }

  /**
   * Guarda el estado en sessionStorage
   */
  saveToSession() {
    try {
      sessionStorage.setItem('appState', JSON.stringify({
        currentScreen: this.currentScreen,
        screenParams: this.screenParams,
        gameState: this.gameState,
      }))
    } catch (error) {
      console.error('[AppState] Error al guardar en sessionStorage:', error)
    }
  }

  /**
   * Carga el estado desde sessionStorage
   */
  loadFromSession() {
    try {
      const saved = sessionStorage.getItem('appState')
      if (saved) {
        const data = JSON.parse(saved)
        this.currentScreen = data.currentScreen
        this.screenParams = data.screenParams
        this.gameState = data.gameState
        console.log('[AppState] Estado restaurado desde sesión')
      }
    } catch (error) {
      console.error('[AppState] Error al cargar de sessionStorage:', error)
    }
  }

  /**
   * Inicializa una nueva partida
   */
  initializeNewGame() {
    this.gameState = {
      season: '2025/2026',
      teamName: 'Mi Equipo',
      budget: 1500000000,
      players: [],
      matches: [],
      lastUpdate: new Date().toISOString(),
    }
    this.navigate('dashboard')
  }

  /**
   * Obtiene el estado actual
   */
  getState() {
    return {
      currentScreen: this.currentScreen,
      screenParams: this.screenParams,
      gameState: this.gameState,
    }
  }
}

// Exportar instancia única (Singleton)
export const appState = new AppState()
