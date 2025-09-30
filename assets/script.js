document.addEventListener('DOMContentLoaded', function() {

    const App = {
        state: {
            currentSectionIndex: 0,
            localStorageKey: 'nuriaElizoForm_v24',
            emojiMap: ['😩', '😕', '🙂', '😄'],
            labelsMap: ['Pocas veces', 'A veces', 'Casi siempre', 'Siempre'],
            formData: {}
        },
        sectionsConfig: [
            { id: 'bienvenida', title: 'Fitting Mental' },
            { id: 'sobre_ti', title: 'Sobre ti' },
            { id: 'gestion_fallo', title: 'Gestión del Fallo', intro: 'El golf pone a prueba nuestra paciencia. Un mal golpe es inevitable, pero tu reacción no lo es. ¿Con qué eficacia gestionas la frustración para seguir adelante?', questions: ["Acepto mis errores como parte natural del juego.", "Mantengo una actitud positiva tras un mal golpe.", "Mi nivel de confianza se mantiene estable después de un fallo."] },
            { id: 'confianza', title: 'Confianza', intro: 'La confianza es el motor de un buen swing. No se trata de ser perfecto, sino de creer en tus capacidades, especialmente en los momentos clave.', questions: ["Confío en mi capacidad para sacar adelante vueltas complicadas.", "Me siento seguro/a al afrontar los golpes más decisivos.", "Visualizo mis golpes con éxito antes de darlos."] },
            { id: 'concentracion', title: 'Concentración', intro: 'La mente tiende a viajar al pasado (ese mal golpe) o al futuro (el resultado). La clave es estar aquí y ahora. ¿Con qué facilidad logras anclarte en el presente?', questions: ["Me centro únicamente en el golpe que tengo delante.", "Consigo aislarme de distracciones externas (ruido, compañeros).", "Mantengo mi nivel de foco durante toda la vuelta."] },
            { id: 'rutinas', title: 'Tus Rutinas', intro: 'Las rutinas son el ancla que da estabilidad en un juego de constantes cambios. Son tu ritual personal para preparar cuerpo y mente.', questions: ["Sigo una rutina pre-golpe consistente antes de cada golpe.", "Utilizo la respiración para calmarme en momentos de tensión.", "Tengo una rutina post-golpe para analizar y soltar el golpe anterior."] },
            { id: 'emociones', title: 'Manejo de Emociones', intro: 'El golf es una montaña rusa emocional. La habilidad para gestionar los nervios o la frustración es tan importante como un buen putt. ¿Eres el piloto de tus emociones?', questions: ["Tomo decisiones lógicas en el campo (sin dejarme llevar por enfados, euforia, etc.).", "Cuando me frustro, uso esa energía para concentrarme más en el siguiente golpe.", "Utilizo técnicas específicas (como la respiración) para mantener la calma."] },
            { id: 'disfrute', title: 'Fluidez y Disfrute', intro: 'Al final del día, jugamos al golf porque nos apasiona. Esta sección trata sobre tu conexión con el juego y tu capacidad para disfrutar del proceso.', questions: ["Siento que juego de forma natural y automática, sin pensar demasiado.", "Encuentro satisfacción en el proceso de jugar, más allá de la puntuación final.", "Me siento en equilibrio entre el reto que presenta el campo y mis habilidades."] },
            { id: 'estrategia', title: 'Estrategia y Preparación', intro: 'Un buen golfista no solo golpea la bola, sino que piensa el campo. Esta sección evalúa cómo planificas tu juego y te preparas para rendir al máximo.', questions: ["Tengo un plan de juego claro para la vuelta y me mantengo fiel a él.", "En mis entrenamientos, simulo situaciones de presión para prepararme.", "Dedico tiempo específico a entrenar mi mente (visualización, etc.)."] },
            { id: 'final', title: 'Tu Análisis Mental', isFinal: true }
        ],
        feedbackTexts: {
            gestion_fallo: {
                high: "¡Enhorabuena! Aceptar los errores es tu superpoder. Esta resiliencia te permite mantener la estabilidad y recuperarte rápidamente, una cualidad de los grandes jugadores. Conmigo, podemos trabajar en cómo usar esa fortaleza para convertir los momentos de presión en tus mayores oportunidades.",
                medium: "Tienes una buena base para gestionar los fallos, pero es probable que a veces la frustración te reste energía. Juntos, podemos crear una 'rutina de reseteo' mental de 10 segundos que te devuelva al presente y te prepare para el siguiente golpe.",
                low: "Sentir que los errores te afectan es el área donde tienes un potencial de mejora inmenso. Una de las primeras cosas que trabajo con mis golfistas es transformar esa frustración en foco. Imagina lo que cambiaría en tu juego si cada error, en lugar de restarte, te diera más energía."
            },
            confianza: {
                high: "Tu confianza es una de tus grandes armas. Crees en tus capacidades y eso te permite jugar con libertad. Mi trabajo contigo sería ayudarte a blindar esa confianza, para que sea inquebrantable incluso en los días en que el swing no acompaña.",
                medium: "Muestras una buena confianza, pero es posible que fluctúe bajo presión. Una técnica que enseño es cómo construir una 'confianza de base' que no dependa de los resultados del día, sino de una preparación mental sólida.",
                low: "La confianza no es algo que se tiene o no se tiene, es algo que se construye. Con unas pocas sesiones, podemos identificar y cambiar los patrones de pensamiento que están limitando tu juego y empezar a construir la confianza que tu golf merece."
            },
            concentracion: {
                high: "Tu capacidad de concentración es de nivel profesional. Sabes cómo anclarte en el presente. El siguiente nivel que podríamos explorar juntos es cómo entrar en 'la zona' de forma más deliberada y mantener ese estado de fluidez durante más tiempo.",
                medium: "Logras buenos momentos de foco, pero es fácil que la mente se disperse. Trabajo con mis jugadores en técnicas de 'atención selectiva' para enseñar al cerebro a ignorar las distracciones y a centrarse únicamente en la información relevante.",
                low: "Si sientes que tu mente está en todas partes menos en el golpe que tienes delante, no estás solo/a. Una de las áreas donde mis clientes ven resultados más rápidos es en la mejora del foco. Con ejercicios simples, podemos entrenar tu mente para que sea tu mejor aliada."
            },
            rutinas: {
                high: "Excelente. Tus rutinas son sólidas y te dan una base increíble. Lo que podemos hacer juntos es optimizarlas, añadiendo pequeños anclajes mentales que las hagan aún más potentes bajo presión.",
                medium: "Tienes rutinas, pero es posible que no siempre te den la seguridad que necesitas. A menudo, el problema no es la rutina en sí, sino lo que pensamos durante ella. Puedo ayudarte a diseñar una rutina mental que te dé una confianza total en cada golpe.",
                low: "La falta de rutinas es como navegar sin brújula. Es el área de mejora más sencilla y con mayor impacto. En nuestra primera sesión, podemos diseñar una rutina pre-golpe simple y efectiva que te dará un control y confianza inmediatos."
            },
            emociones: {
                high: "Tu inteligencia emocional es una ventaja competitiva enorme. Sabes mantener la calma cuando otros se derrumban. Podemos trabajar en cómo usar esa calma de forma estratégica para tomar decisiones aún más inteligentes en los momentos más tensos.",
                medium: "Gestionas bien tus emociones, pero es probable que en momentos clave, los nervios aparezcan. Puedo enseñarte técnicas de respiración utilizadas por los profesionales para regular el sistema nervioso y rendir al máximo bajo presión.",
                low: "Si sientes que las emociones controlan tu tarjeta de resultados, es el momento de actuar. Esta es mi especialidad. Ayudo a golfistas a entender sus emociones y a usar herramientas prácticas para que jueguen a su favor, no en su contra."
            },
            disfrute: {
                high: "¡Felicidades! Disfrutas del juego en su esencia, lo que te permite jugar con libertad. Juntos, podemos explorar cómo potenciar esa sensación de fluidez para que aparezca de forma más consistente.",
                medium: "Disfrutas del golf, pero es posible que tu disfrute esté demasiado ligado a la puntuación. Puedo ayudarte a cambiar el foco hacia 'objetivos de proceso', lo que no solo aumentará tu disfrute, sino que, paradójicamente, mejorará tus resultados.",
                low: "Si has perdido parte de la alegría de jugar, es una señal importante. A menudo, esto ocurre cuando la autoexigencia es demasiado alta. Una parte clave de mi trabajo es ayudar a los jugadores a reconectar con su pasión por el golf."
            },
            estrategia: {
                high: "Tu enfoque estratégico es de alto nivel. Piensas el campo como un profesional. El siguiente paso que podríamos trabajar juntos es el análisis avanzado de estadísticas (strokes gained) para afinar aún más tu toma de decisiones.",
                medium: "Tienes buenas intenciones estratégicas, pero a veces te desvías de tu plan. Puedo ayudarte a crear planes de juego sólidos y, lo más importante, a darte las herramientas mentales para mantenerte fiel a ellos.",
                low: "Si sientes que tu juego es más reactivo que planificado, has encontrado una mina de oro para bajar golpes. Puedo enseñarte un sistema simple para analizar los hoyos y tomar decisiones más inteligentes que se ajusten a tus fortalezas."
            }
        },

        init() {
            if (document.getElementById('mentalForm')) { this.initForm(); }
            else if (document.getElementById('results-container')) { this.initResults(); }
        },

        initForm() {
            this.generateSectionsHTML();
            this.cacheDom();
            this.bindFormEvents();
            this.loadProgress();
            this.updateUI();
        },

        generateSectionsHTML() {
            const form = document.getElementById('mentalForm');
            let sectionsHTML = '';
            this.sectionsConfig.forEach((section, index) => {
                if (section.isFinal) return;
                sectionsHTML += `<div class="section" data-section-index="${index}">`;
                if (index === 0) {
                    sectionsHTML += `<div class="section-content"><h2>Bienvenido/a a tu Fitting Mental</h2><p class="section-intro">Descubre en solo <strong>2 minutos</strong> una radiografía clara y honesta de tu estado mental en el campo.</p><div class="welcome-info"><div class="welcome-point"><span class="icon"><i class="fas fa-bolt"></i></span><p><strong>Rápido y Directo</strong>Responde con sinceridad para obtener un análisis preciso.</p></div><div class="welcome-point"><span class="icon"><i class="fas fa-chart-pie"></i></span><p><strong>Análisis Instantáneo</strong>Al finalizar, obtendrás un informe visual para identificar tus fortalezas y áreas de mejora.</p></div><div class="welcome-point"><span class="icon"><i class="fas fa-rocket"></i></span><p><strong>100% Gratis</strong>Una herramienta profesional a tu alcance, sin ningún coste.</p></div></div><div class="form-group"><label for="email" class="label-title">Introduce tu correo para comenzar</label><input type="email" id="email" name="email" required placeholder="nombre@email.com" autocomplete="email"><div class="error-message" id="error-email"><i class="fas fa-exclamation-triangle"></i><span></span></div></div></div>`;
                } else if (index === 1) {
                    sectionsHTML += `<div class="section-content"><h2>${section.title}</h2><p class="section-intro">Estos datos nos ayudarán a personalizar tu experiencia.</p><div class="form-group"><label for="nombre" class="label-title">Nombre y apellidos</label><input type="text" id="nombre" name="nombre" required placeholder="Tu nombre aquí" autocomplete="name"><div class="error-message" id="error-nombre"><i class="fas fa-exclamation-triangle"></i><span></span></div></div><div class="form-group"><label for="handicap" class="label-title">Hándicap actual</label><input type="number" id="handicap" name="handicap" step="0.1" required placeholder="Ej: 12.5" min="0" max="54"><div class="error-message" id="error-handicap"><i class="fas fa-exclamation-triangle"></i><span></span></div></div><div class="form-group"><label for="frecuencia" class="label-title">¿Cada cuánto juegas?</label><select id="frecuencia" name="frecuencia" required><option value="" disabled selected>Elige una opción...</option><option value="1">1 vez al mes o menos</option><option value="2">2-3 veces al mes</option><option value="3">1 vez por semana</option><option value="4">2-3 veces por semana</option><option value="5">Casi a diario</option></select><div class="error-message" id="error-frecuencia"><i class="fas fa-exclamation-triangle"></i><span></span></div></div></div>`;
                } else if (section.questions) {
                    sectionsHTML += `<div class="section-content"><h2>${section.title}</h2><p class="section-intro">${section.intro}</p>`;
                    section.questions.forEach((q, qIndex) => sectionsHTML += this.createQuestionHTML(section.id, q, qIndex));
                    sectionsHTML += `</div>`;
                }
                sectionsHTML += `</div>`;
            });
            sectionsHTML += `<div class="buttons" id="form-navigation"><button type="button" id="prevBtn" class="btn-prev"><i class="fas fa-arrow-left"></i> Atrás</button><button type="button" id="nextBtn" class="btn-next">Siguiente <i class="fas fa-arrow-right"></i></button></div>`;
            form.innerHTML = sectionsHTML;
        },

        cacheDom() {
            this.dom = {
                form: document.getElementById('mentalForm'), toast: document.getElementById('validation-toast'), toastMessage: document.getElementById('toast-message'), toastCloseBtn: document.querySelector('.toast-close-btn'), progressFill: document.getElementById('progressFill'), progressText: document.getElementById('progressText'), currentSectionTitleEl: document.getElementById('currentSectionTitle'), formNavigation: document.getElementById('form-navigation'), allSections: Array.from(document.querySelectorAll('.section')), prevBtn: document.getElementById('prevBtn'), nextBtn: document.getElementById('nextBtn')
            };
        },

        createQuestionHTML(sectionId, question, qIndex) {
            const questionName = `${sectionId}_q${qIndex}`;
            return `<div class="form-group"><fieldset><legend class="label-title">${question}</legend><div class="scale" role="radiogroup">${this.state.emojiMap.map((emoji, i) => `<label class="scale-option"><input type="radio" name="${questionName}" value="${i + 1}" required><span class="option-emoji" role="img" aria-label="${this.state.labelsMap[i]}">${emoji}</span><span class="emoji-label">${this.state.labelsMap[i]}</span></label>`).join('')}</div><div class="error-message" id="error-${questionName}"><i class="fas fa-exclamation-triangle"></i><span></span></div></fieldset></div>`;
        },

        bindFormEvents() {
            this.dom.nextBtn.addEventListener('click', () => this.handleNext());
            this.dom.prevBtn.addEventListener('click', () => this.handlePrev());
            this.dom.toastCloseBtn.addEventListener('click', () => this.hideToast());
            this.dom.form.addEventListener('change', (e) => { if (e.target.type === 'radio' && e.target.name) { this.dom.form.querySelectorAll(`input[name="${e.target.name}"]`).forEach(input => input.closest('.scale-option').classList.remove('scale-option-checked')); e.target.closest('.scale-option').classList.add('scale-option-checked'); } });
        },

        showToast(message) { this.dom.toastMessage.textContent = message; this.dom.toast.classList.add('show'); },
        hideToast() { this.dom.toast.classList.remove('show'); },

        handleNext() {
            const currentSection = this.dom.allSections[this.state.currentSectionIndex];
            if (!this.validateSection(currentSection)) {
                this.showToast('Por favor, completa todos los campos obligatorios.');
                const firstErrorField = currentSection.querySelector('.invalid, input[type="radio"]:invalid');
                if (firstErrorField) firstErrorField.closest('.form-group, .form-group > div').scrollIntoView({ behavior: 'smooth', block: 'center' });
                return;
            }
            this.hideToast();
            this.saveProgress();
            const lastQuestionSectionIndex = this.sectionsConfig.findIndex(s => s.isFinal) - 1;
            if (this.state.currentSectionIndex === lastQuestionSectionIndex) { this.submitForm(); }
            else { this.goToSection(this.state.currentSectionIndex + 1); }
        },

        handlePrev() { this.hideToast(); if (this.state.currentSectionIndex > 0) this.goToSection(this.state.currentSectionIndex - 1); },
        goToSection(index) { this.state.currentSectionIndex = index; this.updateUI(); window.scrollTo({ top: 0, behavior: 'smooth' }); },

        updateUI() {
            const { allSections, progressFill, progressText, currentSectionTitleEl, prevBtn, nextBtn, formNavigation } = this.dom;
            const config = this.sectionsConfig[this.state.currentSectionIndex];
            allSections.forEach((section, i) => section.classList.toggle('active', i === this.state.currentSectionIndex));
            const finalSectionIndex = this.sectionsConfig.findIndex(s => s.isFinal);
            let progressPercentage = 0;
            if (this.state.currentSectionIndex > 1 && this.state.currentSectionIndex < finalSectionIndex) {
                const totalQuestionSections = finalSectionIndex - 2;
                progressPercentage = Math.round(((this.state.currentSectionIndex - 1) / totalQuestionSections) * 100);
            } else if (this.state.currentSectionIndex >= finalSectionIndex) {
                progressPercentage = 100;
            }
            progressFill.style.width = `${progressPercentage}%`;
            progressText.textContent = `${progressPercentage}% completado`;
            currentSectionTitleEl.textContent = config.title;
            prevBtn.style.display = this.state.currentSectionIndex === 0 ? 'none' : 'flex';
            formNavigation.style.display = config.isFinal ? 'none' : 'flex';
            const lastQuestionSectionIndex = finalSectionIndex - 1;
            if (this.state.currentSectionIndex === lastQuestionSectionIndex) {
                nextBtn.innerHTML = 'Ver mis Resultados <i class="fas fa-paper-plane"></i>';
                nextBtn.className = 'btn-submit btn-next';
            } else {
                nextBtn.innerHTML = 'Siguiente <i class="fas fa-arrow-right"></i>';
                nextBtn.className = 'btn-next';
            }
        },

        validateSection(section) {
            let isValid = true;
            section.querySelectorAll('[required]').forEach(field => {
                let isFieldValid = true;
                const fieldName = field.name || field.id;
                if (field.type === 'radio') { if (!section.querySelector(`input[name="${fieldName}"]:checked`)) isFieldValid = false; }
                else if (field.type === 'email') { if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) isFieldValid = false; }
                else { if (field.value.trim() === '') isFieldValid = false; }
                const errorContainer = section.querySelector(`#error-${fieldName}`);
                if (!isFieldValid) {
                    isValid = false;
                    const errorSpan = errorContainer ? errorContainer.querySelector('span') : null;
                    if (errorSpan) { errorSpan.textContent = (field.type === 'email' && field.value.trim()) ? 'Correo inválido.' : 'Campo obligatorio.'; errorContainer.style.display = 'flex'; }
                    if (field.type !== 'radio') field.classList.add('invalid');
                } else {
                    if (errorContainer) errorContainer.style.display = 'none';
                    if (field.type !== 'radio') field.classList.remove('invalid');
                }
            });
            return isValid;
        },

        saveProgress() {
            const formData = new FormData(this.dom.form);
            const data = Object.fromEntries(formData.entries());
            sessionStorage.setItem(this.state.localStorageKey, JSON.stringify(data));
        },

        loadProgress() {
            const savedData = sessionStorage.getItem(this.state.localStorageKey);
            if (!savedData) return;
            try {
                const data = JSON.parse(savedData);
                for (const [name, value] of Object.entries(data)) {
                    const elements = this.dom.form.elements[name];
                    if (elements) {
                        if (elements.length && elements[0].type === 'radio') { const radio = this.dom.form.querySelector(`input[name="${name}"][value="${value}"]`); if (radio) { radio.checked = true; radio.closest('.scale-option').classList.add('scale-option-checked'); } }
                        else { elements.value = value; }
                    }
                }
            } catch (e) { console.error('Error al cargar progreso:', e); }
        },

        submitForm() {
            this.dom.nextBtn.disabled = true;
            this.dom.nextBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Finalizando...';
            this.saveProgress();
            setTimeout(() => { window.location.href = 'results.html'; }, 1000);
        },

        // MÉTODOS PARA LA PÁGINA DE RESULTADOS (results.html)
        initResults() {
            const dataJSON = sessionStorage.getItem(this.state.localStorageKey);
            const resultsContainer = document.getElementById('results-container');
            if (!dataJSON) {
                resultsContainer.innerHTML = `<div class="section-content"><p class="section-intro">No hemos encontrado tus resultados. Por favor, completa primero el <a href="index.html">Fitting Mental</a>.</p></div>`;
                return;
            }
            this.state.formData = JSON.parse(dataJSON);
            this.displayResultsPage();
        },

        displayResultsPage() {
            const scores = this.calculateScores();
            const userName = this.state.formData.nombre ? this.state.formData.nombre.split(' ')[0] : 'Golfista';
            const resultsContainer = document.getElementById('results-container');
            resultsContainer.innerHTML = `
          <div class="section-content results-page">
            <h2>¡Aquí tienes tu Análisis, ${userName}!</h2>
            <p class="section-intro">Este es un mapa de tu estado mental actual. Úsalo para identificar tus fortalezas y áreas con mayor potencial de crecimiento.</p>
            <div class="chart-container"><canvas id="resultsChart"></canvas></div>
            <div class="summary-highlight">${this.generateHighlightCards(scores)}</div>
            <button type="button" class="show-all-results-btn">Ver análisis completo <i class="fas fa-chevron-down"></i></button>
            <div class="hidden-cards">
              <div class="analysis-cards-container">${this.generateAnalysisCards(scores)}</div>
            </div>
            <div class="cta-section">
                <img src="https://i.ibb.co/RVHxztb/8.png" alt="Nuria Elizo" class="cta-image">
                <div class="cta-content">
                    <h3>¿Quieres llevar tu juego al siguiente nivel?</h3>
                    <p>Soy Nuria Elizo, psicóloga deportiva. He analizado tus resultados y veo un gran potencial. Si quieres, podemos hablar sobre cómo crear un plan específico para ti.</p>
                    <a href="https://wa.me/34606828521?text=Hola%20Nuria,%20he%20hecho%20el%20Fitting%20Mental%20y%20me%20gustaría%20saber%20más." target="_blank" class="whatsapp-btn">
                        <i class="fab fa-whatsapp"></i> WhatsApp
                    </a>
                </div>
            </div>
          </div>`;
            this.renderChart(scores);
            this.bindResultsEvents();
        },

        bindResultsEvents() {
            const btn = document.querySelector('.show-all-results-btn');
            const hiddenContainer = document.querySelector('.hidden-cards');
            if (btn && hiddenContainer) {
                btn.addEventListener('click', () => {
                    const isShown = hiddenContainer.classList.toggle('show');
                    btn.innerHTML = isShown ? 'Ocultar análisis <i class="fas fa-chevron-up"></i>' : 'Ver análisis completo <i class="fas fa-chevron-down"></i>';
                });
            }
        },

        calculateScores() {
            const scores = {}; let totalScore = 0; let sectionCount = 0;
            this.sectionsConfig.forEach(section => {
                if (section.questions) {
                    let sectionScore = 0;
                    section.questions.forEach((q, qIndex) => {
                        const questionId = `${section.id}_q${qIndex}`;
                        sectionScore += parseInt(this.state.formData[questionId] || 0, 10);
                    });
                    const maxScore = section.questions.length * 4;
                    const minScore = section.questions.length;
                    const percentage = Math.round(((sectionScore - minScore) / (maxScore - minScore)) * 100);
                    scores[section.id] = { title: section.title, score: percentage, id: section.id };
                    totalScore += percentage;
                    sectionCount++;
                }
            });
            scores.global = Math.round(totalScore / sectionCount);
            return scores;
        },

        generateHighlightCards(scores) {
            const scoresArray = Object.values(scores).filter(s => s.title);
            const sortedScores = [...scoresArray].sort((a, b) => a.score - b.score);
            const opportunity = sortedScores[0];
            const strength = sortedScores[sortedScores.length - 1];
            const strengthFeedback = this.feedbackTexts[strength.id]['high'];
            const opportunityFeedback = this.feedbackTexts[opportunity.id]['low'];
            return `<div class="highlight-card strength"><h3>🌟 Tu Mayor Fortaleza</h3><p>${strength.title}</p><p class="highlight-feedback">${strengthFeedback}</p></div><div class="highlight-card opportunity"><h3>🚀 Tu Mayor Oportunidad</h3><p>${opportunity.title}</p><p class="highlight-feedback">${opportunityFeedback}</p></div>`;
        },

        generateAnalysisCards(scores) {
            let cardsHTML = '';
            const scoresArray = Object.values(scores).filter(s => s.title);
            scoresArray.forEach(scoreData => { cardsHTML += this.createCardHTML(scoreData); });
            return cardsHTML;
        },

        createCardHTML(scoreData) {
            const { title, score, id } = scoreData;
            let level = 'low';
            if (score >= 75) level = 'high';
            else if (score >= 50) level = 'medium';
            const feedback = this.feedbackTexts[id][level];
            return `<div class="analysis-card"><div class="card-header"><h3>${title}</h3><div class="card-score"><div class="score-value">${score}%</div><span class="score-label ${level}">${level}</span></div></div><p class="card-feedback">${feedback}</p></div>`;
        },

        renderChart(scores) {
            const ctx = document.getElementById('resultsChart').getContext('2d');
            const scoresArray = Object.values(scores).filter(s => s.title);
            const labels = scoresArray.map(s => s.title);
            const data = scoresArray.map(s => s.score);

            // Colores según valor (verde > 75%, naranja 50-75%, rojo < 50%)
            const getColorByValue = (value) => {
                if (value >= 75) return '#27ae60'; // Verde
                if (value >= 50) return '#e67e22'; // Naranja
                return '#c0392b'; // Rojo
            };

            const backgroundColors = data.map(value => getColorByValue(value));

            // Plugin para mostrar porcentajes dentro de las secciones
            const innerLabelsPlugin = {
                id: 'innerLabels',
                afterDraw: (chart) => {
                    const { ctx } = chart;
                    const dataPoints = chart.getDatasetMeta(0).data;

                    ctx.save();
                    ctx.font = 'bold 12px Poppins';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillStyle = '#ffffff';

                    dataPoints.forEach((datapoint, index) => {
                        const { x, y } = datapoint.getCenterPoint();
                        const { startAngle, endAngle } = datapoint;
                        const midAngle = startAngle + (endAngle - startAngle) / 2;
                        const innerRadius = datapoint.innerRadius;
                        const outerRadius = datapoint.outerRadius;
                        const labelRadius = innerRadius + (outerRadius - innerRadius) * 0.5;

                        // Solo mostrar si el sector es lo suficientemente grande
                        const sectorAngle = (endAngle - startAngle) * 180 / Math.PI;
                        if (sectorAngle < 12) return; // Skip si muy pequeño

                        const labelX = x + labelRadius * Math.cos(midAngle);
                        const labelY = y + labelRadius * Math.sin(midAngle);

                        ctx.fillText(`${data[index]}%`, labelX, labelY);
                    });

                    ctx.restore();
                }
            };

            // Plugin avanzado para líneas externas con anticolisión mejorado
            const externalLabelsPlugin = {
                id: 'externalLabels',
                afterDraw: (chart) => {
                    const { ctx, chartArea: { width, height } } = chart;
                    const dataPoints = chart.getDatasetMeta(0).data;
                    const canvas = chart.canvas;
                    const isMobile = window.innerWidth < 600;

                    // Centro real del gráfico
                    const center = {
                        x: width / 2,
                        y: height / 2
                    };

                    // Calcular posiciones iniciales para las etiquetas - AUMENTADO 10%
                    const labelData = dataPoints.map((arc, index) => {
                        const { startAngle, endAngle } = arc;
                        const midAngle = (startAngle + endAngle) / 2;
                        const outerRadius = arc.outerRadius;

                        // Punto de inicio en el borde del donut
                        const startX = center.x + Math.cos(midAngle) * outerRadius;
                        const startY = center.y + Math.sin(midAngle) * outerRadius;

                        // Extensión de la línea principal - AUMENTADO 10%
                        const lineExtension = isMobile ? 28 : 35;
                        const midX = center.x + Math.cos(midAngle) * (outerRadius + lineExtension);
                        const midY = center.y + Math.sin(midAngle) * (outerRadius + lineExtension);

                        // Posición final para la etiqueta (más separada) - AUMENTADO 10%
                        const labelOffset = isMobile ? 65 : 90;
                        const labelDistance = outerRadius + labelOffset;
                        const labelX = center.x + Math.cos(midAngle) * labelDistance;
                        const labelY = center.y + Math.sin(midAngle) * labelDistance;

                        // Alineación del texto según cuadrante
                        const align = Math.cos(midAngle) >= 0 ? 'left' : 'right';

                        return {
                            index,
                            angle: midAngle,
                            startX, startY,
                            midX, midY,
                            labelX, labelY,
                            originalY: labelY,
                            align,
                            label: labels[index],
                            value: data[index],
                            color: backgroundColors[index]
                        };
                    });

                    // Separar en cuadrantes para mejor anticolisión
                    const rightSide = labelData.filter(d => Math.cos(d.angle) >= 0);
                    const leftSide = labelData.filter(d => Math.cos(d.angle) < 0);

                    // Función de anticolisión mejorada
                    const applyAntiCollision = (group) => {
                        if (group.length <= 1) return;

                        // Ordenar por posición Y original
                        group.sort((a, b) => a.originalY - b.originalY);

                        // AUMENTADO 10% - Espaciado mínimo
                        const minSpacing = isMobile ? 26 : 33;

                        // Aplicar separación mínima
                        for (let i = 1; i < group.length; i++) {
                            const current = group[i];
                            const previous = group[i - 1];

                            const currentDistance = Math.abs(current.labelY - previous.labelY);

                            if (currentDistance < minSpacing) {
                                const adjustment = minSpacing - currentDistance;
                                current.labelY = previous.labelY + minSpacing;
                            }
                        }

                        // Segundo pase para redistribuir si hay demasiado espacio
                        const totalHeight = group[group.length - 1].labelY - group[0].labelY;
                        const availableHeight = height * 0.85; // 85% de la altura disponible - AUMENTADO 5%

                        if (totalHeight > availableHeight) {
                            const centerY = center.y;
                            const halfRange = availableHeight / 2;

                            group.forEach((item, i) => {
                                const ratio = group.length > 1 ? i / (group.length - 1) : 0.5;
                                item.labelY = centerY - halfRange + (ratio * availableHeight);
                            });
                        }
                    };

                    // Aplicar anticolisión a cada lado
                    applyAntiCollision(rightSide);
                    applyAntiCollision(leftSide);

                    // Dibujar líneas y etiquetas
                    ctx.save();
                    ctx.font = `600 ${isMobile ? '12px' : '14px'} Poppins`; // AUMENTADO 1px

                    labelData.forEach(item => {
                        const { startX, startY, midX, midY, labelX, labelY, align, label, color } = item;

                        // Línea principal desde el donut
                        ctx.strokeStyle = color;
                        ctx.lineWidth = 2.2; // AUMENTADO ligeramente
                        ctx.beginPath();
                        ctx.moveTo(startX, startY);
                        ctx.lineTo(midX, midY);
                        ctx.stroke();

                        // Línea horizontal hacia la etiqueta - AUMENTADO 10%
                        const horizontalLength = isMobile ? 20 : 25;
                        const horizontalStartX = midX;
                        const horizontalEndX = align === 'left' ?
                            (midX + horizontalLength) :
                            (midX - horizontalLength);

                        ctx.beginPath();
                        ctx.moveTo(horizontalStartX, labelY);
                        ctx.lineTo(horizontalEndX, labelY);
                        ctx.stroke();

                        // Punto en el extremo de la línea - AUMENTADO
                        ctx.fillStyle = color;
                        ctx.beginPath();
                        ctx.arc(horizontalEndX, labelY, 3.5, 0, Math.PI * 2);
                        ctx.fill();

                        // Texto de la etiqueta - AUMENTADO separación
                        ctx.fillStyle = '#2c2c2c';
                        ctx.textAlign = align;
                        ctx.textBaseline = 'middle';
                        const textX = align === 'left' ?
                            (horizontalEndX + 10) :
                            (horizontalEndX - 10);

                        ctx.fillText(label, textX, labelY);
                    });

                    ctx.restore();
                }
            };

            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels,
                    datasets: [{
                        data,
                        backgroundColor: backgroundColors,
                        borderColor: '#ffffff',
                        borderWidth: 3,
                        hoverOffset: 6
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false, // Permitir control total del tamaño
                    cutout: '58%', // Donut un poco más grueso para mejor proporción
                    layout: {
                        padding: {
                            top: 75, // AUMENTADO 10%
                            bottom: 75,
                            left: 125, // AUMENTADO 10%
                            right: 125
                        }
                    },
                    plugins: {
                        legend: { display: false },
                        tooltip: { enabled: false }
                    },
                    animation: {
                        duration: 1000,
                        easing: 'easeOutCubic'
                    }
                },
                plugins: [{
                    id: 'centerText',
                    beforeDraw: (chart) => {
                        const { width, height, ctx } = chart;
                        ctx.save();

                        // Texto principal (porcentaje global) - AUMENTADO 10%
                        ctx.font = `700 ${Math.max(28, height / 11)}px Poppins`;
                        ctx.textBaseline = "middle";
                        ctx.textAlign = "center";
                        const text = `${scores.global}%`;
                        const textX = width / 2;
                        const textY = height / 2 - 8;
                        ctx.fillStyle = '#2c2c2c';
                        ctx.fillText(text, textX, textY);

                        // Texto secundario - AUMENTADO 10%
                        ctx.font = `600 ${Math.max(14, height / 25)}px Poppins`;
                        const subtext = "Score General";
                        ctx.fillStyle = '#616161';
                        ctx.fillText(subtext, textX, textY + 30);

                        ctx.restore();
                    }
                }, innerLabelsPlugin, externalLabelsPlugin]
            });
        }
    };

    App.init();

    // Funcionalidad del footer colapsible
    function initLegalToggle() {
        const legalToggle = document.getElementById('legalToggle');
        const legalContent = document.getElementById('legalContent');

        if (legalToggle && legalContent) {
            let autoCloseTimer = null;

            // Mejoras de accesibilidad
            legalToggle.setAttribute('aria-controls', 'legalContent');
            legalContent.setAttribute('role', 'region');
            legalContent.setAttribute('aria-labelledby', 'legalToggle');

            // Verificar si es la primera visita para mostrar automáticamente
            const hasSeenLegal = localStorage.getItem('hasSeenLegal');

            if (!hasSeenLegal) {
                // Primera visita - mostrar automáticamente y marcar como visto
                setTimeout(() => {
                    legalContent.classList.add('expanded');
                    legalToggle.setAttribute('aria-expanded', 'true');
                    localStorage.setItem('hasSeenLegal', 'true');

                    // Auto-colapsar después de 5 segundos, pero cancelable
                    autoCloseTimer = setTimeout(() => {
                        legalContent.classList.remove('expanded');
                        legalToggle.setAttribute('aria-expanded', 'false');
                    }, 5000);
                }, 1000);
            }

            legalToggle.addEventListener('click', () => {
                // Cancelar autocierre si el usuario interactúa
                if (autoCloseTimer) {
                    clearTimeout(autoCloseTimer);
                    autoCloseTimer = null;
                }

                const isExpanded = legalToggle.getAttribute('aria-expanded') === 'true';

                if (isExpanded) {
                    legalContent.classList.remove('expanded');
                    legalToggle.setAttribute('aria-expanded', 'false');
                } else {
                    legalContent.classList.add('expanded');
                    legalToggle.setAttribute('aria-expanded', 'true');
                }
            });
        }
    }

    // Inicializar toggle legal cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLegalToggle);
    } else {
        initLegalToggle();
    }

});