// Datos de estilos predefinidos para QR
const predefinedQRs = [
    // COLORES PRIMARIOS
    {
        id: 1,
        title: "Rojo Clásico",
        category: "primarios",
        color: "#E53935",
        background: "#FFFFFF",
        description: "Estilo clásico en rojo intenso"
    },
    {
        id: 2,
        title: "Azul Profundo",
        category: "primarios",
        color: "#1565C0",
        background: "#FFFFFF",
        description: "Azul elegante y profesional"
    },
    {
        id: 3,
        title: "Amarillo Solar",
        category: "primarios",
        color: "#FDD835",
        background: "#FFFFFF",
        description: "Amarillo brillante y luminoso"
    },
    {
        id: 4,
        title: "Verde Esmeralda",
        category: "primarios",
        color: "#2E7D32",
        background: "#FFFFFF",
        description: "Verde vibrante y natural"
    },
    {
        id: 5,
        title: "Negro Elegante",
        category: "primarios",
        color: "#212121",
        background: "#FFFFFF",
        description: "Negro clásico y sofisticado"
    },
    
    // COLORES SECUNDARIOS
    {
        id: 6,
        title: "Púrpura Real",
        category: "secundarios",
        color: "#6A1B9A",
        background: "#FFFFFF",
        description: "Púrpura elegante y distinguido"
    },
    {
        id: 7,
        title: "Naranja Vibrante",
        category: "secundarios",
        color: "#F57C00",
        background: "#FFFFFF",
        description: "Naranja energético y llamativo"
    },
    {
        id: 8,
        title: "Turquesa Fresco",
        category: "secundarios",
        color: "#00ACC1",
        background: "#FFFFFF",
        description: "Turquesa refrescante y moderno"
    },
    {
        id: 9,
        title: "Rosa Intenso",
        category: "secundarios",
        color: "#D81B60",
        background: "#FFFFFF",
        description: "Rosa vibrante y juvenil"
    },
    {
        id: 10,
        title: "Verde Lima",
        category: "secundarios",
        color: "#7CB342",
        background: "#FFFFFF",
        description: "Verde lima fresco y juvenil"
    },
    
    // FONDOS COLORIDOS
    {
        id: 11,
        title: "Fondo Azul",
        category: "fondos",
        color: "#FFFFFF",
        background: "#1976D2",
        description: "Fondo azul con código blanco"
    },
    {
        id: 12,
        title: "Fondo Verde",
        category: "fondos",
        color: "#FFFFFF",
        background: "#388E3C",
        description: "Fondo verde con código blanco"
    },
    {
        id: 13,
        title: "Fondo Rojo",
        category: "fondos",
        color: "#FFFFFF",
        background: "#D32F2F",
        description: "Fondo rojo con código blanco"
    },
    {
        id: 14,
        title: "Fondo Púrpura",
        category: "fondos",
        color: "#FFFFFF",
        background: "#7B1FA2",
        description: "Fondo púrpura con código blanco"
    },
    {
        id: 15,
        title: "Fondo Naranja",
        category: "fondos",
        color: "#FFFFFF",
        background: "#EF6C00",
        description: "Fondo naranja con código blanco"
    },
    {
        id: 16,
        title: "Fondo Negro",
        category: "fondos",
        color: "#FFFFFF",
        background: "#212121",
        description: "Fondo negro con código blanco"
    },
    {
        id: 17,
        title: "Fondo Gris",
        category: "fondos",
        color: "#FFFFFF",
        background: "#616161",
        description: "Fondo gris con código blanco"
    },
    {
        id: 18,
        title: "Fondo Turquesa",
        category: "fondos",
        color: "#FFFFFF",
        background: "#00838F",
        description: "Fondo turquesa con código blanco"
    },
    {
        id: 19,
        title: "Fondo Rosa",
        category: "fondos",
        color: "#FFFFFF",
        background: "#C2185B",
        description: "Fondo rosa con código blanco"
    },
    {
        id: 20,
        title: "Fondo Ámbar",
        category: "fondos",
        color: "#212121",
        background: "#FFA000",
        description: "Fondo ámbar con código oscuro"
    },
    
    // ELEGANTES
    {
        id: 21,
        title: "Azul Marino",
        category: "elegantes",
        color: "#0D47A1",
        background: "#E3F2FD",
        description: "Azul marino sobre fondo celeste claro"
    },
    {
        id: 22,
        title: "Verde Bosque",
        category: "elegantes",
        color: "#1B5E20",
        background: "#E8F5E9",
        description: "Verde bosque sobre fondo verde pálido"
    },
    {
        id: 23,
        title: "Burdeos",
        category: "elegantes",
        color: "#B71C1C",
        background: "#FFEBEE",
        description: "Burdeos sobre fondo rosa pálido"
    },
    {
        id: 24,
        title: "Índigo Real",
        category: "elegantes",
        color: "#4527A0",
        background: "#EDE7F6",
        description: "Índigo sobre fondo lavanda claro"
    },
    {
        id: 25,
        title: "Marrón Chocolate",
        category: "elegantes",
        color: "#5D4037",
        background: "#EFEBE9",
        description: "Marrón chocolate sobre fondo beige"
    },
    {
        id: 26,
        title: "Azul Grisáceo",
        category: "elegantes",
        color: "#455A64",
        background: "#ECEFF1",
        description: "Azul grisáceo sobre fondo gris pálido"
    },
    {
        id: 27,
        title: "Verde Oliva",
        category: "elegantes",
        color: "#827717",
        background: "#F9FBE7",
        description: "Verde oliva sobre fondo amarillo pálido"
    },
    {
        id: 28,
        title: "Ciruela",
        category: "elegantes",
        color: "#6A1B9A",
        background: "#F3E5F5",
        description: "Ciruela sobre fondo lila pálido"
    },
    {
        id: 29,
        title: "Azul Petróleo",
        category: "elegantes",
        color: "#00695C",
        background: "#E0F2F1",
        description: "Azul petróleo sobre fondo menta pálido"
    },
    {
        id: 30,
        title: "Gris Pizarra",
        category: "elegantes",
        color: "#37474F",
        background: "#ECEFF1",
        description: "Gris pizarra sobre fondo gris pálido"
    },
    
    // CORPORATIVOS
    {
        id: 31,
        title: "Azul Corporativo",
        category: "corporativos",
        color: "#0277BD",
        background: "#FFFFFF",
        description: "Azul profesional para empresas"
    },
    {
        id: 32,
        title: "Gris Ejecutivo",
        category: "corporativos",
        color: "#424242",
        background: "#FFFFFF",
        description: "Gris sobrio y profesional"
    },
    {
        id: 33,
        title: "Azul Acero",
        category: "corporativos",
        color: "#1565C0",
        background: "#E3F2FD",
        description: "Azul acero sobre fondo celeste"
    },
    {
        id: 34,
        title: "Verde Corporativo",
        category: "corporativos",
        color: "#2E7D32",
        background: "#FFFFFF",
        description: "Verde institucional y confiable"
    },
    {
        id: 35,
        title: "Burdeos Ejecutivo",
        category: "corporativos",
        color: "#880E4F",
        background: "#FFFFFF",
        description: "Burdeos elegante y distinguido"
    },
    {
        id: 36,
        title: "Azul Índigo",
        category: "corporativos",
        color: "#303F9F",
        background: "#FFFFFF",
        description: "Azul índigo profesional"
    },
    {
        id: 37,
        title: "Gris Azulado",
        category: "corporativos",
        color: "#546E7A",
        background: "#FFFFFF",
        description: "Gris con tono azulado corporativo"
    },
    {
        id: 38,
        title: "Verde Oscuro",
        category: "corporativos",
        color: "#1B5E20",
        background: "#FFFFFF",
        description: "Verde oscuro institucional"
    },
    {
        id: 39,
        title: "Azul Marino Corporativo",
        category: "corporativos",
        color: "#0D47A1",
        background: "#FFFFFF",
        description: "Azul marino formal y profesional"
    },
    {
        id: 40,
        title: "Gris Carbón",
        category: "corporativos",
        color: "#263238",
        background: "#FFFFFF",
        description: "Gris carbón elegante y sobrio"
    },
    
    // VIBRANTES
    {
        id: 41,
        title: "Magenta Eléctrico",
        category: "vibrantes",
        color: "#C2185B",
        background: "#FCE4EC",
        description: "Magenta vibrante sobre fondo rosa pálido"
    },
    {
        id: 42,
        title: "Naranja Fuego",
        category: "vibrantes",
        color: "#EF6C00",
        background: "#FFF3E0",
        description: "Naranja intenso sobre fondo melocotón"
    },
    {
        id: 43,
        title: "Lima Neón",
        category: "vibrantes",
        color: "#7CB342",
        background: "#F1F8E9",
        description: "Verde lima sobre fondo verde pálido"
    },
    {
        id: 44,
        title: "Azul Eléctrico",
        category: "vibrantes",
        color: "#1E88E5",
        background: "#E3F2FD",
        description: "Azul brillante sobre fondo celeste"
    },
    {
        id: 45,
        title: "Fucsia Intenso",
        category: "vibrantes",
        color: "#D81B60",
        background: "#FCE4EC",
        description: "Fucsia vibrante sobre fondo rosa pálido"
    },
    {
        id: 46,
        title: "Amarillo Sol",
        category: "vibrantes",
        color: "#F9A825",
        background: "#FFFDE7",
        description: "Amarillo brillante sobre fondo crema"
    },
    {
        id: 47,
        title: "Turquesa Brillante",
        category: "vibrantes",
        color: "#00ACC1",
        background: "#E0F7FA",
        description: "Turquesa vibrante sobre fondo celeste"
    },
    {
        id: 48,
        title: "Rojo Fuego",
        category: "vibrantes",
        color: "#E53935",
        background: "#FFEBEE",
        description: "Rojo intenso sobre fondo rosa pálido"
    },
    {
        id: 49,
        title: "Verde Neón",
        category: "vibrantes",
        color: "#43A047",
        background: "#E8F5E9",
        description: "Verde brillante sobre fondo verde pálido"
    },
    {
        id: 50,
        title: "Morado Intenso",
        category: "vibrantes",
        color: "#8E24AA",
        background: "#F3E5F5",
        description: "Morado vibrante sobre fondo lila"
    },
    
    // PASTELES
    {
        id: 51,
        title: "Rosa Pastel",
        category: "pasteles",
        color: "#EC407A",
        background: "#FCE4EC",
        description: "Rosa suave sobre fondo rosa pálido"
    },
    {
        id: 52,
        title: "Azul Pastel",
        category: "pasteles",
        color: "#42A5F5",
        background: "#E3F2FD",
        description: "Azul suave sobre fondo celeste"
    },
    {
        id: 53,
        title: "Verde Menta",
        category: "pasteles",
        color: "#66BB6A",
        background: "#E8F5E9",
        description: "Verde menta sobre fondo verde pálido"
    },
    {
        id: 54,
        title: "Lila Suave",
        category: "pasteles",
        color: "#AB47BC",
        background: "#F3E5F5",
        description: "Lila suave sobre fondo lavanda"
    },
    {
        id: 55,
        title: "Melocotón",
        category: "pasteles",
        color: "#FF7043",
        background: "#FBE9E7",
        description: "Melocotón sobre fondo durazno pálido"
    },
    {
        id: 56,
        title: "Amarillo Pastel",
        category: "pasteles",
        color: "#FFCA28",
        background: "#FFFDE7",
        description: "Amarillo suave sobre fondo crema"
    },
    {
        id: 57,
        title: "Celeste Suave",
        category: "pasteles",
        color: "#26C6DA",
        background: "#E0F7FA",
        description: "Celeste suave sobre fondo azul pálido"
    },
    {
        id: 58,
        title: "Coral Pastel",
        category: "pasteles",
        color: "#FF8A65",
        background: "#FBE9E7",
        description: "Coral suave sobre fondo melocotón"
    },
    {
        id: 59,
        title: "Verde Agua",
        category: "pasteles",
        color: "#26A69A",
        background: "#E0F2F1",
        description: "Verde agua sobre fondo menta pálido"
    },
    {
        id: 60,
        title: "Lavanda",
        category: "pasteles",
        color: "#7E57C2",
        background: "#EDE7F6",
        description: "Lavanda sobre fondo lila pálido"
    },
    
    // MONOCROMÁTICOS
    {
        id: 61,
        title: "Azul Monocromático",
        category: "monocromaticos",
        color: "#1976D2",
        background: "#BBDEFB",
        description: "Azul sobre fondo azul claro"
    },
    {
        id: 62,
        title: "Verde Monocromático",
        category: "monocromaticos",
        color: "#388E3C",
        background: "#C8E6C9",
        description: "Verde sobre fondo verde claro"
    },
    {
        id: 63,
        title: "Rojo Monocromático",
        category: "monocromaticos",
        color: "#D32F2F",
        background: "#FFCDD2",
        description: "Rojo sobre fondo rojo claro"
    },
    {
        id: 64,
        title: "Púrpura Monocromático",
        category: "monocromaticos",
        color: "#7B1FA2",
        background: "#E1BEE7",
        description: "Púrpura sobre fondo púrpura claro"
    },
    {
        id: 65,
        title: "Naranja Monocromático",
        category: "monocromaticos",
        color: "#EF6C00",
        background: "#FFE0B2",
        description: "Naranja sobre fondo naranja claro"
    },
    {
        id: 66,
        title: "Gris Monocromático",
        category: "monocromaticos",
        color: "#424242",
        background: "#EEEEEE",
        description: "Gris oscuro sobre fondo gris claro"
    },
    {
        id: 67,
        title: "Turquesa Monocromático",
        category: "monocromaticos",
        color: "#00838F",
        background: "#B2EBF2",
        description: "Turquesa sobre fondo turquesa claro"
    },
    {
        id: 68,
        title: "Rosa Monocromático",
        category: "monocromaticos",
        color: "#C2185B",
        background: "#F8BBD0",
        description: "Rosa sobre fondo rosa claro"
    },
    {
        id: 69,
        title: "Ámbar Monocromático",
        category: "monocromaticos",
        color: "#FF8F00",
        background: "#FFECB3",
        description: "Ámbar sobre fondo ámbar claro"
    },
    {
        id: 70,
        title: "Índigo Monocromático",
        category: "monocromaticos",
        color: "#303F9F",
        background: "#C5CAE9",
        description: "Índigo sobre fondo índigo claro"
    },
    
    // DEGRADADOS
    {
        id: 71,
        title: "Amanecer",
        category: "degradados",
        color: "#FF5722",
        background: "#FFF8E1",
        description: "Naranja sobre fondo amarillo pálido"
    },
    {
        id: 72,
        title: "Océano",
        category: "degradados",
        color: "#0288D1",
        background: "#E1F5FE",
        description: "Azul océano sobre fondo celeste"
    },
    {
        id: 73,
        title: "Bosque",
        category: "degradados",
        color: "#2E7D32",
        background: "#F1F8E9",
        description: "Verde bosque sobre fondo verde claro"
    },
    {
        id: 74,
        title: "Atardecer",
        category: "degradados",
        color: "#D84315",
        background: "#FFCCBC",
        description: "Naranja rojizo sobre fondo coral claro"
    },
    {
        id: 75,
        title: "Lavanda",
        category: "degradados",
        color: "#5E35B1",
        background: "#EDE7F6",
        description: "Púrpura sobre fondo lavanda"
    },
    {
        id: 76,
        title: "Menta",
        category: "degradados",
        color: "#00897B",
        background: "#E0F2F1",
        description: "Verde menta sobre fondo verde agua"
    },
    {
        id: 77,
        title: "Cereza",
        category: "degradados",
        color: "#C62828",
        background: "#FFEBEE",
        description: "Rojo cereza sobre fondo rosa pálido"
    },
    {
        id: 78,
        title: "Cielo",
        category: "degradados",
        color: "#1976D2",
        background: "#E3F2FD",
        description: "Azul cielo sobre fondo celeste"
    },
    {
        id: 79,
        title: "Uva",
        category: "degradados",
        color: "#6A1B9A",
        background: "#F3E5F5",
        description: "Púrpura uva sobre fondo lila"
    },
    {
        id: 80,
        title: "Limón",
        category: "degradados",
        color: "#AFB42B",
        background: "#F9FBE7",
        description: "Verde limón sobre fondo amarillo pálido"
    },
    
    // METÁLICOS
    {
        id: 81,
        title: "Oro",
        category: "metalicos",
        color: "#FF8F00",
        background: "#FFF8E1",
        description: "Dorado sobre fondo amarillo pálido"
    },
    {
        id: 82,
        title: "Plata",
        category: "metalicos",
        color: "#757575",
        background: "#F5F5F5",
        description: "Plateado sobre fondo gris claro"
    },
    {
        id: 83,
        title: "Bronce",
        category: "metalicos",
        color: "#8D6E63",
        background: "#EFEBE9",
        description: "Bronce sobre fondo beige"
    },
    {
        id: 84,
        title: "Cobre",
        category: "metalicos",
        color: "#BF360C",
        background: "#FBE9E7",
        description: "Cobre sobre fondo melocotón"
    },
    {
        id: 85,
        title: "Platino",
        category: "metalicos",
        color: "#546E7A",
        background: "#ECEFF1",
        description: "Platino sobre fondo gris azulado"
    },
    {
        id: 86,
        title: "Acero",
        category: "metalicos",
        color: "#455A64",
        background: "#ECEFF1",
        description: "Acero sobre fondo gris claro"
    },
    {
        id: 87,
        title: "Titanio",
        category: "metalicos",
        color: "#607D8B",
        background: "#ECEFF1",
        description: "Titanio sobre fondo gris azulado"
    },
    {
        id: 88,
        title: "Cromo",
        category: "metalicos",
        color: "#78909C",
        background: "#ECEFF1",
        description: "Cromo sobre fondo gris claro"
    },
    {
        id: 89,
        title: "Níquel",
        category: "metalicos",
        color: "#616161",
        background: "#F5F5F5",
        description: "Níquel sobre fondo gris claro"
    },
    {
        id: 90,
        title: "Aluminio",
        category: "metalicos",
        color: "#90A4AE",
        background: "#ECEFF1",
        description: "Aluminio sobre fondo gris azulado"
    },
    
    // NEÓN
    {
        id: 91,
        title: "Neón Rosa",
        category: "neon",
        color: "#FF1744",
        background: "#000000",
        description: "Rosa neón sobre fondo negro"
    },
    {
        id: 92,
        title: "Neón Verde",
        category: "neon",
        color: "#00E676",
        background: "#000000",
        description: "Verde neón sobre fondo negro"
    },
    {
        id: 93,
        title: "Neón Azul",
        category: "neon",
        color: "#2979FF",
        background: "#000000",
        description: "Azul neón sobre fondo negro"
    },
    {
        id: 94,
        title: "Neón Amarillo",
        category: "neon",
        color: "#FFEA00",
        background: "#000000",
        description: "Amarillo neón sobre fondo negro"
    },
    {
        id: 95,
        title: "Neón Naranja",
        category: "neon",
        color: "#FF9100",
        background: "#000000",
        description: "Naranja neón sobre fondo negro"
    },
    {
        id: 96,
        title: "Neón Púrpura",
        category: "neon",
        color: "#D500F9",
        background: "#000000",
        description: "Púrpura neón sobre fondo negro"
    },
    {
        id: 97,
        title: "Neón Turquesa",
        category: "neon",
        color: "#00E5FF",
        background: "#000000",
        description: "Turquesa neón sobre fondo negro"
    },
    {
        id: 98,
        title: "Neón Rojo",
        category: "neon",
        color: "#FF1744",
        background: "#000000",
        description: "Rojo neón sobre fondo negro"
    },
    {
        id: 99,
        title: "Neón Lima",
        category: "neon",
        color: "#C6FF00",
        background: "#000000",
        description: "Lima neón sobre fondo negro"
    },
    {
        id: 100,
        title: "Neón Fucsia",
        category: "neon",
        color: "#F50057",
        background: "#000000",
        description: "Fucsia neón sobre fondo negro"
    }
];

