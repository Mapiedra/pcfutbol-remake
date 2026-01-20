/**
 * Mensaje de bienvenida en la consola
 */

export function showWelcomeMessage() {
  const styles = `
    color: #1e40af;
    font-size: 18px;
    font-weight: bold;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
  `

  const infoStyles = `
    color: #10b981;
    font-size: 14px;
    margin-top: 10px;
  `

  console.log('%c⚽ PC Futbol 7 Remake v0.1.0', styles)
  console.log('%cBienvenido al juego de gestión de fútbol moderno', infoStyles)
  console.log('')
  console.log('%c📚 Documentación', 'font-weight: bold; color: #2c3e50;')
  console.log('  • GitHub Wiki: https://github.com/tu-usuario/pcfubtol-remake/wiki')
  console.log('  • Guía de desarrollo: https://github.com/tu-usuario/pcfubtol-remake/wiki/6.-Guía-de-desarrollo')
  console.log('  • Reportar bugs: https://github.com/tu-usuario/pcfubtol-remake/issues')
  console.log('')
  console.log('%c🛠️ Stack técnico', 'font-weight: bold; color: #2c3e50;')
  console.log('  • JavaScript Vanilla (ES6+)')
  console.log('  • Vite (build tool ultrarrápido)')
  console.log('  • PWA (installable en dispositivos)')
  console.log('  • IndexedDB (almacenamiento offline)')
  console.log('')
  console.log('%c⌨️ Atajos útiles en desarrollo', 'font-weight: bold; color: #2c3e50;')
  console.log('  • appState.getState() - Ver estado actual')
  console.log('  • appState.navigate("screen") - Navegar')
  console.log('  • screenManager.render() - Re-renderizar')
  console.log('')
  console.log('%c🚀 ¡Comienza a desarrollar!', 'color: #10b981; font-weight: bold;')
}
