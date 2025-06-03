// Variables globales
let qrCode = null;
let logoImage = null;

// Elementos del DOM
const qrText = document.getElementById('qr-text');
const qrSize = document.getElementById('qr-size');
const qrColor = document.getElementById('qr-color');
const qrBgColor = document.getElementById('qr-bg-color');
const qrErrorCorrection = document.getElementById('qr-error-correction');
const qrLogo = document.getElementById('qr-logo');
const qrLogoShape = document.getElementById('qr-logo-shape');
const qrLogoSize = document.getElementById('qr-logo-size');
const logoSizeValue = document.getElementById('logo-size-value');
const qrLogoBorder = document.getElementById('qr-logo-border');
const generateBtn = document.getElementById('generate-btn');
const qrCodeContainer = document.getElementById('qr-code-container');
const downloadPngBtn = document.getElementById('download-png-btn');
const downloadSvgBtn = document.getElementById('download-svg-btn');
const downloadPdfBtn = document.getElementById('download-pdf-btn');

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    // Eventos
    generateBtn.addEventListener('click', generateQRCode);
    qrLogo.addEventListener('change', handleLogoUpload);
    downloadPngBtn.addEventListener('click', () => downloadQR('png'));
    downloadSvgBtn.addEventListener('click', () => downloadQR('svg'));
    downloadPdfBtn.addEventListener('click', () => downloadQR('pdf'));
    
    // Actualizar el valor mostrado del tamaño del logo
    qrLogoSize.addEventListener('input', () => {
        logoSizeValue.textContent = `${qrLogoSize.value}%`;
        if (qrCode && logoImage) {
            generateQRCode();
        }
    });
    
    // Actualizar QR cuando cambia la forma o borde del logo
    qrLogoShape.addEventListener('change', () => {
        if (qrCode && logoImage) {
            generateQRCode();
        }
    });
    
    qrLogoBorder.addEventListener('change', () => {
        if (qrCode && logoImage) {
            generateQRCode();
        }
    });

    // Generar un QR de ejemplo al cargar la página
    setTimeout(() => {
        if (qrText.value === '') {
            qrText.value = 'https://ejemplo.com';
            generateQRCode();
        }
    }, 500);
});

