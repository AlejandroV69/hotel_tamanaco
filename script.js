document.addEventListener('DOMContentLoaded', () => {
    // Tab Switching Logic
    const navBtns = document.querySelectorAll('.nav-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            navBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked button
            btn.classList.add('active');

            // Show corresponding tab content
            const tabId = btn.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Generate Star Ratings dynamically
    document.querySelectorAll('.stars-input').forEach(container => {
        const name = container.dataset.name;
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

    // Form Handling
    const surveyForm = document.getElementById('survey-form');
    if (surveyForm) {
        surveyForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Simulate form submission
            const submitBtn = surveyForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;

            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;

            setTimeout(() => {
                alert('¡Gracias por sus comentarios! Su opinión es muy valiosa para el Hotel Tamanaco.');
                surveyForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    // Dynamic Reviews Loading
    const reviewsContainer = document.getElementById('reviews-container');
    const sampleReviews = [
        {
            name: "María Rodríguez",
            rating: 5,
            text: "Una experiencia maravillosa. La vista desde la habitación era espectacular y el servicio impecable."
        },
        {
            name: "Carlos Mendoza",
            rating: 4,
            text: "Excelente ubicación y comida. El personal de recepción fue muy amable."
        },
        {
            name: "Ana Smith",
            rating: 5,
            text: "El mejor hotel de Caracas sin duda. Las instalaciones están muy bien cuidadas."
        }
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

    // Dashboard Charts Initialization
    const initCharts = () => {
        // Shared Chart Options
        const commonOptions = {
            responsive: true,
            plugins: {
                legend: {
                    labels: { color: '#8892b0' }
                }
            },
            scales: {
                y: {
                    ticks: { color: '#E6F1FF' },
                    grid: { color: 'rgba(255, 255, 255, 0.1)' }
                },
                x: {
                    ticks: { color: '#E6F1FF' },
                    grid: { color: 'rgba(255, 255, 255, 0.1)' }
                }
            }
        };

        // 1. Overall Satisfaction (Doughnut)
        const ctxOverall = document.getElementById('overallChart').getContext('2d');
        new Chart(ctxOverall, {
            type: 'doughnut',
            data: {
                labels: ['Excelente', 'Bueno', 'Regular'],
                datasets: [{
                    data: [65, 25, 10],
                    backgroundColor: ['#D4AF37', '#8892b0', '#112240'],
                    borderColor: '#020c1b',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { labels: { color: '#E6F1FF' } }
                }
            }
        });

        // 2. Performance by Area (Radar)
        const ctxArea = document.getElementById('areaChart').getContext('2d');
        new Chart(ctxArea, {
            type: 'radar',
            data: {
                labels: ['Recepción', 'Habitaciones', 'Restaurante', 'Limpieza', 'Personal'],
                datasets: [{
                    label: 'Puntaje Promedio (0-5)',
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
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        pointLabels: { color: '#E6F1FF' },
                        ticks: { backdropColor: 'transparent' }
                    }
                }
            }
        });

        // 3. Cleanliness vs Comfort (Bar)
        const ctxClean = document.getElementById('cleanlinessChart').getContext('2d');
        new Chart(ctxClean, {
            type: 'bar',
            data: {
                labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
                datasets: [
                    {
                        label: 'Limpieza',
                        data: [4.5, 4.6, 4.8, 4.7, 4.9, 4.8],
                        backgroundColor: '#D4AF37'
                    },
                    {
                        label: 'Confort',
                        data: [4.2, 4.3, 4.5, 4.6, 4.7, 4.7],
                        backgroundColor: '#8892b0'
                    }
                ]
            },
            options: commonOptions
        });

        // 4. Service Speed vs Kindness (Line)
        const ctxService = document.getElementById('serviceChart').getContext('2d');
        new Chart(ctxService, {
            type: 'line',
            data: {
                labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
                datasets: [
                    {
                        label: 'Rapidez Check-in',
                        data: [4.0, 4.2, 4.5, 4.8],
                        borderColor: '#D4AF37',
                        tension: 0.4
                    },
                    {
                        label: 'Amabilidad Personal',
                        data: [4.8, 4.9, 4.8, 4.9],
                        borderColor: '#8892b0',
                        tension: 0.4
                    }
                ]
            },
            options: commonOptions
        });
    };

    // Initialize charts when DOM is ready
    // Note: In a real app, you might want to init this only when the tab is clicked to save resources
    // but for this demo, we'll load them immediately to ensure they are ready.
    initCharts();
});
