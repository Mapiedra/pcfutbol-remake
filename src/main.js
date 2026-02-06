/**
 * Archivo principal de la aplicación
 */
import { CONFIG, Logger, Browser, Device } from './config.js'
import { appState } from './core/AppState.js'
import { screenManager } from './core/ScreenManager.js'
import { MainMenuScreen } from './screens/MainMenuScreen.js'
import { DashboardScreen } from './screens/DashboardScreen.js'
import { createHeader } from './components/Header.js'
import { showWelcomeMessage } from './utils/welcome.js'

/**
 * Inicializa la aplicación
 */
function initializeApp() {
  // ✅ Log de inicio
  Logger.info(`🚀 Iniciando ${CONFIG.name} v${CONFIG.version}`, {
    entorno: CONFIG.env,
    apiUrl: CONFIG.apiUrl,
    navegador: `${Object.entries(Browser).find(([key]) => Browser[key])?.[0] || 'Desconocido'}`,
    dispositivo: `${Object.entries(Device).find(([key]) => Device[key])?.[0] || 'Desconocido'}`,
  })

  // Limpiar consola en producción
  if (CONFIG.isProduction) {
    console.clear()
  }

  // Renderizar Header global
  const header = createHeader()
  const appContainer = document.getElementById('app')
  if (appContainer) {
    document.body.insertBefore(header, appContainer)
  }

  // Mostrar bienvenida (solo en desarrollo)
  if (CONFIG.isDev) {
    showWelcomeMessage()
  }

  // Registrar pantallas
  screenManager.registerScreen('mainMenu', MainMenuScreen)
  screenManager.registerScreen('dashboard', DashboardScreen)

  // Intentar cargar estado guardado
  appState.loadFromSession()

  // Renderizar pantalla actual
  screenManager.render()

  // 📱 Time-travel debugging (solo en desarrollo)
  if (CONFIG.enableTimeTravel) {
    window.appState = appState
    window.screenManager = screenManager
    Logger.debug('Time-travel debugging habilitado', {
      acceso: 'window.appState y window.screenManager en consola',
    })
  }

  // 📊 Analytics (solo en producción)
  if (CONFIG.enableAnalytics) {
    Logger.info('Analytics inicializado')
    // TODO: Agregar Google Analytics, Mixpanel, etc
  }
}

// Inicializar la aplicación
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp)
} else {
  // Si el DOM ya está listo (por ejemplo, durante un HMR), inicializar directamente
  initializeApp()
}

// ⚠️ Error handling global
window.addEventListener('error', (event) => {
  Logger.error('Error global capturado', {
    mensaje: event.message,
    archivo: event.filename,
    linea: event.lineno,
  })
})

window.addEventListener('unhandledrejection', (event) => {
  Logger.error('Promise rechazada no manejada', event.reason)
})

// Hot reload en desarrollo
if (import.meta.hot) {
  import.meta.hot.accept()
}
