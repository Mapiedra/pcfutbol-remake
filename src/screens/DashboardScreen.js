/**
 * Pantalla de Dashboard - Panel principal del juego
 */
import { appState } from '../core/AppState.js'
import { screenManager } from '../core/ScreenManager.js'

export function DashboardScreen() {
  const container = document.createElement('div')
  container.className = 'screen dashboard'
  
  const game = appState.gameState
  
  container.innerHTML = `
    <div class="dashboard-header">
      <h1>${game.teamName}</h1>
      <div class="header-info">
        <span class="season">Temporada ${game.season}</span>
        <span class="budget">Presupuesto: $${(game.budget / 1000000).toFixed(1)}M</span>
      </div>
    </div>

    <div class="dashboard-grid">
      <div class="dashboard-card">
        <h2>Equipo</h2>
        <p class="card-info">Jugadores: ${game.players.length}</p>
        <button class="btn btn-small" id="manageTeamBtn">Gestionar Equipo</button>
      </div>

      <div class="dashboard-card">
        <h2>Partidos</h2>
        <p class="card-info">Próximos: 0</p>
        <button class="btn btn-small" id="matchesBtn">Ver Calendario</button>
      </div>

      <div class="dashboard-card">
        <h2>Economía</h2>
        <p class="card-info">Saldo: $${(game.budget / 1000000).toFixed(1)}M</p>
        <button class="btn btn-small" id="economyBtn">Ver Finanzas</button>
      </div>

      <div class="dashboard-card">
        <h2>Instalaciones</h2>
        <p class="card-info">Nivel: Básico</p>
        <button class="btn btn-small" id="facilitiesBtn">Mejorar</button>
      </div>
    </div>

    <div class="dashboard-footer">
      <button class="btn btn-secondary" id="backBtn">Volver al Menú</button>
      <button class="btn btn-secondary" id="saveBtn">Guardar Partida</button>
    </div>
  `

  // Event Listeners
  container.querySelector('#manageTeamBtn').addEventListener('click', () => {
    appState.navigate('teamManagement')
    screenManager.render()
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
