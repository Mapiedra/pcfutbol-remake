# Estructura del Proyecto - PC Futbol 7 Remake

## Árbol de directorios

```
pcfubtol-remake/
├── public/                          # Archivos estáticos
│   ├── manifest.json               # Configuración PWA
│   ├── favicon.ico                 # Icono de la aplicación
│   └── icons/                      # Iconos para PWA
│       ├── icon-192x192.png
│       ├── icon-512x512.png
│       ├── maskable-icon-*.png
│       └── shortcut-new.png
│
├── src/                            # Código fuente
│   ├── main.js                     # Entrada principal de la aplicación
│   │
│   ├── core/                       # Lógica central
│   │   ├── AppState.js             # Estado global de la aplicación
│   │   ├── AppState.test.js        # Tests del AppState
│   │   └── ScreenManager.js        # Gestor de pantallas
│   │
│   ├── screens/                    # Componentes de pantalla
│   │   ├── MainMenuScreen.js       # Pantalla de menú principal
│   │   ├── DashboardScreen.js      # Panel principal del juego
│   │   ├── TeamManagementScreen.js # Gestión de equipo (próximamente)
│   │   ├── MatchesScreen.js        # Calendario y partidos (próximamente)
│   │   └── SettingsScreen.js       # Configuración (próximamente)
│   │
│   ├── components/                 # Web Components reutilizables
│   │   ├── PlayerCard.js           # Tarjeta de jugador
│   │   ├── MatchResult.js          # Resultado de partido
│   │   └── StatsDisplay.js         # Mostrador de estadísticas
│   │
│   ├── services/                   # Servicios de lógica de juego
│   │   ├── SimulationService.js    # Motor de simulación de partidos
│   │   ├── EconomyService.js       # Gestión de economía
│   │   ├── PlayerService.js        # Gestión de jugadores
│   │   └── StorageService.js       # Persistencia de datos
│   │
│   ├── utils/                      # Utilidades
│   │   ├── constants.js            # Constantes globales
│   │   ├── helpers.js              # Funciones auxiliares
│   │   └── validators.js           # Validadores de datos
│   │
│   └── styles/                     # Estilos CSS
│       ├── global.css              # Estilos globales
│       ├── screens.css             # Estilos específicos de pantallas
│       └── components.css          # Estilos de componentes
│
├── docs/                           # Documentación
│   ├── ARCHITECTURE.md             # Arquitectura del proyecto
│   ├── DEVELOPMENT.md              # Guía de desarrollo
│   ├── API.md                      # Referencia de APIs
│   └── cover.png                   # Portada del proyecto
│
├── tests/                          # Tests e2e
│   └── integration.test.js         # Tests de integración
│
├── index.html                      # HTML principal
├── package.json                    # Dependencias del proyecto
├── vite.config.js                  # Configuración de Vite
├── .eslintrc.json                  # Configuración de ESLint
├── .gitignore                      # Archivos ignorados por git
├── vitest.config.js                # Configuración de tests (próximamente)
└── README.md                       # Este archivo
```

## Descripción de los directorios principales

### `/public`
Archivos estáticos servidos directamente. Incluye el manifest.json para PWA y los iconos de la aplicación.

### `/src`
Todo el código fuente de la aplicación.

- **`main.js`**: Punto de entrada que inicializa la aplicación y registra las pantallas.
- **`core/`**: Lógica central con el estado global (AppState) y el gestor de pantallas.
- **`screens/`**: Componentes que representan pantallas completas.
- **`components/`**: Web Components reutilizables para construir las pantallas.
- **`services/`**: Servicios que encapsulan la lógica de negocio (simulación, economía, etc).
- **`utils/`**: Funciones auxiliares, constantes y validadores.
- **`styles/`**: Hojas de estilos CSS.

### `/docs`
Documentación del proyecto, arquitectura y guías de desarrollo.

### `/tests`
Tests unitarios e integración.

---

## Archivos de configuración

### `package.json`
Define dependencias y scripts:
```json
{
  "scripts": {
    "dev": "vite",           // Servidor de desarrollo
    "build": "vite build",   // Build de producción
    "preview": "vite preview"// Vista previa de producción
  }
}
```

### `vite.config.js`
Configuración de Vite para desarrollo y build.

### `.eslintrc.json`
Reglas de linting para mantener código limpio.

### `.gitignore`
Archivos y directorios a ignorar en git (node_modules, dist, etc).

### `index.html`
Documento HTML principal que carga la aplicación.

---

## Cómo comenzar

### 1. Instalar dependencias
```bash
npm install
```

### 2. Iniciar desarrollo
```bash
npm run dev
```
Se abrirá automáticamente en `http://localhost:3000` con LiveReload habilitado.

### 3. Build de producción
```bash
npm run build
```
Genera archivos optimizados en la carpeta `dist/`.

---

## Flujo de estado y navegación

1. **AppState**: Centro único de estado de la aplicación
2. **ScreenManager**: Gestiona qué pantalla se muestra
3. **Pantallas**: Cada pantalla es una función que retorna un elemento DOM
4. **Persistencia**: El estado se guarda automáticamente en sessionStorage

### Ejemplo de navegación:
```javascript
// En cualquier pantalla
import { appState } from '../core/AppState.js'
import { screenManager } from '../core/ScreenManager.js'

// Cambiar a otra pantalla
appState.navigate('dashboard', { /* parámetros */ })
screenManager.render()
```

---

## Próximos pasos

- [ ] Implementar `TeamManagementScreen`
- [ ] Implementar `MatchesScreen`
- [ ] Crear `SimulationService` para lógica de partidos
- [ ] Crear `StorageService` para IndexedDB
- [ ] Agregar más Web Components
- [ ] Tests exhaustivos
- [ ] Traducción i18n
- [ ] Empaquetado con Electron

---

## Más información

- Ver [ARCHITECTURE.md](./docs/ARCHITECTURE.md) para detalles técnicos
- Ver [DEVELOPMENT.md](./docs/DEVELOPMENT.md) para guía de desarrollo
