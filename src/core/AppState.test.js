import { describe, it, expect } from 'vitest'
import { appState } from '../src/core/AppState.js'

describe('AppState', () => {
  it('debería inicializar con valores por defecto', () => {
    const state = appState.getState()
    expect(state.currentScreen).toBe('mainMenu')
    expect(state.gameState).toBeNull()
  })

  it('debería navegar a una pantalla diferente', () => {
    appState.navigate('dashboard', { test: true })
    const state = appState.getState()
    expect(state.currentScreen).toBe('dashboard')
    expect(state.screenParams.test).toBe(true)
  })

  it('debería inicializar una nueva partida', () => {
    appState.initializeNewGame()
    const state = appState.getState()
    expect(state.gameState).not.toBeNull()
    expect(state.gameState.season).toBe(1)
    expect(state.gameState.budget).toBe(1000000)
  })
})
