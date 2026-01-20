# 📊 Diagrama Visual del Proyecto

## Estructura de archivos (Vista de árbol)

```
PC-FUTBOL-7-REMAKE/
│
├── 📄 index.html                           ← HTML PRINCIPAL
│   └─ Carga: <script src="./main.js"></script>
│   └─ Contiene: <div id="app"></div>
│
├── 📂 src/
│   │
│   ├── 📄 main.js                          ← PUNTO DE ENTRADA
│   │   ├─ Importa AppState y ScreenManager
│   │   ├─ Registra pantallas
│   │   └─ Renderiza pantalla inicial
│   │
│   ├── 📂 core/                            ← LÓGICA CENTRAL
│   │   ├── 📄 AppState.js                  ← ESTADO (Singleton)
│   │   │   ├─ Propiedades:
│   │   │   │  ├─ currentScreen
│   │   │   │  ├─ screenParams
│   │   │   │  └─ gameState
│   │   │   └─ Métodos:
│   │   │      ├─ navigate(screen, params)
│   │   │      ├─ initializeNewGame()
│   │   │      ├─ saveToSession()
│   │   │      └─ loadFromSession()
│   │   │
│   │   ├── 📄 ScreenManager.js            ← RENDERIZADOR
│   │   │   ├─ Métodos:
│   │   │   │  ├─ registerScreen(name, fn)
│   │   │   │  ├─ render()
│   │   │   │  └─ reRender()
│   │   │   └─ Usa: AppState + DOM
│   │   │
│   │   └── 📄 AppState.test.js             ← TESTS
│   │
│   ├── 📂 screens/                         ← PANTALLAS
│   │   ├── 📄 MainMenuScreen.js            ← Menú principal ✅
│   │   │   ├─ "Nueva Partida" button
│   │   │   ├─ "Cargar Partida" button
│   │   │   └─ "Configuración" button
│   │   │
│   │   ├── 📄 DashboardScreen.js           ← Dashboard ✅
│   │   │   ├─ Nombre del equipo
│   │   │   ├─ Información: Temporada, Presupuesto
│   │   │   ├─ Tarjetas: Equipo, Partidos, Economía, Instalaciones
│   │   │   └─ Botones: Guardar, Volver
│   │   │
│   │   ├── 📄 TeamManagementScreen.js      ← (próximamente)
│   │   ├── 📄 MatchesScreen.js             ← (próximamente)
│   │   └── 📄 SettingsScreen.js            ← (próximamente)
│   │
│   └── 📂 styles/
│       ├── 📄 global.css                   ← ESTILOS ✅
│       │   ├─ Variables CSS (colores, sombras)
│       │   ├─ Componentes (.btn, .screen, .card)
│       │   ├─ Layout responsive
│       │   └─ Animaciones
│       │
│       ├── 📄 screens.css                  ← (próximamente)
│       └── 📄 components.css               ← (próximamente)
│
├── 📂 public/
│   └── 📄 manifest.json                    ← CONFIG PWA
│
├── 📂 docs/
│   ├── 📄 STRUCTURE.md                     ← Estructura completa
│   ├── 📄 DEVELOPMENT.md                   ← Guía de desarrollo
│   └── 📄 ARCHITECTURE.md                  ← (próximamente)
│
├── 📄 package.json                         ← NPM CONFIG
│   ├─ Dependencies: jquery, vite
│   └─ Scripts: dev, build, preview
│
├── 📄 vite.config.js                       ← VITE CONFIG
├── 📄 .eslintrc.json                       ← LINT CONFIG
├── 📄 .gitignore                           ← GIT CONFIG
├── 📄 README.md                            ← DESCRIPCIÓN
├── 📄 SETUP_COMPLETE.md                    ← RESUMEN SETUP
└── 📄 HOLA_MUNDO.md                        ← GUÍA HOLA MUNDO
```

---

## Flujo de datos y navegación

