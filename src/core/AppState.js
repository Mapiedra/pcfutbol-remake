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
      season: 1,
      teamName: 'Mi Equipo',
      budget: 1000000,
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
