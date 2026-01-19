# PC Futbol 7 Remake

![PC Futbol 7 Remake](./docs/cover.png)

## Índice

1. [Descripción del proyecto](#descripción-del-proyecto)
2. [Equipo de desarrollo](#equipo-de-desarrollo)
3. [Tecnología a utilizar](#tecnología-a-utilizar)
4. [Planteamiento de desarrollo](#planteamiento-de-desarrollo)
5. [Publicación y distribución](#publicación-y-distribución)
6. [Desarrollo y LiveReload](#desarrollo-y-livereload)
7. [Gestión de tareas e incidencias](#gestión-de-tareas-e-incidencias)
8. [Gestión del proyecto](#gestión-del-proyecto)
9. [Filosofía del proyecto](#filosofía-del-proyecto)

---

## Descripción del proyecto

**PC Futbol 7 Remake** es un juego de gestión de fútbol inspirado en el clásico PC Fútbol 7. El jugador asume el rol de manager de un club, encargándose de la gestión integral: plantillas, alineaciones, fichajes, economía, instalaciones y evolución histórica del club.

El juego se basa íntegramente en menús y pantallas de gestión. Los partidos no se representan gráficamente, sino que se **simulan mediante lógica estadística**, mostrando resultados, eventos y consecuencias deportivas y económicas.

---

## Equipo de desarrollo

* [**Mapiedra**](#) – Desarrollo principal, arquitectura, motor de simulación y decisiones técnicas
* [**Benji**](#) – Apoyo en desarrollo, datos, balanceo y validación
* [**Derlis**](#) – Apoyo en desarrollo, lógica de juego y testeo

> Nota: Las URLs de los perfiles son de ejemplo y se pueden editar posteriormente.

---

## Tecnología a utilizar

* **JavaScript vanilla** como base
* **jQuery** para simplificar sintaxis y manipulación del DOM
* **Web Components** para encapsular componentes UI reutilizables
* HTML5 + CSS3
* SPA sin frameworks (sin React, Vue, Angular)
* PWA, Electron y Capacitor para multiplataforma

---

## Planteamiento de desarrollo

* Juego de gestión basado en datos, sin motor gráfico ni simulación 3D
* Lógica pura + interfaces
* SPA con `AppState` central para manejar pantalla y parámetros
* Navegación interna mediante `navigate(screen, params)`
* Persistencia de estado en `sessionStorage` para desarrollo y restauración rápida al refrescar
* Guardado de partidas: IndexedDB (Web/PWA), filesystem local (Desktop/Mobile)
* Exportar/importar partidas mediante `.save` (ZIP + JSON)

---

## Publicación y distribución

* **Web y PWA:** GitHub Pages
* **Desktop:** Electron
* **Mobile (fase posterior):** Capacitor
* Build de producción optimizado con minificación y bundling
* Compatible con SPA y PWA

---

## Desarrollo y LiveReload

* Usar **Vite** como servidor de desarrollo (solo herramienta, sin framework) para:

  * LiveReload de JS y CSS
  * Hot reload sin perder AppState
  * Desarrollo rápido y seguro
* Flujo de trabajo:

  * `npm run dev` para desarrollo con LiveReload
  * `npm run build` para producción (dist/ listo para GitHub Pages, Electron, PWA)
* AppState se serializa y restaura automáticamente en desarrollo para mantener pantalla y datos al refrescar

---

## Gestión de tareas e incidencias

* GitHub Issues para bugs, features, balance, ideas
* Etiquetas para clasificación y prioridad

---

## Gestión del proyecto

* GitHub como plataforma central (código, documentación, roadmap, versiones)
* GitHub Projects (Kanban) para planificación de tareas
* Milestones para versiones:

  * v0.1 – Base jugable
  * v0.2 – Economía y fichajes
  * v0.3 – Varias temporadas
  * v1.0 – Primera versión estable

---

## Filosofía del proyecto

* Offline-first
* Data-driven
* Modular y extensible
* Multiplataforma
* Inspirado en PC Fútbol clásico
