/**
 * Pantalla Principal - Menú de inicio
 */
import { appState } from '../core/AppState.js'
import { screenManager } from '../core/ScreenManager.js'

export function MainMenuScreen() {
  const container = document.createElement('div')
  container.className = 'screen main-menu'
  container.innerHTML = `
    <div class="menu-container">
      <div class="menu-header">
        <h1>⚽ PC Futbol 7 Remake</h1>
        <p class="subtitle">Gestor de Fútbol Moderno</p>
        <p style="color: #10b981; font-size: 0.9rem; margin-top: 0.5rem;">✅ ¡Hola Mundo! Sistema funcionando correctamente</p>
      </div>
      
      <div class="menu-buttons">
        <button class="btn btn-primary" id="newGameBtn">
          🎮 Nueva Partida
        </button>
        <button class="btn btn-secondary" id="loadGameBtn">
          📁 Cargar Partida
        </button>
        <button class="btn btn-secondary" id="settingsBtn">
          ⚙️ Configuración
        </button>
        <button class="btn btn-secondary" id="infoBtn" style="background-color: #6b7280;">
          ℹ️ Información
        </button>
      </div>

      <div class="menu-footer">
        <p>v0.1.0 - Versión de desarrollo</p>
        <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #9ca3af;">
          🚀 Stack: Vanilla JS + Vite + IndexedDB<br>
          📱 PWA Installable • 💾 Offline Ready
        </p>
      </div>
    </div>
  `

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
🎮 PC Futbol 7 Remake v0.1.0

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