// Función para cargar los estilos predefinidos
function loadPredefinedQRs() {
    const container = document.getElementById('predefined-qr-container');
    const categoriesContainer = document.querySelector('.predefined-categories');
    let currentCategory = 'all';
    
    // Limpiar los botones de categoría existentes
    categoriesContainer.innerHTML = '';
    
    // Crear botón "Todos"
    const allButton = document.createElement('button');
    allButton.className = 'category-btn active';
    allButton.setAttribute('data-category', 'all');
    allButton.textContent = 'Todos';
    categoriesContainer.appendChild(allButton);
    
    // Obtener categorías únicas
    const uniqueCategories = [...new Set(predefinedQRs.map(qr => qr.category))];
    
    // Crear botones para cada categoría única
    uniqueCategories.forEach(category => {
        const button = document.createElement('button');
        button.className = 'category-btn';
        button.setAttribute('data-category', category);
        
        // Establecer el texto del botón según la categoría
        switch (category) {
            case 'primarios': button.textContent = 'Colores Primarios'; break;
            case 'secundarios': button.textContent = 'Colores Secundarios'; break;
            case 'fondos': button.textContent = 'Fondos de Color'; break;
            case 'elegantes': button.textContent = 'Elegantes'; break;
            case 'corporativos': button.textContent = 'Corporativos'; break;
            case 'vibrantes': button.textContent = 'Vibrantes'; break;
            case 'pasteles': button.textContent = 'Pasteles'; break;
            case 'monocromaticos': button.textContent = 'Monocromáticos'; break;
            case 'degradados': button.textContent = 'Degradados'; break;
            case 'metalicos': button.textContent = 'Metálicos'; break;
            case 'neon': button.textContent = 'Neón'; break;
            default: button.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        }
        
        categoriesContainer.appendChild(button);
    });
    
    // Función para renderizar los QR según la categoría
    function renderQRs(category) {
        // Limpiar el contenedor
        container.innerHTML = '';
        
        // Filtrar los QR según la categoría
        const filteredQRs = category === 'all' 
            ? predefinedQRs 
            : predefinedQRs.filter(qr => qr.category === category);
        
        // Si no hay QR en esta categoría
        if (filteredQRs.length === 0) {
            container.innerHTML = '<div class="loading-qr">No hay estilos predefinidos en esta categoría.</div>';
            return;
        }
        
        // Renderizar cada QR
        filteredQRs.forEach(qr => {
            const qrItem = document.createElement('div');
            qrItem.className = 'predefined-qr-item';
            qrItem.setAttribute('data-id', qr.id);
            qrItem.setAttribute('data-color', qr.color);
            qrItem.setAttribute('data-background', qr.background);
            
            // Crear un mini QR para la vista previa
            const canvas = document.createElement('canvas');
            canvas.width = 80;
            canvas.height = 80;
            
            // Generar el QR de ejemplo
            new QRious({
                element: canvas,
                value: 'EJEMPLO',
                size: 80,
                level: 'M',
                background: qr.background || '#FFFFFF',
                foreground: qr.color || '#000000'
            });
            
            const title = document.createElement('p');
            title.className = 'title';
            title.textContent = qr.title;
            
            qrItem.appendChild(canvas);
            qrItem.appendChild(title);
            
            // Evento al hacer clic en un estilo predefinido
            qrItem.addEventListener('click', () => {
                // Obtener el contenido actual del textarea
                const currentContent = document.getElementById('qr-text').value;
                
                // Establecer los colores según el estilo seleccionado
                document.getElementById('qr-color').value = qr.color;
                document.getElementById('qr-bg-color').value = qr.background;
                
                // Generar el QR con el contenido actual y los nuevos colores
                generateQRCode();
                
                // Desplazarse al área de resultado
                document.querySelector('.result-section').scrollIntoView({ behavior: 'smooth' });
                
                // Mostrar mensaje
                showMessage(`Estilo "${qr.title}" aplicado`, 'success');
            });
            
            container.appendChild(qrItem);
        });
    }
    
    // Inicializar con todos los QR
    renderQRs(currentCategory);
    
    // Manejar clics en los botones de categoría
    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Actualizar botones activos
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Actualizar categoría actual y renderizar
            currentCategory = button.getAttribute('data-category');
            renderQRs(currentCategory);
        });
    });
}
