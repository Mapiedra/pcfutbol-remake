/**
 * Pantalla Principal - Menú de inicio
 */
import { appState } from '../core/AppState.js'
import { screenManager } from '../core/ScreenManager.js'
import mainMenuTemplate from '../templates/main-menu.html?raw'

export function MainMenuScreen() {
  const container = document.createElement('div')
  container.className = 'screen main-menu'
  container.innerHTML = mainMenuTemplate

  // Event Listeners
  container.querySelector('#newGameBtn').addEventListener('click', () => {
    console.log('✅ [MainMenu] Nueva partida iniciada')
    appState.initializeNewGame()
    screenManager.render()
  })

  container.querySelector('#loadGameBtn').addEventListener('click', () => {
    console.log('📁 [MainMenu] Cargar partida')
    appState.navigate('loadGame')
    screenManager.render()
  })

  container.querySelector('#settingsBtn').addEventListener('click', () => {
    console.log('⚙️ [MainMenu] Abriendo configuración')
    appState.navigate('settings')
    screenManager.render()
  })

  container.querySelector('#infoBtn').addEventListener('click', () => {
    alert(`
🎮 PC Futbol Remake v0.1.0

¡Sistema completamente funcional!

✅ Estado central (AppState)
✅ Navegación entre pantallas
✅ Persistencia en sessionStorage
✅ Hot Module Replacement (HMR)
✅ Diseño responsive
✅ PWA installable

Haz click en "Nueva Partida" para comenzar.
    `)
  })

  return container
}

// HMR Support
if (import.meta.hot) {
  import.meta.hot.accept((newModule) => {
    if (newModule) {
      screenManager.registerScreen('mainMenu', newModule.MainMenuScreen)
      if (appState.currentScreen === 'mainMenu') {
        screenManager.reRender()
      }
    }
  })
}
