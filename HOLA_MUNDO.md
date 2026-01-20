/**
 * GUÍA RÁPIDA: "Hola Mundo" - PC Futbol 7 Remake
 * 
 * Esta guía te muestra cómo el proyecto funciona desde cero
 * hasta ver la interfaz en el navegador.
 */

// ============================================================
// 1. PUNTO DE ENTRADA: src/main.js
// ============================================================

/*
El archivo main.js es lo primero que se ejecuta.
Inicializa toda la aplicación.

Secuencia de inicialización:
1. Importa AppState y ScreenManager (lógica central)
2. Importa las pantallas disponibles
3. Registra las pantallas en ScreenManager
4. Intenta restaurar el estado guardado (si existe)
5. Renderiza la pantalla actual

El HTML (index.html) tiene un contenedor:
  <div id="app"></div>

Y carga el script:
  <script type="module" src="./main.js"></script>
*/

// ============================================================
// 2. ESTADO CENTRAL: src/core/AppState.js
// ============================================================

/*
AppState es un Singleton (una única instancia global).
Gestiona:
  - currentScreen: Qué pantalla mostrar
  - screenParams: Parámetros para la pantalla
  - gameState: El estado del juego
*/

class AppState {
  constructor() {
    this.currentScreen = 'mainMenu'  // Pantalla inicial
    this.screenParams = {}            // Sin parámetros inicialmente
    this.gameState = null             // Sin juego iniciado aún
  }

  // Navegar a otra pantalla
  navigate(screenName, params = {}) {
    console.log(`Navegando a: ${screenName}`)
    this.currentScreen = screenName
    this.screenParams = params
    this.saveToSession()  // Guardar para restaurar al refrescar
  }

  // Crear nueva partida
  initializeNewGame() {
    this.gameState = {
      season: 1,
      teamName: 'Mi Equipo',
      budget: 1000000,
      players: [],
      matches: [],
    }
    this.navigate('dashboard')  // Ir al dashboard
  }
}

// ============================================================
// 3. GESTOR DE PANTALLAS: src/core/ScreenManager.js
// ============================================================

/*
ScreenManager renderiza la pantalla actual en el DOM.

Proceso:
1. Lee AppState.currentScreen
2. Busca el componente registrado para esa pantalla
3. Ejecuta el componente (es una función)
4. Inserta el resultado en <div id="app"></div>
*/

class ScreenManager {
  constructor() {
    this.screens = new Map()  // Pantallas registradas
  }

  registerScreen(name, component) {
    this.screens.set(name, component)
  }

  render() {
    const screenName = appState.currentScreen
    const screenComponent = this.screens.get(screenName)

    const container = document.getElementById('app')
    container.innerHTML = ''
    
    // Ejecutar la función que define la pantalla
    // Retorna un elemento DOM
    const element = screenComponent(appState.screenParams)
    container.appendChild(element)
  }
}

// ============================================================
// 4. COMPONENTES DE PANTALLA: src/screens/*.js
// ============================================================

/*
Cada pantalla es una FUNCIÓN que retorna un elemento DOM.

Estructura simple:
1. Crear un div contenedor
2. Agregar HTML (innerHTML)
3. Agregar event listeners (botones, etc.)
4. Retornar el elemento
*/

// Ejemplo: MainMenuScreen
function MainMenuScreen() {
  const container = document.createElement('div')
  container.className = 'screen main-menu'
  container.innerHTML = `
    <div class="menu-container">
      <h1>PC Futbol 7 Remake</h1>
      <button id="newGameBtn">Nueva Partida</button>
    </div>
  `

  // Agregar interactividad
  container.querySelector('#newGameBtn').addEventListener('click', () => {
    appState.initializeNewGame()  // Crear nueva partida
    screenManager.render()         // Renderizar dashboard
  })

  return container
}

// Ejemplo: DashboardScreen
function DashboardScreen() {
  const container = document.createElement('div')
  container.className = 'screen dashboard'
  
  const game = appState.gameState
  
  container.innerHTML = `
    <h1>${game.teamName}</h1>
    <p>Temporada: ${game.season}</p>
    <p>Presupuesto: $${game.budget}</p>
  `

  return container
}

// ============================================================
// 5. CICLO DE VIDA COMPLETO
// ============================================================

/*
PASO A PASO: ¿Qué ocurre cuando ejecutas "npm run dev"?

1. CARGA (index.html)
   - Se carga el HTML
   - Se ejecuta main.js

2. INICIALIZACIÓN (main.js)
   - screenManager.registerScreen('mainMenu', MainMenuScreen)
   - screenManager.registerScreen('dashboard', DashboardScreen)
   - appState.loadFromSession() (restaurar si existe)
   - screenManager.render() → Renderiza MainMenuScreen

3. PANTALLA DE MENÚ
   - Usuario ve: "PC Futbol 7 Remake" con botón "Nueva Partida"
   - currentScreen = 'mainMenu'

4. USUARIO HACE CLICK
   - Evento onClick → appState.initializeNewGame()
   - initializeNewGame():
     a) Crea gameState con datos iniciales
     b) Llama navigate('dashboard')
     c) navigate() actualiza currentScreen y guarda en sessionStorage
   - screenManager.render() → Renderiza DashboardScreen

5. PANTALLA DEL DASHBOARD
   - Usuario ve: "Mi Equipo, Temporada 1, Presupuesto: $1000000"
   - currentScreen = 'dashboard'

6. REFRESCAR LA PÁGINA (F5)
   - appState.loadFromSession() restaura el estado
   - Vuelve al Dashboard (no al menú)
   - ¡El estado se preserva!
*/

// ============================================================
// 6. EJEMPLO PRÁCTICO: Agregar una nueva pantalla
// ============================================================

