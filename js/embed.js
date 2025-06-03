// Función para mostrar el código SVG en una ventana modal
function showSvgCode() {
    if (!qrCode) {
        showMessage('Primero debes generar un código QR', 'error');
        return;
    }

    const canvas = document.getElementById('qr-canvas');
    const svgData = canvasToSVG(canvas, qrCode);
    
    // Crear un modal para mostrar el código SVG
    const modalContainer = document.createElement('div');
    modalContainer.className = 'code-modal-container';
    modalContainer.style.position = 'fixed';
    modalContainer.style.top = '0';
    modalContainer.style.left = '0';
    modalContainer.style.width = '100%';
    modalContainer.style.height = '100%';
    modalContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    modalContainer.style.display = 'flex';
    modalContainer.style.justifyContent = 'center';
    modalContainer.style.alignItems = 'center';
    modalContainer.style.zIndex = '1000';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'code-modal-content';
    modalContent.style.backgroundColor = 'white';
    modalContent.style.padding = '20px';
    modalContent.style.borderRadius = '8px';
    modalContent.style.maxWidth = '90%';
    modalContent.style.width = '600px';
    modalContent.style.maxHeight = '90vh';
    modalContent.style.overflow = 'auto';
    modalContent.style.position = 'relative';
    
    const closeButton = document.createElement('button');
    closeButton.innerHTML = '&times;';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '10px';
    closeButton.style.right = '10px';
    closeButton.style.border = 'none';
    closeButton.style.background = 'none';
    closeButton.style.fontSize = '24px';
    closeButton.style.cursor = 'pointer';
    closeButton.style.color = '#333';
    closeButton.onclick = function() {
        document.body.removeChild(modalContainer);
    };
    
    const title = document.createElement('h3');
    title.textContent = 'Código SVG del QR generado';
    title.style.marginTop = '0';
    title.style.marginBottom = '15px';
    
    const description = document.createElement('p');
    description.textContent = 'Copia este código para usar el SVG en tu sitio web:';
    description.style.marginBottom = '15px';
    
    // Crear el código HTML que contiene el SVG
    const htmlWithSvg = `<div style="display: inline-block; max-width: 100%;">
    ${svgData}
</div>`;
    
    const codeArea = document.createElement('textarea');
    codeArea.value = htmlWithSvg;
    codeArea.style.width = '100%';
    codeArea.style.height = '200px';
    codeArea.style.padding = '10px';
    codeArea.style.border = '1px solid #ddd';
    codeArea.style.borderRadius = '4px';
    codeArea.style.fontFamily = 'monospace';
    codeArea.style.fontSize = '12px';
    codeArea.style.resize = 'none';
    codeArea.style.marginBottom = '15px';
    codeArea.onclick = function() {
        this.select();
    };
    
    const copyButton = document.createElement('button');
    copyButton.textContent = 'Copiar código';
    copyButton.style.padding = '10px 15px';
    copyButton.style.backgroundColor = '#4361ee';
    copyButton.style.color = 'white';
    copyButton.style.border = 'none';
    copyButton.style.borderRadius = '4px';
    copyButton.style.cursor = 'pointer';
    copyButton.onclick = function() {
        codeArea.select();
        document.execCommand('copy');
        this.textContent = '¡Copiado!';
        setTimeout(() => {
            this.textContent = 'Copiar código';
        }, 2000);
    };
    
    const preview = document.createElement('div');
    preview.innerHTML = '<h4 style="margin-top: 20px; margin-bottom: 10px;">Vista previa:</h4>';
    preview.style.textAlign = 'center';
    preview.innerHTML += htmlWithSvg;
    
    modalContent.appendChild(closeButton);
    modalContent.appendChild(title);
    modalContent.appendChild(description);
    modalContent.appendChild(codeArea);
    modalContent.appendChild(copyButton);
    modalContent.appendChild(preview);
    
    modalContainer.appendChild(modalContent);
    document.body.appendChild(modalContainer);
    
    // Seleccionar automáticamente el código para facilitar la copia
    codeArea.select();
}

