// Variables globales
let qrCode = null;
let logoImage = null;
let scanHistory = (() => {
    try {
        return JSON.parse(localStorage.getItem('qr_history')) || [];
    } catch (e) {
        return [];
    }
})();

// Elementos del DOM
const qrText = document.getElementById('qr-text');
const qrColor = document.getElementById('qr-color');
const qrBgColor = document.getElementById('qr-bg-color');
const qrLogo = document.getElementById('qr-logo');
const qrLogoShape = document.getElementById('qr-logo-shape');
const qrLogoSize = document.getElementById('qr-logo-size');
const qrLogoBorder = document.getElementById('qr-logo-border');
const generateBtn = document.getElementById('generate-btn');
const qrCodeContainer = document.getElementById('qr-code-container');
const qrPlaceholder = document.getElementById('qr-placeholder');
const downloadPngBtn = document.getElementById('download-png-btn');
const downloadPdfBtn = document.getElementById('download-pdf-btn');
const addFrameCheckbox = document.getElementById('add-frame-checkbox');
const historyList = document.getElementById('history-list');

// Tab Elements
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

// Theme Elements
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    // Load History
    renderHistory();

    // Theme Toggle
    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    // About Me Modal Logic
    const aboutMeBtn = document.getElementById('about-me-btn');
    const aboutModal = document.getElementById('about-modal');
    const closeModalBtn = document.querySelector('.close-modal');
    const bgMusic = document.getElementById('bg-music');

    if (aboutMeBtn && aboutModal && closeModalBtn && bgMusic) {
        aboutMeBtn.addEventListener('click', () => {
            aboutModal.classList.add('active');
            bgMusic.volume = 0.5;
            bgMusic.play().catch(e => console.log('Audio playback failed', e));
        });

        closeModalBtn.addEventListener('click', () => {
            aboutModal.classList.remove('active');
            bgMusic.pause();
            bgMusic.currentTime = 0;
        });

        aboutModal.addEventListener('click', (e) => {
            if (e.target === aboutModal) {
                aboutModal.classList.remove('active');
                bgMusic.pause();
                bgMusic.currentTime = 0;
            }
        });
    }

    // Tab Switching
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => {
                c.style.display = 'none';
                c.classList.remove('active');
            });

            // Add active class to clicked
            btn.classList.add('active');
            const targetId = `tab-${btn.dataset.tab}`;
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.style.display = 'block';
                targetContent.classList.add('active');
            }
        });
    });

    // Eventos
    generateBtn.addEventListener('click', () => {
        generateQRCode();
        saveHistory();
    });
    qrLogo.addEventListener('change', handleLogoUpload);
    downloadPngBtn.addEventListener('click', () => downloadQR('png'));
    downloadPdfBtn.addEventListener('click', () => downloadQR('pdf'));

    // Live Preview & Auto-update
    // Listen to all inputs that might affect QR content
    const inputSelectors = [
        '#qr-text',
        '#email-address', '#email-subject', '#email-body',
        '#wifi-ssid', '#wifi-password', '#wifi-type',
        '#wa-number', '#wa-message',
        '#vcard-name', '#vcard-phone', '#vcard-email', '#vcard-org',
        '#event-title', '#event-location', '#event-start', '#event-end'
    ];

    const debounce = (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };

    const debouncedGenerate = debounce(generateQRCode, 300);

    // Add listeners to content inputs
    document.querySelectorAll(inputSelectors.join(',')).forEach(input => {
        input.addEventListener('input', debouncedGenerate);
    });

    // Add listeners to customization inputs
    [qrColor, qrBgColor, qrLogoShape, qrLogoSize, qrLogoBorder].forEach(el => {
        if (el) {
            el.addEventListener('input', () => {
                if (qrCode) generateQRCode();
            });
        }
    });
});

