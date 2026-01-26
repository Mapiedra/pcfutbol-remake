/**
 * Pantalla de Dashboard - Panel principal del juego
 */
import { appState } from '../core/AppState.js'
import { screenManager } from '../core/ScreenManager.js'
import dashboardTemplate from '../templates/dashboard.html?raw'
import { renderTemplate } from '../utils/templateUtils.js'

export function DashboardScreen() {
  const container = document.createElement('div')
  container.className = 'screen dashboard'

  const game = appState.gameState

  // Guard: Si no hay estado de juego, volver al menú
  if (!game) {
    console.warn('[Dashboard] No hay estado de juego, redirigiendo al menú')
    setTimeout(() => {
      appState.navigate('mainMenu')
      screenManager.render()
    }, 0)
    return container
  }

  const viewData = {
    teamName: game.teamName,
    season: game.season,
    budgetDisplay: (game.budget / 1000000).toFixed(1),
    playersCount: game.players.length
  }

  container.innerHTML = renderTemplate(dashboardTemplate, viewData)

  // Event Listeners
  container.querySelector('#manageTeamBtn').addEventListener('click', () => {
    appState.navigate('teamManagement')
    screenManager.render()
  })

  container.querySelector('#matchesBtn').addEventListener('click', () => {
    // TODO: Implement matches screen
    console.log('TODO: Ver calendario')
  })

  container.querySelector('#economyBtn').addEventListener('click', () => {
    // TODO: Implement economy screen
    console.log('TODO: Ver finanzas')
  })

  container.querySelector('#facilitiesBtn').addEventListener('click', () => {
    // TODO: Implement facilities screen
    console.log('TODO: Mejorar instalaciones')
  })

  container.querySelector('#backBtn').addEventListener('click', () => {
    appState.navigate('mainMenu')
    screenManager.render()
  })

  container.querySelector('#saveBtn').addEventListener('click', () => {
    console.log('[Dashboard] Guardando partida...')
    appState.saveToSession()
    alert('Partida guardada')
  })

  return container
}

// HMR Support
if (import.meta.hot) {
  import.meta.hot.accept((newModule) => {
    if (newModule) {
      screenManager.registerScreen('dashboard', newModule.DashboardScreen)
      if (appState.currentScreen === 'dashboard') {
        screenManager.reRender()
      }
    }
  })
}
