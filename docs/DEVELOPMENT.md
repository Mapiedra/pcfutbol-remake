# Guía de Desarrollo - PC Futbol 7 Remake

## Inicio rápido

### Instalar y ejecutar
```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo (http://localhost:3000)
npm run dev

# Build para producción
npm run build

# Vista previa de producción (puerto 4173)
npm run preview
```

---

## Arquitectura

### Patrones utilizados

#### 1. **Estado Central (AppState)**
Singleton que maneja todo el estado global de la aplicación.

```javascript
// Acceso global
import { appState } from './core/AppState.js'

// Navegar a una pantalla
appState.navigate('dashboard', { teamId: 1 })

// Obtener estado
const state = appState.getState()

// Inicializar nueva partida
appState.initializeNewGame()

// Guardar en sesión
appState.saveToSession()
```

#### 2. **Gestor de Pantallas (ScreenManager)**
Renderiza la pantalla actual basada en AppState.

```javascript
import { screenManager } from './core/ScreenManager.js'

// Registrar una pantalla
screenManager.registerScreen('myScreen', MyScreenComponent)

// Renderizar la pantalla actual
screenManager.render()

// Re-renderizar (después de cambios)
screenManager.reRender()
```

#### 3. **Componentes de Pantalla**
Funciones que retornan un elemento DOM. Cada una es una pantalla completa.

```javascript
// Estructura básica de una pantalla
export function MyScreen(params) {
  const container = document.createElement('div')
  container.className = 'screen my-screen'
  container.innerHTML = `<h1>Mi Pantalla</h1>`
  
  // Event listeners
  container.querySelector('button').addEventListener('click', () => {
    appState.navigate('otherScreen')
    screenManager.render()
  })
  
  return container
}
```

---

## Flujo de estado y persistencia

### SessionStorage
El estado se guarda automáticamente en `sessionStorage` para:
- Restaurar la pantalla actual al refrescar
- Mantener los datos durante la sesión de desarrollo
- Facilitador para testing rápido

```javascript
// Guardar automáticamente
appState.navigate('dashboard')  // Llama saveToSession()

// Cargar al iniciar
appState.loadFromSession()      // Ejecutado en main.js
```

### Estructura del estado guardado
```javascript
{
  currentScreen: 'dashboard',
  screenParams: { teamId: 1 },
  gameState: {
    season: 1,
    teamName: 'Mi Equipo',
    budget: 1000000,
    players: [],
    matches: [],
    lastUpdate: '2025-01-19T...'
  }
}
```

---

## Cómo agregar una nueva pantalla

### Paso 1: Crear el componente
[src/screens/NewScreen.js](../src/screens/NewScreen.js):
```javascript
import { appState } from '../core/AppState.js'
import { screenManager } from '../core/ScreenManager.js'

export function NewScreen(params) {
  const container = document.createElement('div')
  container.className = 'screen new-screen'
  container.innerHTML = `<h1>Nueva Pantalla</h1>`
  
  return container
}
```

### Paso 2: Registrar en main.js
```javascript
import { NewScreen } from './screens/NewScreen.js'

screenManager.registerScreen('newScreen', NewScreen)
```

### Paso 3: Navegar desde otra pantalla
```javascript
appState.navigate('newScreen', { /* params */ })
screenManager.render()
```

---

## Web Components (próximamente)

Estructura para crear componentes reutilizables:

```javascript
// src/components/PlayerCard.js
class PlayerCard extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }
  
  connectedCallback() {
    this.render()
  }
  
  render() {
    const player = JSON.parse(this.getAttribute('data'))
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; }
      </style>
      <div class="card">
        <h3>${player.name}</h3>
        <p>${player.position}</p>
      </div>
    `
  }
}

