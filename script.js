document.addEventListener('DOMContentLoaded', () => {
    // 1️⃣ Lógica de Cambio de Pestañas (Tab Switching)
    // Funciones usadas: document.querySelectorAll() para seleccionar elementos, 
    // y addEventListener('click') para detectar eventos de usuario.
    const navBtns = document.querySelectorAll('.nav-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    let isAuthenticated = false; // Estado de autenticación para la sección protegida

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab'); // Método getAttribute() para leer datos personalizados

            // 🔒 Protección por Contraseña
            // Función usada: prompt() para pedir datos y condicional if/else para validar.
            if (tabId === 'resultados' && !isAuthenticated) {
                const password = prompt("Ingrese la contraseña de administrador:");
                if (password === "29863496") {
                    isAuthenticated = true; // Acceso concedido
                } else {
                    alert("Contraseña incorrecta."); // Función alert() para feedback de error
                    return; // Detiene la navegación
                }
            }

            // Actualizar clases (classList.add/remove) para mostrar la pestaña seleccionada
            navBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // 2️⃣ Generar Estrellas de Calificación Dinámicamente
    // Funciones usadas: document.createElement() para crear elementos en memoria
    // y appendChild() para agregarlos al DOM.
    document.querySelectorAll('.stars-input').forEach(container => {
        const name = container.dataset.name;
        // Crea estrellas de 5 a 1 (orden inverso para CSS)
        for (let i = 5; i >= 1; i--) {
            const input = document.createElement('input');
            input.type = 'radio';
            input.id = `${name}-${i}`;
            input.name = name;
            input.value = i;

            const label = document.createElement('label');
            label.htmlFor = `${name}-${i}`;
            label.textContent = '★';

            container.appendChild(input);
            container.appendChild(label);
        }
    });

    // 3️⃣ Estado de Datos del Dashboard (Base de Datos en Memoria)
    // Inicializamos con datos de prueba para simular un historial existente
    const surveyStats = {
        submissions: 100,
        overall: { 5: 65, 4: 25, 3: 10, 2: 0, 1: 0 }, // Conteo de estrellas
        areas: {
            recepcion: { sum: 480, count: 100 }, // Promedio 4.8
            habitaciones: { sum: 450, count: 100 }, // Promedio 4.5
            restaurante: { sum: 420, count: 100 }, // Promedio 4.2
            limpieza: { sum: 490, count: 100 }, // Promedio 4.9
            personal: { sum: 470, count: 100 }  // Promedio 4.7
        },
        // Datos históricos para gráficos de líneas/barras
        history: {
            cleanliness: [4.5, 4.6, 4.8, 4.7, 4.9, 4.8],
            comfort: [4.2, 4.3, 4.5, 4.6, 4.7, 4.7],
            checkin: [4.0, 4.2, 4.5, 4.8],
            kindness: [4.8, 4.9, 4.8, 4.9]
        }
    };

    // Instancias de Gráficos (librería Chart.js)
    const charts = {};

    // 4️⃣ Inicializar Gráficos
    // Se usa el constructor new Chart() para crear gráficos visuales en los elementos <canvas>
    const initCharts = () => {
        Chart.defaults.color = '#8892b0';
        Chart.defaults.borderColor = 'rgba(255, 255, 255, 0.1)';

        // 1. Overall Satisfaction (Doughnut)
        const ctxOverall = document.getElementById('overallChart').getContext('2d');
        charts.overall = new Chart(ctxOverall, {
            type: 'doughnut',
            data: {
                labels: ['5 Estrellas', '4 Estrellas', '3 Estrellas', '2 Estrellas', '1 Estrella'],
                datasets: [{
                    data: [65, 25, 10, 0, 0],
                    backgroundColor: ['#D4AF37', '#8892b0', '#112240', '#cf6679', '#ff0033'],
                    borderColor: '#020c1b',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { position: 'right' } }
            }
        });

        // 2. Performance by Area (Radar)
        const ctxArea = document.getElementById('areaChart').getContext('2d');
        charts.area = new Chart(ctxArea, {
            type: 'radar',
            data: {
                labels: ['Recepción', 'Habitaciones', 'Restaurante', 'Limpieza', 'Personal'],
                datasets: [{
                    label: 'Puntaje Promedio',
                    data: [4.8, 4.5, 4.2, 4.9, 4.7],
                    backgroundColor: 'rgba(212, 175, 55, 0.2)',
                    borderColor: '#D4AF37',
                    pointBackgroundColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                scales: {
                    r: {
                        ticks: { backdropColor: 'transparent', min: 0, max: 5 },
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        pointLabels: { color: '#E6F1FF' }
                    }
                }
            }
        });

        // 3. Cleanliness vs Comfort (Bar)
        const ctxClean = document.getElementById('cleanlinessChart').getContext('2d');
        charts.cleanliness = new Chart(ctxClean, {
            type: 'bar',
            data: {
                labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Actual'],
                datasets: [
                    { label: 'Limpieza', data: [...surveyStats.history.cleanliness], backgroundColor: '#D4AF37' },
                    { label: 'Confort', data: [...surveyStats.history.comfort], backgroundColor: '#8892b0' }
                ]
            },
            options: { responsive: true }
        });

        // 4. Service Speed vs Kindness (Line)
        const ctxService = document.getElementById('serviceChart').getContext('2d');
        charts.service = new Chart(ctxService, {
            type: 'line',
            data: {
                labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Actual'],
                datasets: [
                    { label: 'Rapidez Check-in', data: [...surveyStats.history.checkin], borderColor: '#D4AF37', tension: 0.4 },
                    { label: 'Amabilidad Personal', data: [...surveyStats.history.kindness], borderColor: '#8892b0', tension: 0.4 }
                ]
            },
            options: { responsive: true }
        });
    };

    // Initialize Charts immediately
    initCharts();

    // 5️⃣ Manejo del Formulario con Actualización en Tiempo Real
    // Funciones usadas: addEventListener('submit'), e.preventDefault() para evitar recarga,
    // y FormData() para capturar los valores de los inputs.
    const surveyForm = document.getElementById('survey-form');
    if (surveyForm) {
        surveyForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Método preventDefault() evita el envío estándar del formulario
            const submitBtn = surveyForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Procesando...'; // Feedback visual
            submitBtn.disabled = true;

            // --- Capture Data ---
            const formData = new FormData(surveyForm);
            const getVal = (name) => parseInt(formData.get(name) || 0);

            // A. Calculate Category Averages from current form
            const currentRatings = {
                recepcion: [getVal('checkin_speed'), getVal('reception_kindness'), getVal('info_clarity'), getVal('reception_org')],
                habitaciones: [getVal('room_cleanliness'), getVal('room_expectations'), getVal('room_services'), getVal('room_comfort')],
                restaurante: [getVal('food_quality'), getVal('food_service_time'), getVal('restaurant_kindness'), getVal('restaurant_cleanliness')],
                limpieza: [getVal('general_cleanliness'), getVal('cleaning_punctuality')],
                personal: [getVal('staff_kindness'), getVal('staff_helpfulness'), getVal('staff_professionalism'), getVal('staff_care')]
            };

            const avg = (arr) => {
                const valid = arr.filter(n => n > 0);
                return valid.length ? valid.reduce((a, b) => a + b, 0) / valid.length : 0;
            };

            const averages = {
                recepcion: avg(currentRatings.recepcion),
                habitaciones: avg(currentRatings.habitaciones),
                restaurante: avg(currentRatings.restaurante),
                limpieza: avg(currentRatings.limpieza),
                personal: avg(currentRatings.personal)
            };

            const overallRating = getVal('overall_satisfaction');

            // --- Update Stats ---
            // 1. Update Overall Doughnut
            if (overallRating > 0) {
                surveyStats.overall[overallRating]++;
                charts.overall.data.datasets[0].data = [
                    surveyStats.overall[5],
                    surveyStats.overall[4],
                    surveyStats.overall[3],
                    surveyStats.overall[2],
                    surveyStats.overall[1]
                ];
                charts.overall.update();
            }

            // 2. Update Area Radar
            Object.keys(averages).forEach(area => {
                if (averages[area] > 0) {
                    surveyStats.areas[area].sum += averages[area];
                    surveyStats.areas[area].count++;
                }
            });

            const getNewAvg = (area) => (surveyStats.areas[area].sum / surveyStats.areas[area].count).toFixed(1);
            charts.area.data.datasets[0].data = [
                getNewAvg('recepcion'),
                getNewAvg('habitaciones'),
                getNewAvg('restaurante'),
                getNewAvg('limpieza'),
                getNewAvg('personal')
            ];
            charts.area.update();

            // 3. Update Bar (Cleanliness/Comfort) - Update "Actual" bar
            // We assume the last bar is "Actual" and we just update it with a running average of this session or just the latest
            // For visual effect, let's just push the new value to the last slot (weighted)
            if (averages.limpieza > 0) {
                const lastIdx = charts.cleanliness.data.datasets[0].data.length - 1;
                // Simple weighting for demo: average previous "Actual" with current
                let prevClean = charts.cleanliness.data.datasets[0].data[lastIdx];
                let prevComf = charts.cleanliness.data.datasets[1].data[lastIdx];
                
                charts.cleanliness.data.datasets[0].data[lastIdx] = ((prevClean * 10 + averages.limpieza)/11).toFixed(1);
                // Note: using room_comfort for comfort
                let roomComfort = getVal('room_comfort') || prevComf; 
                charts.cleanliness.data.datasets[1].data[lastIdx] = ((prevComf * 10 + roomComfort)/11).toFixed(1);
                charts.cleanliness.update();
            }

            // 4. Update Line (Service)
            if (averages.recepcion > 0) { // Checkin Speed inside recepcion
                 const lastIdx = charts.service.data.datasets[0].data.length - 1;
                 let checkinSpeed = getVal('checkin_speed') || 4.5;
                 let staffKindness = getVal('staff_kindness') || 4.8;

                 let prevSpeed = charts.service.data.datasets[0].data[lastIdx];
                 let prevKind = charts.service.data.datasets[1].data[lastIdx];

                 charts.service.data.datasets[0].data[lastIdx] = ((prevSpeed * 10 + checkinSpeed)/11).toFixed(1);
                 charts.service.data.datasets[1].data[lastIdx] = ((prevKind * 10 + staffKindness)/11).toFixed(1);
                 charts.service.update();
            }

            setTimeout(() => {
                alert('¡Datos registrados con éxito! Gracias por su opinión.');
                surveyForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1000);
        });
    }

    // 6️⃣ Carga Dinámica de Reseñas
    // Función usada: innerHTML para insertar contenido HTML seguro dinámicamente.
    const reviewsContainer = document.getElementById('reviews-container');
    const sampleReviews = [
        { name: "María Rodríguez", rating: 5, text: "Una experiencia maravillosa. La vista era espectacular." },
        { name: "Carlos Mendoza", rating: 4, text: "Excelente ubicación y comida. Personal muy amable." },
        { name: "Ana Smith", rating: 5, text: "El mejor hotel de Caracas sin duda." }
    ];

    if (reviewsContainer) {
        sampleReviews.forEach(review => {
            const card = document.createElement('div');
            card.className = 'review-card';
            const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
            card.innerHTML = `
                <div class="review-header">
                    <span class="reviewer-name">${review.name}</span>
                    <span class="review-stars">${stars}</span>
                </div>
                <p class="review-text">"${review.text}"</p>
            `;
            reviewsContainer.appendChild(card);
        });
    }
});