// Función para mostrar el código HTML en una ventana modal
function generateEmbedCode() {
    if (!qrCode) {
        showMessage('Primero debes generar un código QR', 'error');
        return;
    }

    const canvas = document.getElementById('qr-canvas');
    const svgData = canvasToSVG(canvas, qrCode);
    const encodedSvg = encodeURIComponent(svgData);
    
    // Obtener los valores actuales
    const text = qrText.value.trim();
    const size = qrSize.value;
    const color = qrColor.value;
    const bgColor = qrBgColor.value;
    const errorLevel = qrErrorCorrection.value;
    
    // Crear el código HTML para incrustar
    const embedHTML = `
<!-- Inicio del Código QR Generado por QR Creator -->
<div class="qr-embed" style="display: inline-block; background: white; padding: 15px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); text-align: center; max-width: 100%;">
    <div style="margin-bottom: 10px;">
        <img src="data:image/svg+xml;charset=utf-8,${encodedSvg}" alt="Código QR" style="max-width: 100%; height: auto; display: block; margin: 0 auto;">
    </div>
    <div style="font-family: Arial, sans-serif; font-size: 14px; color: #333;">
        <p style="margin: 5px 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${text.substring(0, 50)}${text.length > 50 ? '...' : ''}</p>
        <p style="margin: 5px 0; font-size: 12px; color: #666;">Escanea este código QR</p>
    </div>
    <div style="font-size: 11px; color: #999; margin-top: 8px;">
        Creado por <a href="https://wqfxunkc.manus.space" style="color: #4361ee; text-decoration: none;">QR Creator</a>
    </div>
</div>
<!-- Fin del Código QR -->
`;

    // Crear un modal para mostrar el código
    const modalContainer = document.createElement('div');
    modalContainer.className = 'embed-modal-container';
    modalContainer.style.position = 'fixed';
    modalContainer.style.top = '0';
    modalContainer.style.left = '0';
    modalContainer.style.width = '100%';
    modalContainer.style.height = '100%';
    modalContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    modalContainer.style.display = 'flex';
    modalContainer.style.justifyContent = 'center';
    modalContainer.style.alignItems = 'center';
    modalContainer.style.zIndex = '1000';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'embed-modal-content';
    modalContent.style.backgroundColor = 'white';
    modalContent.style.padding = '20px';
    modalContent.style.borderRadius = '8px';
    modalContent.style.maxWidth = '90%';
    modalContent.style.width = '600px';
    modalContent.style.maxHeight = '90vh';
    modalContent.style.overflow = 'auto';
    modalContent.style.position = 'relative';
    
    const closeButton = document.createElement('button');
    closeButton.innerHTML = '&times;';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '10px';
    closeButton.style.right = '10px';
    closeButton.style.border = 'none';
    closeButton.style.background = 'none';
    closeButton.style.fontSize = '24px';
    closeButton.style.cursor = 'pointer';
    closeButton.style.color = '#333';
    closeButton.onclick = function() {
        document.body.removeChild(modalContainer);
    };
    
    const title = document.createElement('h3');
    title.textContent = 'Código HTML para integrar en tu web';
    title.style.marginTop = '0';
    title.style.marginBottom = '15px';
    
    const description = document.createElement('p');
    description.textContent = 'Copia y pega este código HTML en tu sitio web para mostrar el código QR:';
    description.style.marginBottom = '15px';
    
    const codeArea = document.createElement('textarea');
    codeArea.value = embedHTML;
    codeArea.style.width = '100%';
    codeArea.style.height = '200px';
    codeArea.style.padding = '10px';
    codeArea.style.border = '1px solid #ddd';
    codeArea.style.borderRadius = '4px';
    codeArea.style.fontFamily = 'monospace';
    codeArea.style.fontSize = '12px';
    codeArea.style.resize = 'none';
    codeArea.style.marginBottom = '15px';
    codeArea.onclick = function() {
        this.select();
    };
    
    const copyButton = document.createElement('button');
    copyButton.textContent = 'Copiar código HTML';
    copyButton.style.padding = '10px 15px';
    copyButton.style.backgroundColor = '#4361ee';
    copyButton.style.color = 'white';
    copyButton.style.border = 'none';
    copyButton.style.borderRadius = '4px';
    copyButton.style.cursor = 'pointer';
    copyButton.onclick = function() {
        codeArea.select();
        document.execCommand('copy');
        this.textContent = '¡Copiado!';
        setTimeout(() => {
            this.textContent = 'Copiar código HTML';
        }, 2000);
    };
    
    const preview = document.createElement('div');
    preview.innerHTML = '<h4 style="margin-top: 20px; margin-bottom: 10px;">Vista previa:</h4>';
    preview.innerHTML += embedHTML;
    
    modalContent.appendChild(closeButton);
    modalContent.appendChild(title);
    modalContent.appendChild(description);
    modalContent.appendChild(codeArea);
    modalContent.appendChild(copyButton);
    modalContent.appendChild(preview);
    
    modalContainer.appendChild(modalContent);
    document.body.appendChild(modalContainer);
    
    // Seleccionar automáticamente el código para facilitar la copia
    codeArea.select();
}