// Función para manejar la carga de logos
function handleLogoUpload(e) {
    const file = e.target.files[0];
    if (!file) {
        logoImage = null;
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            logoImage = img;
            if (qrCode) {
                generateQRCode();
            }
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
}

// Función principal para generar el código QR
function generateQRCode() {
    const text = qrText.value.trim();
    if (!text) {
        showMessage('Por favor, ingresa algún texto o URL para generar el código QR', 'error');
        return;
    }

    const size = parseInt(qrSize.value);
    const color = qrColor.value;
    const bgColor = qrBgColor.value;
    const errorCorrectionLevel = qrErrorCorrection.value;

    // Limpiar el contenedor
    qrCodeContainer.innerHTML = '';

    // Crear el canvas para el QR
    const canvas = document.createElement('canvas');
    canvas.id = 'qr-canvas';
    qrCodeContainer.appendChild(canvas);

    // Generar el código QR usando QRious
    qrCode = new QRious({
        element: canvas,
        value: text,
        size: size,
        level: errorCorrectionLevel,
        background: bgColor,
        foreground: color
    });

    // Crear un canvas temporal para guardar el QR original
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = size;
    tempCanvas.height = size;
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.drawImage(canvas, 0, 0);

    // Si hay un logo, añadirlo al centro del QR
    if (logoImage) {
        addLogoToQR(canvas, logoImage, size, tempCanvas);
    }

    // Habilitar los botones de descarga
    enableDownloadButtons();
    
    // Mostrar mensaje de éxito
    showMessage('¡Código QR generado con éxito!', 'success');
    
    // Añadir clase para animación
    canvas.classList.add('fade-in');
}

// Función para añadir logo al centro del QR
function addLogoToQR(canvas, logoImg, size, tempCanvas) {
    const ctx = canvas.getContext('2d');
    
    // Obtener valores de personalización
    const logoShape = qrLogoShape.value;
    const logoSizePercent = parseInt(qrLogoSize.value) / 100;
    const logoBorder = qrLogoBorder.value;
    
    // Limitar el tamaño máximo del logo para evitar interferencias con el QR
    // Usar un tamaño máximo más conservador para garantizar la legibilidad
    const maxLogoSizePercent = 0.25; // 25% máximo para garantizar legibilidad
    const actualLogoSizePercent = Math.min(logoSizePercent, maxLogoSizePercent);
    
    // Calcular tamaño del logo basado en el porcentaje seleccionado
    const logoSize = size * actualLogoSizePercent;
    const logoX = (size - logoSize) / 2;
    const logoY = (size - logoSize) / 2;
    
    // Crear un fondo blanco para el logo (zona de seguridad)
    ctx.fillStyle = '#FFFFFF';
    
    // Dibujar el fondo blanco según la forma seleccionada
    switch (logoShape) {
        case 'circle':
            ctx.beginPath();
            const radius = logoSize / 2;
            ctx.arc(logoX + radius, logoY + radius, radius + 2, 0, Math.PI * 2, true); // +2 para el borde
            ctx.closePath();
            ctx.fill();
            break;
            
        case 'rounded':
            ctx.beginPath();
            const cornerRadius = logoSize * 0.2;
            drawRoundedRect(ctx, logoX - 2, logoY - 2, logoSize + 4, logoSize + 4, cornerRadius + 2); // +4 para el borde
            ctx.fill();
            break;
            
        case 'shield':
            ctx.beginPath();
            drawShield(ctx, logoX - 2, logoY - 2, logoSize + 4, logoSize + 4); // +4 para el borde
            ctx.fill();
            break;
            
        case 'square':
        default:
            ctx.fillRect(logoX - 2, logoY - 2, logoSize + 4, logoSize + 4); // +4 para el borde
            break;
    }
    
    // Guardar el estado actual del contexto
    ctx.save();
    
    // Aplicar la forma seleccionada como recorte
    switch (logoShape) {
        case 'circle':
            ctx.beginPath();
            const radius = logoSize / 2;
            ctx.arc(logoX + radius, logoY + radius, radius, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.clip();
            break;
            
        case 'rounded':
            ctx.beginPath();
            const cornerRadius = logoSize * 0.2;
            drawRoundedRect(ctx, logoX, logoY, logoSize, logoSize, cornerRadius);
            ctx.clip();
            break;
            
        case 'shield':
            ctx.beginPath();
            drawShield(ctx, logoX, logoY, logoSize, logoSize);
            ctx.clip();
            break;
            
        case 'square':
        default:
            ctx.beginPath();
            ctx.rect(logoX, logoY, logoSize, logoSize);
            ctx.clip();
            break;
    }
    
    // Dibujar el logo en el centro con el tamaño correcto
    // Usar drawImage con 9 parámetros para mantener la proporción y evitar distorsión
    const aspectRatio = logoImg.width / logoImg.height;
    let drawWidth, drawHeight, offsetX = 0, offsetY = 0;
    
    if (aspectRatio > 1) {
        // Imagen más ancha que alta
        drawWidth = logoSize;
        drawHeight = logoSize / aspectRatio;
        offsetY = (logoSize - drawHeight) / 2;
    } else {
        // Imagen más alta que ancha o cuadrada
        drawHeight = logoSize;
        drawWidth = logoSize * aspectRatio;
        offsetX = (logoSize - drawWidth) / 2;
    }
    
    ctx.drawImage(
        logoImg,
        0, 0, logoImg.width, logoImg.height,
        logoX + offsetX, logoY + offsetY, drawWidth, drawHeight
    );
    
    // Restaurar el contexto antes de dibujar el borde
    ctx.restore();
    
    // Añadir borde si es necesario
    if (logoBorder !== 'none') {
        let borderWidth;
        switch (logoBorder) {
            case 'thin': borderWidth = 1; break;     // Reducido para minimizar interferencia
            case 'medium': borderWidth = 2; break;   // Reducido para minimizar interferencia
            case 'thick': borderWidth = 3; break;    // Reducido para minimizar interferencia
            default: borderWidth = 0;
        }
        
        if (borderWidth > 0) {
            ctx.lineWidth = borderWidth;
            ctx.strokeStyle = '#FFFFFF'; // Borde blanco
            
            // Dibujar el borde según la forma
            switch (logoShape) {
                case 'circle':
                    ctx.beginPath();
                    const radius = logoSize / 2;
                    ctx.arc(logoX + radius, logoY + radius, radius, 0, Math.PI * 2, true);
                    ctx.closePath();
                    ctx.stroke();
                    break;
                    
                case 'rounded':
                    ctx.beginPath();
                    const cornerRadius = logoSize * 0.2;
                    drawRoundedRect(ctx, logoX, logoY, logoSize, logoSize, cornerRadius);
                    ctx.stroke();
                    break;
                    
                case 'shield':
                    ctx.beginPath();
                    drawShield(ctx, logoX, logoY, logoSize, logoSize);
                    ctx.stroke();
                    break;
                    
                case 'square':
                default:
                    ctx.strokeRect(logoX, logoY, logoSize, logoSize);
                    break;
            }
        }
    }
    
    // Restaurar los módulos de posicionamiento del QR (esquinas y patrones de alineación)
    // para garantizar que el QR siga siendo legible
    restoreQRPositioningModules(ctx, tempCanvas, size);
}

// Función auxiliar para dibujar un rectángulo redondeado
function drawRoundedRect(ctx, x, y, width, height, radius) {
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
}

// Función auxiliar para dibujar un escudo
function drawShield(ctx, x, y, width, height) {
    ctx.moveTo(x + width / 2, y);
    ctx.lineTo(x + width, y + height * 0.3);
    ctx.lineTo(x + width, y + height * 0.7);
    ctx.quadraticCurveTo(x + width, y + height, x + width / 2, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height * 0.7);
    ctx.lineTo(x, y + height * 0.3);
    ctx.closePath();
}

// Función para restaurar los módulos de posicionamiento del QR
function restoreQRPositioningModules(ctx, tempCanvas, size) {
    const tempCtx = tempCanvas.getContext('2d');
    const qrModuleCount = qrCode._qr.moduleCount;
    const moduleSize = size / qrModuleCount;
    
    // Restaurar los patrones de posicionamiento (esquinas)
    // Esquina superior izquierda
    restoreQRArea(ctx, tempCtx, 0, 0, 7 * moduleSize, 7 * moduleSize);
    
    // Esquina superior derecha
    restoreQRArea(ctx, tempCtx, size - 7 * moduleSize, 0, 7 * moduleSize, 7 * moduleSize);
    
    // Esquina inferior izquierda
    restoreQRArea(ctx, tempCtx, 0, size - 7 * moduleSize, 7 * moduleSize, 7 * moduleSize);
    
    // Patrón de alineación (presente en códigos QR de versión 2 o superior)
    if (qrModuleCount >= 25) { // Aproximadamente versión 2 o superior
        // Restaurar el patrón de alineación (generalmente en la esquina inferior derecha)
        restoreQRArea(ctx, tempCtx, size - 9 * moduleSize, size - 9 * moduleSize, 5 * moduleSize, 5 * moduleSize);
    }
    
    // Restaurar los patrones de sincronización (líneas punteadas)
    // Horizontal
    restoreQRArea(ctx, tempCtx, 8 * moduleSize, 6 * moduleSize, size - 16 * moduleSize, moduleSize);
    
    // Vertical
    restoreQRArea(ctx, tempCtx, 6 * moduleSize, 8 * moduleSize, moduleSize, size - 16 * moduleSize);
}

// Función auxiliar para restaurar un área específica del QR
function restoreQRArea(ctx, tempCtx, x, y, width, height) {
    // Obtener los datos de la imagen del canvas temporal (QR original)
    const imageData = tempCtx.getImageData(x, y, width, height);
    
    // Restaurar esa área en el canvas principal
    ctx.putImageData(imageData, x, y);
}

// Función para habilitar los botones de descarga
function enableDownloadButtons() {
    downloadPngBtn.disabled = false;
    downloadSvgBtn.disabled = false;
    downloadPdfBtn.disabled = false;
}

// Función para descargar el QR en diferentes formatos
function downloadQR(format) {
    if (!qrCode) {
        showMessage('Primero debes generar un código QR', 'error');
        return;
    }

    const canvas = document.getElementById('qr-canvas');
    const text = qrText.value.trim();
    const filename = `qr-code-${Date.now()}`;

    switch (format) {
        case 'png':
            // Descargar como PNG
            canvas.toBlob(function(blob) {
                saveAs(blob, `${filename}.png`);
            });
            break;
        
        case 'svg':
            // Mostrar el código SVG en una ventana modal
            showSvgCode();
            break;
        
        case 'pdf':
            // Convertir a PDF y descargar
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });
            
            // Añadir título
            pdf.setFontSize(16);
            pdf.text('Código QR Generado', 105, 20, { align: 'center' });
            
            // Añadir contenido del QR como texto
            pdf.setFontSize(12);
            pdf.text(`Contenido: ${text.substring(0, 50)}${text.length > 50 ? '...' : ''}`, 105, 30, { align: 'center' });
            
            // Añadir fecha de generación
            const date = new Date().toLocaleDateString();
            pdf.setFontSize(10);
            pdf.text(`Generado el: ${date}`, 105, 40, { align: 'center' });
            
            // Convertir canvas a imagen para PDF
            const imgData = canvas.toDataURL('image/png');
            
            // Calcular dimensiones para centrar en la página
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = 100;
            const imgHeight = 100;
            const x = (pdfWidth - imgWidth) / 2;
            const y = 50;
            
            // Añadir la imagen del QR
            pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
            
            // Guardar PDF
            pdf.save(`${filename}.pdf`);
            break;
    }

    showMessage(`Código QR descargado en formato ${format.toUpperCase()}`, 'success');
}

