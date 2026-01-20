# 🚀 Inicio Rápido - 5 minutos

## 1️⃣ Instalar (1 minuto)

```bash
cd e:\Documentos\GitHub\pcfubtol-remake
npm install
```

## 2️⃣ Ejecutar (1 minuto)

```bash
npm run dev
```

Se abrirá automáticamente: **http://localhost:3000**

## 3️⃣ Interactuar (2 minutos)

### En el navegador:
1. **Pantalla inicial**: Verás "PC Futbol 7 Remake"
2. **Botón**: Click en "Nueva Partida"
3. **Dashboard**: Verás tu equipo, temporada y presupuesto
4. **Cambios en tiempo real**: Edita archivos en `src/` y verás cambios al instante

## 4️⃣ Editar tu primer archivo (1 minuto)

### Abre en VS Code:
```
e:\Documentos\GitHub\pcfubtol-remake\src\screens\MainMenuScreen.js
```

### Cambia esto:
```javascript
<h1>PC Futbol 7 Remake</h1>
```

### Por esto:
```javascript
<h1>¡Bienvenido a PC Futbol 7!</h1>
```

**✅ Verás el cambio al instante en el navegador**

---

## 📁 Archivos principales

| Archivo | Qué hace |
|---------|----------|
| `src/main.js` | Inicializa la app |
| `src/core/AppState.js` | Estado global |
| `src/core/ScreenManager.js` | Renderiza pantallas |
| `src/screens/MainMenuScreen.js` | Menú principal |
| `src/screens/DashboardScreen.js` | Panel del juego |
| `src/styles/global.css` | Estilos |
| `index.html` | HTML principal |

---

## 🎮 Cómo navegar

```javascript
// Desde cualquier pantalla:
import { appState } from '../core/AppState.js'
import { screenManager } from '../core/ScreenManager.js'

// Navegar
appState.navigate('dashboard', { /* parámetros opcionales */ })
screenManager.render()
```

---

## 📊 Estado de la app

```javascript
// El estado se mantiene en AppState
{
  currentScreen: 'dashboard',
  screenParams: {},
  gameState: {
    season: 1,
    teamName: 'Mi Equipo',
    budget: 1000000,
    players: [],
    matches: []
  }
}
```

---

## 🔧 Comandos útiles

```bash
# Desarrollo (con HMR)
npm run dev

# Build para producción
npm run build

# Ver producción localmente
npm run preview

# Ejecutar linter
npm run lint

# Ejecutar tests
npm test
```

---

## 🎯 Próximos pasos recomendados

1. **Explora el código**
   - Lee `src/main.js` para ver cómo funciona
   - Abre `src/core/AppState.js` para entender el estado
   - Mira `src/screens/MainMenuScreen.js` como ejemplo

2. **Crea una pantalla nueva**
   - Copia `MainMenuScreen.js` como plantilla
   - Cambia la clase CSS y el HTML
   - Registra en `main.js`
   - Navega a ella desde otra pantalla

3. **Personaliza estilos**
   - Abre `src/styles/global.css`
   - Edita colores, fuentes, tamaños
   - Los cambios se aplican al instante

4. **Agrégale funcionalidad**
   - Lee `DEVELOPMENT.md` para patrones
   - Sigue los ejemplos en los archivos existentes
   - Consulta `HOLA_MUNDO.md` para conceptos

---

## 📖 Documentación

- **[HOLA_MUNDO.md](./HOLA_MUNDO.md)** - Explicación conceptual completa
- **[DEVELOPMENT.md](./docs/DEVELOPMENT.md)** - Guía de desarrollo
- **[STRUCTURE.md](./docs/STRUCTURE.md)** - Estructura del proyecto
- **[DIAGRAMA.md](./DIAGRAMA.md)** - Diagramas visuales

---

## ⚡ Hot Module Replacement

Vite mantiene tu estado mientras trabajas:

```
Editas archivo
    ↓
El módulo se recarga automáticamente
    ↓
El estado (AppState) se preserva
    ↓
Ves los cambios en el navegador
```

**No pierdes tu progreso al editar código** 🎉

---

## 🐛 Si algo no funciona

1. **Instalaste npm?**
   ```bash
   npm install
   ```

2. **El servidor está corriendo?**
   ```bash
   npm run dev
   ```

3. **Puerto 3000 en uso?**
   - Edita `vite.config.js` → cambia `port: 3000` por otro

4. **Errores en consola?**
   - Abre DevTools (F12)
   - Mira la consola para errores
   - Lee `DEVELOPMENT.md` en la sección "Preguntas frecuentes"

---

## 🎓 Estructura de una pantalla

```javascript
// src/screens/MyScreen.js

import { appState } from '../core/AppState.js'
import { screenManager } from '../core/ScreenManager.js'

export function MyScreen(params) {
  const container = document.createElement('div')
  container.className = 'screen my-screen'
  
  container.innerHTML = `
    <h1>Mi Pantalla</h1>
    <button id="myBtn">Clickea</button>
  `
  
  container.querySelector('#myBtn').addEventListener('click', () => {
    appState.navigate('otherScreen')
    screenManager.render()
  })
  
  return container
}
```

Registra en `main.js`:
```javascript
import { MyScreen } from './screens/MyScreen.js'
screenManager.registerScreen('myScreen', MyScreen)
```

**¡Eso es todo!** 🚀

---

## 💡 Consejos

- Mantén `npm run dev` corriendo mientras trabajas
- Edita archivos, los cambios aparecen solos
- Usa `console.log()` para debugging
- Lee los comentarios en los archivos existentes
- Sigue el patrón de `MainMenuScreen.js`
- Guarda con Ctrl+S para asegurar HMR

---

## 🎉 ¡Listo!

Tienes una **base funcional y profesional** para empezar a desarrollar tu juego.

**Próximo paso**: Abre `src/main.js` y comienza a explorar.

¿Preguntas? Revisa `docs/DEVELOPMENT.md` o `HOLA_MUNDO.md`

**¡A codear!** 💻⚽
