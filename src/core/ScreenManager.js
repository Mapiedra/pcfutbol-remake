/**
 * ScreenManager - Gestiona las pantallas y su renderizado
 */
import { appState } from './AppState.js'
import { soundEffects } from './SoundEffects.js'

class ScreenManager {
  constructor() {
    this.screens = new Map()
    this.currentScreenInstance = null
  }

  /**
   * Registra una pantalla
   * @param {string} name - Nombre de la pantalla
   * @param {function} screenComponent - Componente/función que renderiza la pantalla
   */
  registerScreen(name, screenComponent) {
    this.screens.set(name, screenComponent)
    console.log(`[ScreenManager] Pantalla registrada: ${name}`)
  }

  /**
   * Renderiza la pantalla actual
   */
  render() {
    const screenName = appState.currentScreen
    const screenComponent = this.screens.get(screenName)

    if (!screenComponent) {
      console.error(`[ScreenManager] Pantalla no encontrada: ${screenName}`)
      return
    }

    const container = document.getElementById('app')
    if (!container) {
      console.error('[ScreenManager] Contenedor #app no encontrado')
      return
    }

    container.innerHTML = ''
    this.currentScreenInstance = screenComponent(appState.screenParams)
    container.appendChild(this.currentScreenInstance)

    // Vincular efectos de sonido automáticamente a botones y elementos clickables
    soundEffects.attachToSelectors('button, .clickable, a')

    console.log(`[ScreenManager] Pantalla renderizada: ${screenName}`)
  }

  /**
   * Re-renderiza la pantalla actual
   */
  reRender() {
    this.render()
  }
}

export const screenManager = new ScreenManager()
