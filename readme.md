# PC Futbol 7 Remake ⚽🎮

Juego de gestión de fútbol inspirado en PC Fútbol 7 clásico. Remasterizado para 2024 como Progressive Web App.

## 🚀 Empezar en 2 minutos

```bash
# 1. Clonar repositorio
git clone https://github.com/tu-usuario/pcfubtol-remake.git
cd pcfubtol-remake

# 2. Instalar dependencias
npm install

# 3. Crear archivo .env.local
cp .env.example .env.local

# 4. Ejecutar en desarrollo
npm run dev

# 5. Abrir en navegador
# http://localhost:3000
```

## 🌍 Entornos de desarrollo

Soportamos múltiples entornos con configuración automática:

### Local (Tu máquina)
```bash
npm run dev
# http://localhost:3000
# Todos los logs visibles
# HMR (Hot Module Replacement) activo
```

### Development (develop branch)
```
https://develop-pcfubtol.vercel.app
- Integración continua del equipo
- Logs de debug habilitados
- Deploy automático en push
```

### Staging (staging branch)
```
https://staging-pcfubtol.vercel.app
- Testing pre-release
- Logs reducidos
- Deploy automático en push
```

### Production (main branch)
```
https://pcfubtol.vercel.app
- Usuarios reales
- Solo errores en logs
- Deploy automático en push
```

## 📋 Variables de entorno

Copiar `.env.example` a `.env.local`:

```bash
VITE_APP_ENV=development
VITE_API_URL=http://localhost:3000
VITE_LOG_LEVEL=debug
```

Niveles de logging:
- `debug` - Todos los mensajes
- `info` - Info + Warn + Error
- `warn` - Warn + Error
- `error` - Solo errores

👉 **[Ver guía completa de entornos →](./docs/ENVIRONMENTS.md)**

## 🏃 Scripts disponibles

```bash
npm run dev              # Desarrollo local con HMR
npm run build            # Build para producción
npm run build:staging    # Build para staging
npm run build:production # Build para producción
npm run preview          # Preview del build localmente
npm run test             # Tests unitarios
npm run test:watch       # Tests en modo watch
npm run lint             # Verificar code style (ESLint)
```

## 📚 Documentación