customElements.define('player-card', PlayerCard)
```

---

## Servicios de lógica (próximamente)

### SimulationService
Simula partidos usando lógica estadística.

### EconomyService
Maneja presupuesto, ingresos, gastos.

### PlayerService
Gestiona jugadores, transferencias, evolución.

### StorageService
Persistencia en IndexedDB para guardos completos.

---

## Estilos CSS

### Variables CSS globales
Definidas en [src/styles/global.css](../src/styles/global.css):

```css
--primary-color: #1e40af
--primary-dark: #1e3a8a
--primary-light: #3b82f6
--secondary-color: #64748b
--success-color: #10b981
--danger-color: #ef4444
--text-primary: #1f2937
--text-secondary: #6b7280
--bg-primary: #ffffff
--bg-secondary: #f9fafb
--transition: all 0.3s ease
```

### Clases útiles
```css
.btn              /* Botón base */
.btn-primary      /* Botón primario azul */
.btn-secondary    /* Botón secundario gris */
.btn-success      /* Botón éxito verde */
.btn-danger       /* Botón peligro rojo */
.btn-small        /* Botón pequeño */

.screen           /* Pantalla (flex, min-height: 100vh) */
.screen.fade-in   /* Animación de entrada */
```

---

## Hot Module Replacement (HMR)

Vite mantiene el estado durante el desarrollo. Si necesitas refrescar manualmente:

```javascript
// En cualquier módulo
if (import.meta.hot) {
  import.meta.hot.accept()
}
```

---

## Testing

### Ejecutar tests
```bash
npm test          # Ejecutar todos los tests
npm test -- --ui  # UI de tests
```

### Escribir un test
[src/core/AppState.test.js](../src/core/AppState.test.js):

```javascript
import { describe, it, expect } from 'vitest'
import { appState } from '../src/core/AppState.js'

describe('AppState', () => {
  it('debería navegar correctamente', () => {
    appState.navigate('dashboard')
    expect(appState.currentScreen).toBe('dashboard')
  })
})
```

---

## Linting y código

### Ejecutar linter
```bash
npm run lint
```

### Reglas ESLint
Configuradas en [.eslintrc.json](.eslintrc.json):
- 2 espacios de indentación
- Comillas simples
- Sin punto y coma al final
- Uso de `console.log` permitido (útil en desarrollo)

---

## Estructura de commits

```
feat: Agregar nueva pantalla de equipo
fix: Corregir error en simulación
docs: Actualizar documentación
refactor: Reorganizar estructura de directorios
test: Agregar tests para StorageService
```

---

## Roadmap

### v0.1 - Base jugable
- ✅ Estructura base con Vite
- ✅ AppState y navegación
- ✅ Pantalla de menú
- ✅ Dashboard básico
- ⏳ Gestión de equipo

### v0.2 - Economía y fichajes
- Simulación de partidos
- Sistema económico
- Transferencias de jugadores

### v0.3 - Temporadas múltiples
- Guardado en IndexedDB
- Progreso a través de temporadas
- Evolución de jugadores

### v0.4+ - Plataformas
- PWA completa
- Electron para desktop
- Capacitor para mobile

---

## Recursos útiles

- [Documentación de Vite](https://vitejs.dev/)
- [MDN Web Components](https://developer.mozilla.org/es/docs/Web/Web_Components)
- [IndexedDB API](https://developer.mozilla.org/es/docs/Web/API/IndexedDB_API)
- [Vanilla JavaScript Patterns](https://www.patterns.dev/posts/vanilla-javascript/)

---

## Preguntas frecuentes

**P: ¿Dónde guardo datos permanentes?**  
R: Usa IndexedDB (en `StorageService`) para guardos que persistan entre sesiones. `sessionStorage` es solo para desarrollo.

**P: ¿Cómo paso datos entre pantallas?**  
R: Usa `appState.screenParams`:
```javascript
appState.navigate('playerDetail', { playerId: 123 })
// En PlayerDetailScreen:
export function PlayerDetailScreen(params) {
  const { playerId } = params
  // ...
}
```

**P: ¿Cómo realizo cambios sin perder el estado?**  
R: El HMR de Vite mantiene `appState` en memoria. Los cambios en CSS se aplican automáticamente.

**P: ¿Puedo usar jQuery?**  
R: Sí, está instalado. Importa: `import $ from 'jquery'`

---

## Contacto y contribuciones

- Mapiedra - Desarrollo principal
- Benji - Datos y balance
- Derlis - Testeo y lógica