// Función para manejar la carga de logos
function handleLogoUpload(e) {
    const file = e.target.files[0];
    if (!file) {
        logoImage = null;
        if (qrCode) generateQRCode();
        return;
    }

    const reader = new FileReader();
    reader.onload = function (event) {
        const img = new Image();
        img.onload = function () {
            logoImage = img;
            if (qrCode) {
                generateQRCode();
            }
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
}

// Helper to get value from active tab
function getQRContent() {
    const activeTabObj = document.querySelector('.tab-content.active');
    const tabId = activeTabObj ? activeTabObj.id : 'tab-text';

    if (tabId === 'tab-text') {
        return { text: document.getElementById('qr-text').value.trim(), type: 'text' };
    } else if (tabId === 'tab-email') {
        const email = document.getElementById('email-address').value.trim();
        const subject = document.getElementById('email-subject').value.trim();
        const body = document.getElementById('email-body').value.trim();
        if (!email) return null;
        return {
            text: `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
            type: 'email',
            label: email
        };
    } else if (tabId === 'tab-wifi') {
        const ssid = document.getElementById('wifi-ssid').value.trim();
        const password = document.getElementById('wifi-password').value.trim();
        const type = document.getElementById('wifi-type').value;
        if (!ssid) return null;
        return {
            text: `WIFI:S:${ssid};T:${type};P:${password};;`,
            type: 'wifi',
            label: `WiFi: ${ssid}`
        };
    } else if (tabId === 'tab-whatsapp') {
        const phone = document.getElementById('wa-number').value.trim();
        const msg = document.getElementById('wa-message').value.trim();
        if (!phone) return null;
        return {
            text: `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(msg)}`,
            type: 'whatsapp',
            label: `WA: ${phone}`
        };
    } else if (tabId === 'tab-vcard') {
        const name = document.getElementById('vcard-name').value.trim();
        const phone = document.getElementById('vcard-phone').value.trim();
        const email = document.getElementById('vcard-email').value.trim();
        const org = document.getElementById('vcard-org').value.trim();
        if (!name) return null;
        const vcard = `BEGIN:VCARD\nVERSION:3.0\nN:${name}\nFN:${name}\nORG:${org}\nTEL:${phone}\nEMAIL:${email}\nEND:VCARD`;
        return {
            text: vcard,
            type: 'vcard',
            label: `Contact: ${name}`
        };
    } else if (tabId === 'tab-event') {
        const title = document.getElementById('event-title').value.trim();
        const loc = document.getElementById('event-location').value.trim();
        // Simple formatDate for VEVENT (yyyymmddThhmmss) - assumes local time input
        const formatDate = (val) => val ? val.replace(/[-:]/g, '').replace(' ', 'T') + '00' : '';
        const start = formatDate(document.getElementById('event-start').value);
        const end = formatDate(document.getElementById('event-end').value);
        if (!title) return null;
        const vevent = `BEGIN:VEVENT\nSUMMARY:${title}\nLOCATION:${loc}\nDTSTART:${start}\nDTEND:${end}\nEND:VEVENT`;
        return {
            text: vevent,
            type: 'event',
            label: `Event: ${title}`
        };
    }
    return null;
}

// Función principal para generar el código QR
function generateQRCode() {
    const content = getQRContent();

    if (!content || !content.text) {
        // Don't error on live preview if empty, just clear or ignore
        // If triggered by button, maybe show error? 
        // For smoother UX, if empty, show placeholder
        if (qrPlaceholder.style.display === 'none') {
            // Don't revert if we already have one, just don't update
        }
        return;
    }

    const size = 1000;
    const color = qrColor.value;
    const bgColor = qrBgColor.value;
    const errorCorrectionLevel = 'H';

    qrPlaceholder.style.display = 'none';
    qrCodeContainer.style.display = 'flex';
    qrCodeContainer.innerHTML = '';

    const canvas = document.createElement('canvas');
    canvas.id = 'qr-canvas';
    qrCodeContainer.appendChild(canvas);

    qrCode = new QRious({
        element: canvas,
        value: content.text,
        size: size,
        level: errorCorrectionLevel,
        background: bgColor,
        foreground: color
    });

    if (logoImage) {
        // Create temp canvas for logo processing if needed, 
        // but addLogoToQR draws directly on main canvas
        addLogoToQR(canvas, logoImage, size);
    }

    enableDownloadButtons();

    // Animation only if not already visible (to avoid flickering on typing)
    if (!canvas.classList.contains('active-qr')) {
        canvas.classList.add('fade-in');
        canvas.classList.add('active-qr');
    }
}

// Función para guardar historial
function saveHistory() {
    const content = getQRContent();
    if (!content) return;

    // Avoid duplicates
    const exists = scanHistory.some(h => h.text === content.text);
    if (exists) return;

    const entry = {
        text: content.text,
        type: content.type,
        label: content.label || content.text.substring(0, 20) + '...',
        date: new Date().toLocaleDateString()
    };

    scanHistory.unshift(entry);
    if (scanHistory.length > 10) scanHistory.pop(); // Keep last 10

    localStorage.setItem('qr_history', JSON.stringify(scanHistory));
    renderHistory();
}

function renderHistory() {
    historyList.innerHTML = '';
    if (scanHistory.length === 0) {
        historyList.innerHTML = '<p class="empty-history">No hay escaneos recientes</p>';
        return;
    }

    scanHistory.forEach(item => {
        const div = document.createElement('div');
        div.className = 'history-item';
        let iconClass = 'fa-qrcode';
        if (item.type === 'wifi') iconClass = 'fa-wifi';
        if (item.type === 'email') iconClass = 'fa-envelope';
        if (item.type === 'whatsapp') iconClass = 'fab fa-whatsapp';
        if (item.type === 'vcard') iconClass = 'fa-address-card';
        if (item.type === 'event') iconClass = 'fa-calendar-alt';

        div.innerHTML = `<i class="${iconClass}"></i> <span>${item.label}</span>`;
        div.onclick = () => {
            // Load content back to generic text tab mostly because parsing back to specific inputs is hard
            // For now, let's just generate the QR directly from text
            // To be perfect, we'd map it back to inputs, but for "Quick History" regenerating the QR is key.
            // We'll switch to text tab and fill it.
            document.querySelector('[data-tab="text"]').click();
            document.getElementById('qr-text').value = item.text;
            generateQRCode();
        };
        historyList.appendChild(div);
    });
}


// Función para añadir logo al centro del QR
function addLogoToQR(canvas, logoImg, size) {
    const ctx = canvas.getContext('2d');
    const logoShape = qrLogoShape.value;
    const logoSizePercent = parseInt(qrLogoSize.value) / 100;

    const maxLogoSizePercent = 0.30;
    const actualLogoSizePercent = Math.min(logoSizePercent, maxLogoSizePercent);

    const logoSize = size * actualLogoSizePercent;
    const logoX = (size - logoSize) / 2;
    const logoY = (size - logoSize) / 2;

    ctx.save();

    // Background for logo
    ctx.fillStyle = qrBgColor.value || '#FFFFFF';

    // Draw Shape
    ctx.beginPath();
    if (logoShape === 'circle') {
        const radius = logoSize / 2;
        ctx.arc(logoX + radius, logoY + radius, radius + 2, 0, Math.PI * 2);
    } else if (logoShape === 'rounded') {
        drawRoundedRect(ctx, logoX - 2, logoY - 2, logoSize + 4, logoSize + 4, logoSize * 0.2);
    } else if (logoShape === 'shield') {
        drawShield(ctx, logoX - 2, logoY - 2, logoSize + 4, logoSize + 4);
    } else {
        ctx.rect(logoX - 2, logoY - 2, logoSize + 4, logoSize + 4);
    }
    ctx.fill();
    ctx.clip(); // Clip subsequent drawing to this shape

    // Draw Image
    ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize);

    ctx.restore();
}

// Función auxiliar para dibujar un rectángulo redondeado
function drawRoundedRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
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

function drawShield(ctx, x, y, width, height) {
    ctx.beginPath();
    ctx.moveTo(x + width / 2, y);
    ctx.lineTo(x + width, y + height * 0.3);
    ctx.lineTo(x + width, y + height * 0.7);
    ctx.quadraticCurveTo(x + width, y + height, x + width / 2, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height * 0.7);
    ctx.lineTo(x, y + height * 0.3);
    ctx.closePath();
}

// Función para habilitar los botones de descarga
function enableDownloadButtons() {
    downloadPngBtn.disabled = false;
    downloadPdfBtn.disabled = false;
}

// Función para añadir marco
function addFrameToCanvas(originalCanvas) {
    const frameCanvas = document.createElement('canvas');
    const ctx = frameCanvas.getContext('2d');
    const padding = 100;
    const textHeight = 150;
    const originalSize = originalCanvas.width;

    const width = originalSize + (padding * 2);
    const height = originalSize + (padding * 2) + textHeight;

    frameCanvas.width = width;
    frameCanvas.height = height;

    // Background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    // Border
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 20;
    ctx.strokeRect(20, 20, width - 40, height - 40);

    // Text
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 80px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText("¡ESCANÉAME!", width / 2, height - 80);

    // Draw QR
    ctx.drawImage(originalCanvas, padding, padding);

    return frameCanvas;
}


// Función para descargar el QR
function downloadQR(format) {
    if (!qrCode) return;

    let canvas = document.getElementById('qr-canvas');

    // Check for frame
    if (addFrameCheckbox.checked) {
        canvas = addFrameToCanvas(canvas);
    }

    const filename = `qr-code-${Date.now()}`;

    switch (format) {
        case 'png':
            canvas.toBlob(function (blob) {
                saveAs(blob, `${filename}.png`);
            });
            break;
        case 'pdf':
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });
            // Calculate ratio to fit A4 (210mm width) with margins
            const imgData = canvas.toDataURL('image/png');
            const pdfWidth = 150;
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 30, 30, pdfWidth, pdfHeight);
            pdf.save(`${filename}.pdf`);
            break;
    }
    showMessage(`QR descargado: ${format.toUpperCase()}`, 'success');
}

// Función para mostrar mensajes
function showMessage(message, type = 'info') {
    let toast = document.createElement('div');
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.background = type === 'error' ? '#ef4444' : '#10b981';
    toast.style.color = 'white';
    toast.style.padding = '10px 20px';
    toast.style.borderRadius = '8px';
    toast.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
    toast.style.zIndex = '9999';
    toast.innerText = message;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Función para actualizar el icono del tema
function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}