// Función para convertir canvas a SVG
function canvasToSVG(canvas, qrCode) {
    const size = canvas.width;
    const qrValue = qrCode.value;
    const qrBackground = qrCode.background;
    const qrForeground = qrCode.foreground;
    
    // Crear el SVG
    let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">`;
    
    // Añadir fondo
    svg += `<rect width="${size}" height="${size}" fill="${qrBackground}"/>`;
    
    // Obtener datos de la imagen del canvas
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, size, size);
    const data = imageData.data;
    
    // Tamaño de cada módulo QR
    const moduleSize = size / qrCode._qr.moduleCount;
    
    // Recorrer los datos de la imagen y crear rectángulos para los módulos oscuros
    for (let y = 0; y < size; y += moduleSize) {
        for (let x = 0; x < size; x += moduleSize) {
            const i = (Math.floor(y) * size + Math.floor(x)) * 4;
            // Si el pixel es oscuro (parte del QR)
            if (data[i] < 128) {
                svg += `<rect x="${x}" y="${y}" width="${moduleSize}" height="${moduleSize}" fill="${qrForeground}"/>`;
            }
        }
    }
    
    // Si hay un logo, añadirlo con la forma correcta en el SVG
    if (logoImage) {
        // Obtener valores de personalización
        const logoShape = qrLogoShape.value;
        const logoSizePercent = parseInt(qrLogoSize.value) / 100;
        const logoBorder = qrLogoBorder.value;
        
        // Limitar el tamaño máximo del logo para evitar interferencias con el QR
        const maxLogoSizePercent = 0.25; // 25% máximo para garantizar legibilidad
        const actualLogoSizePercent = Math.min(logoSizePercent, maxLogoSizePercent);
        
        // Calcular tamaño del logo basado en el porcentaje seleccionado
        const logoSize = size * actualLogoSizePercent;
        const logoX = (size - logoSize) / 2;
        const logoY = (size - logoSize) / 2;
        
        // Calcular dimensiones proporcionales
        const aspectRatio = logoImage.width / logoImage.height;
        let drawWidth, drawHeight, offsetX = 0, offsetY = 0;
        
        if (aspectRatio > 1) {
            // Imagen más ancha que alta
            drawWidth = logoSize;
            drawHeight = logoSize / aspectRatio;
            offsetY = (logoSize - drawHeight) / 2;
        } else {
            // Imagen más alta que ancha o cuadrada
            drawHeight = logoSize;
            drawWidth = logoSize * aspectRatio;
            offsetX = (logoSize - drawWidth) / 2;
        }
        
        // Añadir un fondo blanco para el logo (zona de seguridad)
        switch (logoShape) {
            case 'circle':
                const circleRadius = logoSize / 2;
                svg += `<circle cx="${logoX + circleRadius}" cy="${logoY + circleRadius}" r="${circleRadius + 2}" fill="white"/>`;
                break;
                
            case 'rounded':
                svg += `<path d="
                    M ${logoX - 2 + (logoSize + 4) * 0.2} ${logoY - 2}
                    H ${logoX - 2 + (logoSize + 4) - (logoSize + 4) * 0.2}
                    Q ${logoX - 2 + (logoSize + 4)} ${logoY - 2} ${logoX - 2 + (logoSize + 4)} ${logoY - 2 + (logoSize + 4) * 0.2}
                    V ${logoY - 2 + (logoSize + 4) - (logoSize + 4) * 0.2}
                    Q ${logoX - 2 + (logoSize + 4)} ${logoY - 2 + (logoSize + 4)} ${logoX - 2 + (logoSize + 4) - (logoSize + 4) * 0.2} ${logoY - 2 + (logoSize + 4)}
                    H ${logoX - 2 + (logoSize + 4) * 0.2}
                    Q ${logoX - 2} ${logoY - 2 + (logoSize + 4)} ${logoX - 2} ${logoY - 2 + (logoSize + 4) - (logoSize + 4) * 0.2}
                    V ${logoY - 2 + (logoSize + 4) * 0.2}
                    Q ${logoX - 2} ${logoY - 2} ${logoX - 2 + (logoSize + 4) * 0.2} ${logoY - 2}
                    Z" fill="white"/>`;
                break;
                
            case 'shield':
                svg += `<path d="
                    M ${logoX - 2 + (logoSize + 4) / 2} ${logoY - 2}
                    L ${logoX - 2 + (logoSize + 4)} ${logoY - 2 + (logoSize + 4) * 0.3}
                    L ${logoX - 2 + (logoSize + 4)} ${logoY - 2 + (logoSize + 4) * 0.7}
                    Q ${logoX - 2 + (logoSize + 4)} ${logoY - 2 + (logoSize + 4)} ${logoX - 2 + (logoSize + 4) / 2} ${logoY - 2 + (logoSize + 4)}
                    Q ${logoX - 2} ${logoY - 2 + (logoSize + 4)} ${logoX - 2} ${logoY - 2 + (logoSize + 4) * 0.7}
                    L ${logoX - 2} ${logoY - 2 + (logoSize + 4) * 0.3}
                    Z" fill="white"/>`;
                break;
                
            case 'square':
            default:
                svg += `<rect x="${logoX - 2}" y="${logoY - 2}" width="${logoSize + 4}" height="${logoSize + 4}" fill="white"/>`;
                break;
        }
        
        // Añadir un clipPath para la forma
        const clipPathId = `logo-clip-${Date.now()}`;
        svg += `<defs><clipPath id="${clipPathId}">`;
        
        switch (logoShape) {
            case 'circle':
                const radius = logoSize / 2;
                svg += `<circle cx="${logoX + radius}" cy="${logoY + radius}" r="${radius}" />`;
                break;
                
            case 'rounded':
                const cornerRadius = logoSize * 0.2;
                svg += `<path d="
                    M ${logoX + cornerRadius} ${logoY}
                    L ${logoX + logoSize - cornerRadius} ${logoY}
                    Q ${logoX + logoSize} ${logoY} ${logoX + logoSize} ${logoY + cornerRadius}
                    L ${logoX + logoSize} ${logoY + logoSize - cornerRadius}
                    Q ${logoX + logoSize} ${logoY + logoSize} ${logoX + logoSize - cornerRadius} ${logoY + logoSize}
                    L ${logoX + cornerRadius} ${logoY + logoSize}
                    Q ${logoX} ${logoY + logoSize} ${logoX} ${logoY + logoSize - cornerRadius}
                    L ${logoX} ${logoY + cornerRadius}
                    Q ${logoX} ${logoY} ${logoX + cornerRadius} ${logoY}
                    Z" />`;
                break;
                
            case 'shield':
                svg += `<path d="
                    M ${logoX + logoSize / 2} ${logoY}
                    L ${logoX + logoSize} ${logoY + logoSize * 0.3}
                    L ${logoX + logoSize} ${logoY + logoSize * 0.7}
                    Q ${logoX + logoSize} ${logoY + logoSize} ${logoX + logoSize / 2} ${logoY + logoSize}
                    Q ${logoX} ${logoY + logoSize} ${logoX} ${logoY + logoSize * 0.7}
                    L ${logoX} ${logoY + logoSize * 0.3}
                    Z" />`;
                break;
                
            case 'square':
            default:
                svg += `<rect x="${logoX}" y="${logoY}" width="${logoSize}" height="${logoSize}" />`;
                break;
        }
        
        svg += `</clipPath></defs>`;
        
        // Añadir la imagen con el clipPath
        svg += `<image x="${logoX + offsetX}" y="${logoY + offsetY}" width="${drawWidth}" height="${drawHeight}" 
                href="${logoImage.src}" clip-path="url(#${clipPathId})" />`;
        
        // Añadir borde si es necesario
        if (logoBorder !== 'none') {
            let borderWidth;
            switch (logoBorder) {
                case 'thin': borderWidth = 1; break;     // Reducido para minimizar interferencia
                case 'medium': borderWidth = 2; break;   // Reducido para minimizar interferencia
                case 'thick': borderWidth = 3; break;    // Reducido para minimizar interferencia
                default: borderWidth = 0;
            }
            
            if (borderWidth > 0) {
                svg += `<g fill="none" stroke="#FFFFFF" stroke-width="${borderWidth}">`;
                
                switch (logoShape) {
                    case 'circle':
                        const radius = logoSize / 2;
                        svg += `<circle cx="${logoX + radius}" cy="${logoY + radius}" r="${radius}" />`;
                        break;
                        
                    case 'rounded':
                        const cornerRadius = logoSize * 0.2;
                        svg += `<path d="
                            M ${logoX + cornerRadius} ${logoY}
                            L ${logoX + logoSize - cornerRadius} ${logoY}
                            Q ${logoX + logoSize} ${logoY} ${logoX + logoSize} ${logoY + cornerRadius}
                            L ${logoX + logoSize} ${logoY + logoSize - cornerRadius}
                            Q ${logoX + logoSize} ${logoY + logoSize} ${logoX + logoSize - cornerRadius} ${logoY + logoSize}
                            L ${logoX + cornerRadius} ${logoY + logoSize}
                            Q ${logoX} ${logoY + logoSize} ${logoX} ${logoY + logoSize - cornerRadius}
                            L ${logoX} ${logoY + cornerRadius}
                            Q ${logoX} ${logoY} ${logoX + cornerRadius} ${logoY}
                            Z" />`;
                        break;
                        
                    case 'shield':
                        svg += `<path d="
                            M ${logoX + logoSize / 2} ${logoY}
                            L ${logoX + logoSize} ${logoY + logoSize * 0.3}
                            L ${logoX + logoSize} ${logoY + logoSize * 0.7}
                            Q ${logoX + logoSize} ${logoY + logoSize} ${logoX + logoSize / 2} ${logoY + logoSize}
                            Q ${logoX} ${logoY + logoSize} ${logoX} ${logoY + logoSize * 0.7}
                            L ${logoX} ${logoY + logoSize * 0.3}
                            Z" />`;
                        break;
                        
                    case 'square':
                    default:
                        svg += `<rect x="${logoX}" y="${logoY}" width="${logoSize}" height="${logoSize}" />`;
                        break;
                }
                
                svg += `</g>`;
            }
        }
    }
    
    svg += '</svg>';
    return svg;
}