```
┌──────────────────────────────────────────────────────────┐
│                      INDEX.HTML                          │
│                                                          │
│  <div id="app">                                          │
│    (Se rellena dinámicamente)                            │
│  </div>                                                  │
│                                                          │
│  <script type="module" src="main.js"></script>           │
└──────────────────────────────────────────────────────────┘
                           │
                           ↓
              ┌────────────────────────┐
              │     MAIN.JS            │
              │  (Inicializador)       │
              └────────────────────────┘
                           │
            ┌──────────────┼──────────────┐
            ↓              ↓              ↓
      ┌──────────┐  ┌──────────┐  ┌───────────────┐
      │AppState  │  │ScreenMgr │  │Registra       │
      │(crear)   │  │(crear)   │  │Pantallas      │
      └──────────┘  └──────────┘  └───────────────┘
            │              │              │
            └──────────────┼──────────────┘
                           ↓
              ┌────────────────────────┐
              │   LOADFROMSESSION()    │
              │ (restaurar si existe)  │
              └────────────────────────┘
                           │
                           ↓
              ┌────────────────────────┐
              │   SCREENMANAGER.RENDER │
              │   → MainMenuScreen     │
              └────────────────────────┘
                           │
                           ↓
              ┌────────────────────────┐
              │  APPSTATE:             │
              │  currentScreen =       │
              │  "mainMenu"            │
              └────────────────────────┘
```

---

## Ciclo de vida: "Nueva Partida"

```
EVENTO: Usuario click en "Nueva Partida"
                    │
                    ↓
        ┌──────────────────────────┐
        │ onClick listener activa: │
        │ appState.initializeNewG()│
        └──────────────────────────┘
                    │
        ┌───────────┴───────────┐
        ↓                       ↓
  ┌──────────────┐    ┌─────────────────┐
  │ Crear        │    │ navigate()      │
  │ gameState    │    │ → 'dashboard'   │
  │ (datos básic)│    └─────────────────┘
  └──────────────┘            │
        │                     ↓
        │            ┌──────────────────┐
        │            │saveToSession()   │
        │            │(sessionStorage)  │
        │            └──────────────────┘
        │                     │
        └─────────────┬───────┘
                      ↓
              ┌──────────────┐
              │screenMgr.    │
              │render()      │
              └──────────────┘
                      │
                      ↓
          ┌────────────────────────┐
          │screenManager:          │
          │ - Lee appState         │
          │ - currentScreen=       │
          │   "dashboard"          │
          │ - Busca componente     │
          │ - Ejecuta función      │
          └────────────────────────┘
                      │
                      ↓
          ┌────────────────────────┐
          │DashboardScreen         │
          │ - Crea elemento DOM    │
          │ - Lee appState.        │
          │   gameState            │
          │ - Renderiza HTML       │
          │ - Agrega listeners     │
          │ - Retorna elemento     │
          └────────────────────────┘
                      │
                      ↓
          ┌────────────────────────┐
          │ScreenManager:          │
          │ - Container.innerHTML  │
          │   = ''                 │
          │ - Container.append     │
          │   (element)            │
          └────────────────────────┘
                      │
                      ↓
          ┌────────────────────────┐
          │ DOM ACTUALIZADO        │
          │ <div id="app">         │
          │   <div class="       │
          │   screen dashboard">  │
          │   ...                  │
          │   </div>               │
          │ </div>                 │
          └────────────────────────┘
```

---

## Estado global (AppState)

```
AppState = {
  currentScreen: 'dashboard',
  
  screenParams: {
    // Parámetros específicos de la pantalla
    // Ej: { teamId: 123, season: 1 }
  },
  
  gameState: {
    season: 1,
    teamName: 'Mi Equipo',
    budget: 1000000,
    players: [],
    matches: [],
    lastUpdate: '2025-01-19T...'
  }
}

// Guardado en sessionStorage como JSON:
sessionStorage.setItem('appState', JSON.stringify({...}))

// Restaurado al refrescar:
const saved = JSON.parse(sessionStorage.getItem('appState'))
```

---

## Componente de pantalla: Estructura

