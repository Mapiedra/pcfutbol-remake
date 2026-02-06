/**
 * Componente del Header Global
 */
import headerTemplate from '../templates/header.html?raw'
import { createSettings } from './Settings.js'

export function createHeader() {
    const container = document.createElement('div')
    container.innerHTML = headerTemplate

    // Retornamos el primer elemento que debería ser el <header>
    const header = container.firstElementChild

    // Lógica para desplegar el menú
    // Mostrar cuando el ratón está en la zona superior (50px)
    document.addEventListener('mousemove', (e) => {
        if (e.clientY < 50) {
            header.classList.add('visible')
        }
    })

    // Ocultar cuando el ratón sale del header
    header.addEventListener('mouseleave', () => {
        header.classList.remove('visible')
    })

    // Botón de configuración
    const settingsBtn = header.querySelector('#header-settings-btn')
    if (settingsBtn) {
        settingsBtn.addEventListener('click', () => {
            const modal = createSettings()
            document.body.appendChild(modal)
        })
    }

    return header
}