/*
Para crear una NUEVA PANTALLA:

PASO 1: Crear src/screens/SettingsScreen.js
────────────────────────────────────────
import { appState } from '../core/AppState.js'
import { screenManager } from '../core/ScreenManager.js'

export function SettingsScreen() {
  const container = document.createElement('div')
  container.className = 'screen settings'
  container.innerHTML = `
    <h1>Configuración</h1>
    <button id="backBtn">Volver</button>
  `

  container.querySelector('#backBtn').addEventListener('click', () => {
    appState.navigate('mainMenu')
    screenManager.render()
  })

  return container
}

PASO 2: Registrar en src/main.js
────────────────────────────────
import { SettingsScreen } from './screens/SettingsScreen.js'

screenManager.registerScreen('settings', SettingsScreen)

PASO 3: Navegar desde otra pantalla
────────────────────────────────────
// En MainMenuScreen
document.querySelector('#settingsBtn').addEventListener('click', () => {
  appState.navigate('settings')
  screenManager.render()
})

¡YA ESTÁ! La navegación ocurre automáticamente.
*/

// ============================================================
// 7. PERSISTENCIA: sessionStorage
// ============================================================

/*
El estado se guarda automáticamente en sessionStorage.
Formato guardado:
{
  currentScreen: 'dashboard',
  screenParams: { /* parámetros */ },
  gameState: { /* datos del juego */ }
}

Ventajas:
- Al refrescar (F5) se restaura la pantalla
- Útil para desarrollo rápido
- No afecta al navegador después de cerrar la pestaña

Para producción: Usar IndexedDB (próximamente)
*/

// ============================================================
// 8. ESTRUCTURA DE ARCHIVOS RESULTANTE
// ============================================================

/*
pcfubtol-remake/
├── src/
│   ├── main.js                    ← PUNTO DE ENTRADA
│   ├── core/
│   │   ├── AppState.js            ← ESTADO GLOBAL
│   │   └── ScreenManager.js       ← RENDERIZADOR
│   ├── screens/
│   │   ├── MainMenuScreen.js      ← PANTALLA 1
│   │   └── DashboardScreen.js     ← PANTALLA 2
│   └── styles/
│       └── global.css             ← ESTILOS
├── index.html                     ← HTML PRINCIPAL
├── package.json
├── vite.config.js
└── ...

FLUJO DE DATOS:
index.html
  ↓
  → <script src="main.js"></script>
  ↓
  → AppState (estado central)
  ← ScreenManager (renderiza)
  ↓
  → screens/ (MainMenuScreen, DashboardScreen, ...)
  ↓
  → DOM: <div id="app">...</div>
*/

// ============================================================
// 9. PRIMEROS PASOS PARA DESARROLLAR
// ============================================================

/*
1. INSTALAR DEPENDENCIAS
   $ npm install

2. INICIAR DESARROLLO
   $ npm run dev
   → Se abre http://localhost:3000 automáticamente

3. VER LA PANTALLA DE MENÚ
   → "PC Futbol 7 Remake"
   → Botón "Nueva Partida"

4. CLICKEAR "Nueva Partida"
   → Navega automáticamente al Dashboard
   → Muestra "Mi Equipo, Temporada 1, Presupuesto: $1000000"

5. MODIFICAR UN ARCHIVO (ej: MainMenuScreen.js)
   → Los cambios se ven AL INSTANTE (HMR)
   → El estado se mantiene (no pierdes tu progreso)

6. CREAR UNA NUEVA PANTALLA
   → Ver ejemplo en el paso 6 arriba
   → 3 pasos simples: crear archivo → registrar → navegar

7. AGREGAR ESTILOS
   → Editar src/styles/global.css
   → Los cambios se aplican al instante

8. HACER BUILD PARA PRODUCCIÓN
   $ npm run build
   → Genera carpeta dist/ optimizada
   → Listo para GitHub Pages, Electron, etc.
*/

// ============================================================
// 10. RESUMEN CONCEPTUAL
// ============================================================

/*
PC Futbol 7 Remake usa una arquitectura SIMPLE pero PODEROSA:

                    ┌─ AppState (Estado)
                    │  - currentScreen
                    │  - screenParams
                    │  - gameState
                    │
                    ↓
              ┌─────────────┐
              │ScreenManager│
              └─────────────┘
                    ↓
      ┌─────────────────────────────┐
      │   Pantalla actual renderizada│
      │                              │
      │ MainMenuScreen               │
      │ DashboardScreen              │
      │ TeamManagementScreen (prox)  │
      │ ...                          │
      └─────────────────────────────┘
                    ↓
            <div id="app">
              (elemento activo)
            </div>

NAVEGACIÓN:
1. Usuario interactúa (click, etc.)
2. appState.navigate('nombrePantalla')
3. screenManager.render()
4. Pantalla se actualiza al instante

¡ESO ES TODO! Es tan simple como parece.
*/

// ============================================================
// ARCHIVO: LISTO PARA USAR
// ============================================================

/*
PRÓXIMOS ARCHIVOS A EXPLORAR:

1. src/main.js
   - Lee este archivo para ver la inicialización real

2. src/core/AppState.js
   - Lee para entender el estado global

3. src/core/ScreenManager.js
   - Lee para ver cómo se renderizan las pantallas

4. src/screens/MainMenuScreen.js
   - Ve cómo se estructura una pantalla

5. src/styles/global.css
   - Entiende el diseño visual

6. docs/DEVELOPMENT.md
   - Guía completa de desarrollo

7. docs/STRUCTURE.md
   - Mapa completo del proyecto
*/

export default 'Este archivo es solo documentación. Ver src/main.js para el código real.'
