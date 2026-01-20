# 🌍 Guía de entornos

## Estructura

```
LOCAL (desarrollo)
  ↓ git push origin feature/...
DEVELOP (integración)
  ↓ git push origin staging
STAGING (pre-release)
  ↓ git push origin main
PRODUCTION (usuarios reales)
```

## Variables por entorno

### LOCAL
```
VITE_APP_ENV=development
VITE_API_URL=http://localhost:3000
VITE_LOG_LEVEL=debug
```
**Propósito**: Desarrollo local con logs detallados

### DEV (develop branch)
```
VITE_APP_ENV=development
VITE_API_URL=https://api-dev.example.com
VITE_LOG_LEVEL=debug
```
**URL**: https://develop-pcfubtol.vercel.app  
**Propósito**: Testing continuo del equipo

### STAGING (staging branch)
```
VITE_APP_ENV=staging
VITE_API_URL=https://api-staging.example.com
VITE_LOG_LEVEL=info
```
**URL**: https://staging-pcfubtol.vercel.app  
**Propósito**: Testing pre-release con menos logs

### PRODUCTION (main branch)
```
VITE_APP_ENV=production
VITE_API_URL=https://api.example.com
VITE_LOG_LEVEL=error
```
**URL**: https://pcfubtol.vercel.app  
**Propósito**: Usuarios reales, solo errores

## Cómo usar

### En desarrollo local

```bash
# 1. Crear .env.local
cp .env.example .env.local

# 2. Editar valores
VITE_APP_ENV=development
VITE_LOG_LEVEL=debug

# 3. Ejecutar
npm run dev

# 4. En consola
window.__CONFIG__  # Ver config actual
```

### En Vercel (automático)

```
main → PRODUCTION
staging → STAGING
develop → DEVELOPMENT
```

No requiere configuración manual.

## Debugging por entorno

### Development
- Todos los logs visibles
- Sourcemaps habilitados
- Time-travel debugging disponible

```javascript
// En consola
window.__CONFIG__      // Ver configuración
window.__LOGGER__      // Logger
window.appState        // Estado de la app
window.screenManager   // Manager de pantallas
```

### Staging
- Info + Warn + Error
- Sourcemaps habilitados
- Analytics deshabilitado

### Production
- Solo Error
- Sin sourcemaps
- Analytics habilitado
- Console.clear() automático

## Flujo de cambios

```
1. Crear rama desde develop
   git checkout -b feature/nueva-pantalla

2. Trabajar localmente
   npm run dev
   # Editar código

3. Commit y push a feature
   git push origin feature/nueva-pantalla

4. PR a develop
   # Código review
   # Tests pasan
   # Merge a develop

5. Vercel despliega a develop.pcfubtol.vercel.app
   # El equipo puede probar

6. Crear PR develop → staging
   # QA testing
   # Merge a staging

7. Vercel despliega a staging.pcfubtol.vercel.app
   # Pruebas finales

8. Crear PR staging → main
   # Last checks
   # Merge a main

9. Vercel despliega a pcfubtol.vercel.app
   # 🎉 En producción
```

## Casos de uso

### Hotfix en producción
```bash
# Crear rama desde main
git checkout -b hotfix/critical-bug

# Corregir
npm run dev
# ... fix ...

# Push
git push origin hotfix/critical-bug

# PR a main (con urgencia)
# Merge
# Deploy automático
```

### Feature grande
```bash
# Branch largo desde develop
git checkout -b feature/game-engine

# Trabajo durante semanas
npm run dev
# ... desarrollo ...

# Commits frecuentes
git push origin feature/game-engine

# PR a develop (cuando esté listo)
# Code review + tests
# Merge
```

## Variables de entorno disponibles

```javascript
// En tu código
import { CONFIG, Logger } from './config.js'

CONFIG.env              // 'development' | 'staging' | 'production'
CONFIG.apiUrl           // URL de API
CONFIG.logLevel         // 'debug' | 'info' | 'warn' | 'error'
CONFIG.isDev            // true en dev
CONFIG.isProd           // true en production
CONFIG.isLocal          // true en local
CONFIG.isStaging        // true en staging
CONFIG.isProduction     // true en production
CONFIG.enableDebug      // Debug mode?
CONFIG.enableAnalytics  // Analytics?
CONFIG.enableTimeTravel // Time-travel debugging?

// Logger
Logger.debug(msg, data)
Logger.info(msg, data)
Logger.warn(msg, data)
Logger.error(msg, data)
```

## Troubleshooting

### Variables no se cargan
```bash
# Crear .env.local
cp .env.example .env.local

# Reiniciar servidor
npm run dev
```

### Build falla en Vercel
```bash
# Verificar localmente
npm run build

# Check .env variables en Vercel dashboard
# Settings → Environment Variables
```

### Logs no aparecen
```bash
# Verificar nivel de logging
VITE_LOG_LEVEL=debug

# Ver en consola (F12)
window.__LOGGER__.log('test')
```

## ✅ Checklist

- [ ] .env.local creado
- [ ] Variables configuradas
- [ ] npm run dev funciona
- [ ] Logs visibles en consola
- [ ] window.__CONFIG__ visible
- [ ] Vercel deployments configurados
- [ ] Branches protegidas en GitHub
- [ ] CI/CD workflow activo