👉 **[Visita la Wiki para documentación detallada →](https://github.com/tu-usuario/pcfubtol-remake/wiki)**

| Sección | Contenido |
|---------|-----------|
| **[Descripción](https://github.com/tu-usuario/pcfubtol-remake/wiki/1.-Descripción)** | Qué es el proyecto y objetivos |
| **[Equipo](https://github.com/tu-usuario/pcfubtol-remake/wiki/2.-Equipo)** | Conócenos y cómo contactar |
| **[Tech Stack](https://github.com/tu-usuario/pcfubtol-remake/wiki/3.-Tecnología)** | Tecnologías utilizadas |
| **[Arquitectura](https://github.com/tu-usuario/pcfubtol-remake/wiki/4.-Arquitectura)** | Estructura y flujo de datos |
| **[Filosofía](https://github.com/tu-usuario/pcfubtol-remake/wiki/5.-Planteamiento)** | Principios de desarrollo |
| **[Desarrollo](https://github.com/tu-usuario/pcfubtol-remake/wiki/6.-Guía-de-desarrollo)** | Cómo contribuir |
| **[Publicación](https://github.com/tu-usuario/pcfubtol-remake/wiki/7.-Publicación)** | Deployment y distribución |
| **[Roadmap](https://github.com/tu-usuario/pcfubtol-remake/wiki/8.-Roadmap)** | Futuras features |
| **[FAQ](https://github.com/tu-usuario/pcfubtol-remake/wiki/9.-FAQ)** | Preguntas frecuentes |

## ✨ Features principales

✅ **Menú interactivo** - Interfaz visual limpia y moderna  
✅ **Navegación fluida** - Entre pantallas sin recargar  
✅ **Responsive design** - Funciona en cualquier dispositivo  
✅ **PWA installable** - Instálalo como app nativa  
✅ **Offline-first** - Funciona sin conexión  
✅ **Open source** - Código limpio y bien documentado  
✅ **Múltiples entornos** - Dev, Staging, Production  
✅ **Hot Module Replacement** - Cambios en tiempo real  

## 🛠️ Tech Stack

| Aspecto | Tecnología |
|---------|-----------|
| **Language** | JavaScript ES6+ |
| **Build tool** | Vite 5.0.8 |
| **Testing** | Vitest 1.0.4 |
| **Linting** | ESLint 8.55.0 |
| **DOM** | Vanilla JS + jQuery 3.7.1 |
| **Styling** | CSS3 + CSS Variables |
| **PWA** | Web Manifest + Service Worker |
| **Storage** | sessionStorage + IndexedDB |
| **Deployment** | Vercel + GitHub Pages |

## 🤝 Contribuir

¿Quieres ayudar? ¡Genial!

1. **Lee la [Guía de desarrollo](./docs/DEVELOPMENT.md)**
2. **Crea una rama**: `git checkout -b feature/mi-feature`
3. **Haz tus cambios** y sube un **Pull Request**

### Flujo de trabajo

```
feature/mi-feature → develop → staging → main
     (PR)            (PR)       (PR)      (Deploy)
```

## 📋 Requisitos

- **Node.js** 18+ ([descargar](https://nodejs.org))
- **npm** 9+ o **pnpm** 8+
- **Git** 2.0+
- Navegador moderno (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)

## 🌐 Acceso online

Juega ahora sin instalar:  
👉 **[https://pcfubtol.vercel.app](https://pcfubtol.vercel.app)**

### Instalar como PWA

**Android:**
1. Abre en Chrome
2. Menú ⋯ → Instalar app

**iPhone:**
1. Abre en Safari
2. Compartir → Añadir a pantalla inicio

## 👥 Equipo de desarrollo

- **[Mapiedra](https://github.com/mapiedra)** - Arquitecto, Backend
- **[Benji](https://github.com/benji)** - Frontend, UI/UX
- **[Derlis](https://github.com/derlis)** - DevOps, QA

## 📊 Estado del proyecto

| Feature | Estado | Versión |
|---------|--------|---------|
| Menú principal | ✅ Funcional | v0.1.0 |
| Navegación | ✅ Funcional | v0.1.0 |
| Dashboard básico | ✅ Funcional | v0.1.0 |
| Gestión equipos | 🔄 En desarrollo | v0.2.0 |
| Gestión jugadores | 📋 Planeado | v0.3.0 |
| Simulación partidos | 📋 Planeado | v1.0.0 |
| Economía | 📋 Planeado | v1.0.0 |
| Múltiples temporadas | 📋 Planeado | v1.0.0 |

[Ver roadmap completo →](https://github.com/tu-usuario/pcfubtol-remake/wiki/8.-Roadmap)

## 🐛 Reportar bugs

¿Encontraste un bug? [Abre un issue →](https://github.com/tu-usuario/pcfubtol-remake/issues)

Template de issue:
```
## Descripción
Qué sucede...

## Pasos para reproducir
1. Haz esto
2. Luego esto
3. Entonces...

## Comportamiento esperado
Debería...

## Comportamiento actual
Pero...

## Entorno
- OS: Windows/Mac/Linux
- Navegador: Chrome/Firefox/Safari
- Versión: v0.1.0
```

## 💬 Comunidad

- **[Discussions](https://github.com/tu-usuario/pcfubtol-remake/discussions)** - Preguntas y sugerencias
- **[Issues](https://github.com/tu-usuario/pcfubtol-remake/issues)** - Reportar bugs
- **[Wiki](https://github.com/tu-usuario/pcfubtol-remake/wiki)** - Documentación
- **Discord** (próximamente) - Chat en tiempo real

## 📝 Changelog

Ver [CHANGELOG.md](./CHANGELOG.md) para historial de versiones.

## 📄 Licencia

[MIT License](./LICENSE) - Eres libre de usar, modificar y distribuir este proyecto.

## 🙌 Agradecimientos

Inspirado en el clásico **PC Fútbol 7** de Dinamic Multimedia.

Agradecimientos especiales a:
- La comunidad de retro gaming
- Todos los contribuidores
- Nuestros testers

## 🚀 Roadmap

- [ ] v0.1.0 - Base jugable (menú, navegación)
- [ ] v0.2.0 - Gestión de equipos y plantillas
- [ ] v0.3.0 - Sistema de economía
- [ ] v1.0.0 - Primera versión estable
- [ ] v1.1.0 - App nativa (Electron/Capacitor)
- [ ] v2.0.0 - Multijugador

---

**¿Dudas?** Lee el [FAQ](https://github.com/tu-usuario/pcfubtol-remake/wiki/9.-FAQ) o [abre una Discussion](https://github.com/tu-usuario/pcfubtol-remake/discussions).

⭐ **¿Te gusta el proyecto? ¡Déjanos una estrella!**

```
Made with ⚽🎮 by the PC Futbol 7 Remake team
```
