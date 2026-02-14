/**
 * Componente Modal de Configuración (Wrapper sobre Modal genérico)
 */
import { createModal } from './Modal.js'
import settingsContent from '../templates/settings.html?raw'
import { appState } from '../core/AppState.js'

export function createSettings() {
    const modal = createModal({
        title: 'Configuración',
        content: settingsContent,
        onAccept: () => {
            console.log('Cerrando configuración')
        }
    })

    // Lógica para inicializar y guardar configuración
    const rows = modal.querySelectorAll('.setting-row')

    rows.forEach(row => {
        const category = row.dataset.category
        const slider = row.querySelector('.setting-slider')
        const toggle = row.querySelector('.setting-toggle')

        if (!category || !appState.settings[category]) return

        // 1. Cargar valores iniciales desde AppState
        const currentSettings = appState.settings[category]

        // Slider (Volumen)
        slider.value = currentSettings.volume

        // Toggle (Mute/Desactivado)
        // Recordamos: checked = Mute (X) = Desactivado
        // unchecked = Sound On = Activado
        toggle.checked = currentSettings.muted

        // Selector de Carpeta (Solo para Música)
        const select = row.querySelector('.setting-select')
        if (select && category === 'music') {
            select.value = currentSettings.folder || 'original'

            select.addEventListener('change', (e) => {
                const folder = e.target.value
                appState.updateSetting('music', { folder: folder })
            })
        }

        // Aplicar estado visual inicial (disabled si está muted)
        updateVisualState(row, currentSettings.muted)


        // 2. Listeners para cambios

        // Cambio en Mute/Toggle
        toggle.addEventListener('change', (e) => {
            const isMuted = e.target.checked

            // Actualizar estado visual
            updateVisualState(row, isMuted)

            // Guardar en AppState
            appState.updateSetting(category, { muted: isMuted })
        })

        // Cambio en Slider (Volumen)
        slider.addEventListener('input', (e) => {
            const volume = parseInt(e.target.value)

            // Guardar en AppState
            appState.updateSetting(category, { volume: volume })
        })
    })

    return modal
}

function updateVisualState(row, isMuted) {
    const slider = row.querySelector('.setting-slider')
    if (isMuted) {
        row.classList.add('disabled')
        slider.disabled = true
    } else {
        row.classList.remove('disabled')
        slider.disabled = false
    }
}
