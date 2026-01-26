/**
 * Renderiza una plantilla HTML reemplazando marcadores {{key}} con valores de data.
 * @param {string} template - La cadena de texto de la plantilla HTML.
 * @param {object} data - Objeto con los valores para reemplazar.
 * @returns {string} - HTML renderizado.
 */
export function renderTemplate(template, data) {
    return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
        return key in data ? data[key] : match
    })
}
