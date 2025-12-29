# Hotel Tamanaco - Landing Page & Encuesta de Satisfacción

Bienvenido al repositorio del proyecto web para el Hotel Tamanaco. Esta aplicación web sirve como landing page informativa y una herramienta robusta para recopilar y visualizar la satisfacción de los huéspedes.

## 📋 Características Principales

### 1. **Página de Inicio**

- Diseño elegante y moderno con un hero banner atractivo (fondo personalizado del hotel).
- Secciones informativas sobre ubicación, gastronomía y servicios de spa.
- Navegación fluida entre pestañas sin recargar la página.

### 2. **Encuesta de Satisfacción**

- Formulario completo y validado para recopilar feedback detallado.
- Áreas de evaluación:
  - Datos Generales y Recepción (Check-in).
  - Habitaciones (Limpieza, Confort, Servicios).
  - Restaurante y Alimentación.
  - Limpieza General y Mantenimiento.
  - Atención del Personal.
- Sistema de calificación con estrellas interactivo.

### 3. **Dashboard de Resultados (Privado)**

- **Acceso Protegido:** Sección restringida mediante contraseña para proteger la información del hotel.
  - 🔑 **Contraseña de acceso:** `29863496`
- **Visualización de Datos:** Gráficos interactivos generados con **Chart.js**:
  - **Satisfacción General:** Gráfico de donas.
  - **Desempeño por Área:** Gráfico de radar comparativo.
  - **Limpieza vs Confort:** Gráfico de historial de barras.
  - **Evolución del Servicio:** Gráfico de líneas para métricas de rapidez y amabilidad.
- **Actualización en Tiempo Real:** Los gráficos se actualizan automáticamente con cada nueva encuesta enviada (simulación en memoria).

### 4. **Opiniones**

- Sección dedicada para mostrar testimonios destacados de huéspedes.
- Carga dinámica de reseñas mediante JavaScript.

## 🛠️ Tecnologías Utilizadas

- **HTML5:** Estructura semántica del sitio.
- **CSS3:** Diseño responsivo (Flexbox/Grid), variables CSS para tematización (colores dorados y oscuros), y animaciones suaves.
- **JavaScript (ES6+):** Lógica de navegación (SPA simple), manejo de formularios, protección de acceso y manipulación del DOM.
- **Chart.js:** Librería externa para la renderización de gráficos de datos.
- **Google Fonts:** Tipografía 'Playfair Display' y 'Outfit' para un look premium.

## 🚀 Cómo Ejecutar el Proyecto

1.  Clona este repositorio o descarga los archivos.
2.  Asegúrate de tener la estructura de archivos correcta:
    - `index.html`
    - `styles.css`
    - `script.js`
    - `hero-bg.png`
3.  Simplemente abre el archivo `index.html` en tu navegador web favorito (Chrome, Firefox, Edge).
4.  No requiere instalación de servidores ni bases de datos para su funcionamiento básico (los datos son volátiles y se reinician al recargar la página).

## 🔒 Privacidad de Datos

El sistema está diseñado para que, tras enviar una encuesta, el formulario se limpie y **no** redirija automáticamente a los resultados, preservando la privacidad de los datos frente a los huéspedes. El acceso a los resultados es exclusivo para el personal autorizado con la contraseña.

---

Desarrollado para Hotel Tamanaco.
