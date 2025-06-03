// Inicialización de la página
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar variables y elementos
    initializeElements();
    
    // Cargar los QR predefinidos
    loadPredefinedQRs();
    
    // Configurar eventos
    setupEventListeners();
});

// Función para inicializar elementos y variables
function initializeElements() {
    // Botones de acción
    const qrActions = document.querySelector('.qr-actions');
    if (qrActions) {
        // Limpiar cualquier botón adicional que pueda existir
        const existingButtons = qrActions.querySelectorAll('button:not(#download-png-btn):not(#download-svg-btn):not(#download-pdf-btn)');
        existingButtons.forEach(button => {
            if (button.id === 'svg-code-btn' || button.id === 'html-code-btn') {
                button.remove();
            }
        });
        
        // Eliminar específicamente el botón HTML si existe
        const htmlButton = document.getElementById('html-code-btn');
        if (htmlButton) {
            htmlButton.remove();
        }
    }
}

// Función para configurar los eventos
function setupEventListeners() {
    // Configurar el botón SVG para mostrar el modal con código HTML
    const svgButton = document.getElementById('download-svg-btn');
    if (svgButton) {
        // Reemplazar el evento existente
        const newSvgButton = svgButton.cloneNode(true);
        svgButton.parentNode.replaceChild(newSvgButton, svgButton);
        
        // Añadir el nuevo evento
        newSvgButton.addEventListener('click', function(e) {
            e.preventDefault();
            showSvgCode();
        });
    }
}