```
function MyScreen(params) {
  // 1. CREAR ELEMENTO
  const container = document.createElement('div')
  container.className = 'screen my-screen'
  
  // 2. AGREGAR CONTENIDO
  container.innerHTML = `
    <h1>Título</h1>
    <button id="myBtn">Clickea</button>
  `
  
  // 3. AGREGAR INTERACTIVIDAD
  container.querySelector('#myBtn').addEventListener('click', () => {
    appState.navigate('otherScreen', { /* params */ })
    screenManager.render()
  })
  
  // 4. RETORNAR ELEMENTO
  return container
}

// Uso:
screenManager.registerScreen('myScreen', MyScreen)
```

---

## Interacción: Usuario → DOM → AppState

```
USER INPUT
    │
    ↓
┌─────────────────────────┐
│  HTML elemento (botón)  │
└─────────────────────────┘
    │
    ↓
┌─────────────────────────┐
│  Event Listener         │
│  (onClick, etc.)        │
└─────────────────────────┘
    │
    ↓
┌─────────────────────────┐
│  Función de acción      │
│  (appState.navigate())  │
└─────────────────────────┘
    │
    ↓
┌─────────────────────────┐
│  AppState se actualiza  │
│  - currentScreen        │
│  - screenParams         │
│  - gameState            │
└─────────────────────────┘
    │
    ↓
┌─────────────────────────┐
│  Guardar en session     │
│  (sessionStorage)       │
└─────────────────────────┘
    │
    ↓
┌─────────────────────────┐
│  screenManager.render() │
└─────────────────────────┘
    │
    ↓
┌─────────────────────────┐
│  DOM ACTUALIZADO        │
│  (nueva pantalla)       │
└─────────────────────────┘
```

---

## Arquitectura en capas

```
┌─────────────────────────────────────────────┐
│           PANTALLA / UI                     │
│  MainMenuScreen, DashboardScreen, etc.      │
└─────────────────────────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────┐
│        GESTOR DE PANTALLAS                  │
│        (ScreenManager)                      │
│        - Registra pantallas                 │
│        - Renderiza en DOM                   │
└─────────────────────────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────┐
│         ESTADO CENTRAL                      │
│         (AppState)                          │
│         - currentScreen                     │
│         - screenParams                      │
│         - gameState                         │
│         - Navegación                        │
│         - Persistencia (sessionStorage)     │
└─────────────────────────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────┐
│          DOM (HTML)                         │
│          <div id="app">                     │
│            (contenido dinámico)             │
│          </div>                             │
└─────────────────────────────────────────────┘
```

---

## Ejemplo completo: MainMenuScreen

```javascript
// src/screens/MainMenuScreen.js

import { appState } from '../core/AppState.js'
import { screenManager } from '../core/ScreenManager.js'

export function MainMenuScreen() {
  // 1. Crear contenedor
  const container = document.createElement('div')
  container.className = 'screen main-menu'
  
  // 2. Agregar contenido HTML
  container.innerHTML = `
    <div class="menu-container">
      <div class="menu-header">
        <h1>PC Futbol 7 Remake</h1>
        <p class="subtitle">Gestor de Fútbol</p>
      </div>
      
      <div class="menu-buttons">
        <button class="btn btn-primary" id="newGameBtn">
          <span>Nueva Partida</span>
        </button>
        <button class="btn btn-secondary" id="loadGameBtn">
          <span>Cargar Partida</span>
        </button>
        <button class="btn btn-secondary" id="settingsBtn">
          <span>Configuración</span>
        </button>
      </div>

      <div class="menu-footer">
        <p>v0.1.0 - Versión de desarrollo</p>
      </div>
    </div>
  `

  // 3. Agregar event listeners
  container.querySelector('#newGameBtn').addEventListener('click', () => {
    console.log('[MainMenu] Nueva partida iniciada')
    appState.initializeNewGame()  // Crear gameState
    screenManager.render()         // Renderizar dashboard
  })

  container.querySelector('#loadGameBtn').addEventListener('click', () => {
    appState.navigate('loadGame')
    screenManager.render()
  })

  container.querySelector('#settingsBtn').addEventListener('click', () => {
    appState.navigate('settings')
    screenManager.render()
  })

  // 4. Retornar elemento
  return container
}
```

---

## Pasos para crear una pantalla nueva