// Función para mostrar mensajes
function showMessage(message, type = 'info') {
    // Crear elemento de mensaje si no existe
    let messageContainer = document.querySelector('.message-container');
    if (!messageContainer) {
        messageContainer = document.createElement('div');
        messageContainer.className = 'message-container';
        document.querySelector('.container').prepend(messageContainer);
        
        // Estilos para el contenedor de mensajes
        messageContainer.style.position = 'fixed';
        messageContainer.style.top = '20px';
        messageContainer.style.right = '20px';
        messageContainer.style.zIndex = '1000';
        messageContainer.style.maxWidth = '300px';
    }
    
    // Crear el mensaje
    const messageElement = document.createElement('div');
    messageElement.className = `message message-${type}`;
    messageElement.textContent = message;
    
    // Estilos para el mensaje
    messageElement.style.padding = '10px 15px';
    messageElement.style.marginBottom = '10px';
    messageElement.style.borderRadius = '4px';
    messageElement.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
    messageElement.style.animation = 'fadeIn 0.3s ease-in';
    
    // Colores según el tipo
    if (type === 'error') {
        messageElement.style.backgroundColor = '#f8d7da';
        messageElement.style.color = '#721c24';
        messageElement.style.borderLeft = '4px solid #dc3545';
    } else if (type === 'success') {
        messageElement.style.backgroundColor = '#d4edda';
        messageElement.style.color = '#155724';
        messageElement.style.borderLeft = '4px solid #28a745';
    } else {
        messageElement.style.backgroundColor = '#cce5ff';
        messageElement.style.color = '#004085';
        messageElement.style.borderLeft = '4px solid #007bff';
    }
    
    // Añadir al contenedor
    messageContainer.appendChild(messageElement);
    
    // Eliminar después de 3 segundos
    setTimeout(() => {
        messageElement.style.opacity = '0';
        messageElement.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            messageElement.remove();
        }, 500);
    }, 3000);
}
