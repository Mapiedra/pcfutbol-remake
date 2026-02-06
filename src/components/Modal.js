/**
 * Componente Modal Genérico
 */
import modalTemplate from '../templates/modal.html?raw'

/**
 * Crea y muestra una ventana modal genérica
 * @param {Object} options - Opciones del modal
 * @param {string} options.title - Título de la ventana
 * @param {string} options.content - HTML del contenido
 * @param {Function} [options.onAccept] - Callback al pulsar Aceptar
 * @param {Function} [options.onClose] - Callback al cerrar
 * @returns {HTMLElement} El elemento del modal (overlay)
 */
export function createModal({ title, content, onAccept, onClose }) {
    // Crear el overlay
    const overlay = document.createElement('div')
    overlay.className = 'modal-overlay'
    overlay.innerHTML = modalTemplate

    // Configurar título
    const titleEl = overlay.querySelector('.modal-title')
    if (titleEl) titleEl.textContent = title

    // Configurar contenido
    const bodyEl = overlay.querySelector('.modal-body')
    if (bodyEl) bodyEl.innerHTML = content

    // Función de cierre interna
    const closeModal = () => {
        if (overlay._escListener) {
            document.removeEventListener('keydown', overlay._escListener)
        }
        overlay.remove()
        if (onClose) onClose()
    }

    // --- Event Listeners ---

    // Botón Aceptar
    const acceptBtn = overlay.querySelector('.modal-accept-btn')
    if (acceptBtn) {
        acceptBtn.addEventListener('click', () => {
            if (onAccept) onAccept()
            closeModal()
        })
    }

    // Botón Cerrar (X)
    const closeBtn = overlay.querySelector('.modal-close-btn')
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal)
    }

    // Click fuera del modal
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeModal()
        }
    })

    // Tecla ESC
    const escListener = (e) => {
        if (e.key === 'Escape') {
            closeModal()
        }
    }
    document.addEventListener('keydown', escListener)
    overlay._escListener = escListener

    return overlay
}