```
1️⃣ CREAR ARCHIVO
   src/screens/MyScreen.js

2️⃣ ESCRIBIR FUNCIÓN
   export function MyScreen(params) {
     const container = document.createElement('div')
     container.className = 'screen my-screen'
     container.innerHTML = `...`
     return container
   }

3️⃣ IMPORTAR EN main.js
   import { MyScreen } from './screens/MyScreen.js'

4️⃣ REGISTRAR EN ScreenManager
   screenManager.registerScreen('myScreen', MyScreen)

5️⃣ NAVEGAR DESDE OTRA PANTALLA
   appState.navigate('myScreen', { params })
   screenManager.render()

✅ ¡LISTO!
```

---

## Resumen visual: Flujo completo

```
┌─────────────────────────────────────────────────────────┐
│                   npm run dev                           │
└─────────────────────────────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────┐
│  Vite inicia servidor en http://localhost:3000          │
│  Carga index.html                                       │
└─────────────────────────────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────┐
│  <script type="module" src="main.js"></script>          │
└─────────────────────────────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────┐
│  main.js ejecuta:                                       │
│  1. Crea AppState                                       │
│  2. Crea ScreenManager                                  │
│  3. Registra MainMenuScreen, DashboardScreen            │
│  4. Carga estado guardado (si existe)                   │
│  5. Renderiza MainMenuScreen                            │
└─────────────────────────────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────┐
│  ┌────────────────────────────────────┐                 │
│  │ PC Futbol 7 Remake                 │                 │
│  │ Gestor de Fútbol                   │                 │
│  │                                    │                 │
│  │ [Nueva Partida]                    │                 │
│  │ [Cargar Partida]                   │                 │
│  │ [Configuración]                    │                 │
│  │                                    │                 │
│  │ v0.1.0 - Versión desarrollo       │                 │
│  └────────────────────────────────────┘                 │
└─────────────────────────────────────────────────────────┘
           │ Usuario click en "Nueva Partida"
           ↓
┌─────────────────────────────────────────────────────────┐
│  appState.initializeNewGame()                           │
│  appState.navigate('dashboard')                         │
│  screenManager.render()                                 │
└─────────────────────────────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────┐
│  ┌──────────────────────────────────┐                   │
│  │ Mi Equipo    Temporada 1         │                   │
│  │ Presupuesto: $1.0M               │                   │
│  │                                  │                   │
│  │ [Equipo]  [Partidos]             │                   │
│  │ [Economía] [Instalaciones]       │                   │
│  │                                  │                   │
│  │ [Volver]  [Guardar]              │                   │
│  └──────────────────────────────────┘                   │
└─────────────────────────────────────────────────────────┘
           │ Usuario edita código
           ↓
┌─────────────────────────────────────────────────────────┐
│  Vite HMR detecta cambios                               │
│  Recarga módulo sin perder estado                       │
│  AppState mantiene datos                                │
│  DOM se re-renderiza con cambios                        │
└─────────────────────────────────────────────────────────┘
           │
           ↓
┌─────────────────────────────────────────────────────────┐
│  ✅ Cambios visibles al instante en navegador           │
└─────────────────────────────────────────────────────────┘
```

---

## Checklist: ¿Qué se ha completado?

```
✅ Estructura de proyecto base
✅ Configuration (Vite, ESLint, package.json)
✅ AppState - Estado central
✅ ScreenManager - Gestor de pantallas
✅ MainMenuScreen - Pantalla inicial
✅ DashboardScreen - Panel de juego
✅ Estilos CSS profesionales y responsivos
✅ sessionStorage - Persistencia de sesión
✅ Hot Module Replacement - Desarrollo rápido
✅ PWA ready - manifest.json incluido
✅ Documentación completa
✅ Tests setup - Vitest configurado
✅ README actualizado

🔄 Próximos pasos:
   ⏳ TeamManagementScreen
   ⏳ MatchesScreen
   ⏳ SettingsScreen
   ⏳ SimulationService
   ⏳ StorageService (IndexedDB)
   ⏳ Web Components reutilizables
   ⏳ EconomyService
   ⏳ PlayerService
```

---

¡Proyecto listo para empezar el desarrollo! 🚀
