/* ==========================================
   ARCHIVO: script.js
   INTERACTIVIDAD, VALIDACIÓN DE WHATSAPP Y HERO SLIDER
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

    // 0. CARGAR DATOS DINÁMICOS DEL PANEL DE ADMINISTRACIÓN (Topbar, Contacto y Footer)
    const telefonoGuardado = localStorage.getItem("webTelefono");
    const correoGuardado = localStorage.getItem("webCorreo");
    const direccionGuardada = localStorage.getItem("webDireccion");

    if (telefonoGuardado) {
        // 1. Barra Superior
        const elTel = document.getElementById("viewTelefono");
        const elTelLink = document.getElementById("viewTelLink");
        if (elTel) elTel.textContent = telefonoGuardado;
        if (elTelLink) {
            const telLimpio = telefonoGuardado.replace(/\s+/g, '');
            elTelLink.href = `tel:+51${telLimpio}`;
        }

        // 2. Sección Contacto
        const elTelContacto = document.getElementById("viewTelContacto");
        const elTelContactoLink = document.getElementById("viewTelContactoLink");
        if (elTelContacto) elTelContacto.textContent = telefonoGuardado;
        if (elTelContactoLink) {
            const telLimpio = telefonoGuardado.replace(/\s+/g, '');
            elTelContactoLink.href = `tel:+51${telLimpio}`;
        }

        // 3. Pie de Página (Footer)
        const footerTel = document.getElementById("footerTelefono");
        const footerTelLink = document.getElementById("footerTelLink");
        if (footerTel) footerTel.textContent = telefonoGuardado;
        if (footerTelLink) {
            const telLimpio = telefonoGuardado.replace(/\s+/g, '');
            footerTelLink.href = `tel:+51${telLimpio}`;
        }
    }

    if (correoGuardado) {
        // 1. Barra Superior
        const elCorreo = document.getElementById("viewCorreo");
        const elMailLink = document.getElementById("viewMailLink");
        if (elCorreo) elCorreo.textContent = correoGuardado;
        if (elMailLink) elMailLink.href = `mailto:${correoGuardado}`;

        // 2. Sección Contacto
        const elMailContacto = document.getElementById("viewMailContacto");
        const elMailContactoLink = document.getElementById("viewMailContactoLink");
        if (elMailContacto) elMailContacto.textContent = correoGuardado;
        if (elMailContactoLink) elMailContactoLink.href = `mailto:${correoGuardado}`;

        // 3. Pie de Página (Footer)
        const footerCorreo = document.getElementById("footerCorreo");
        if (footerCorreo) footerCorreo.textContent = correoGuardado;
    }

    if (direccionGuardada) {
        // 1. Barra Superior
        const elDir = document.getElementById("viewDireccion");
        if (elDir) elDir.textContent = direccionGuardada;

        // 2. Sección Contacto
        const elDirContacto = document.getElementById("viewDirContacto");
        if (elDirContacto) elDirContacto.textContent = direccionGuardada;

        // 3. Pie de Página (Footer)
        const footerDir = document.getElementById("footerDireccion");
        if (footerDir) footerDir.textContent = direccionGuardada;
    }

    // 1. MENÚ RESPONSIVE TOGGLE
    const menuToggle = document.getElementById('menuToggle');
    const navbar = document.getElementById('navbar');

    if (menuToggle && navbar) {
        menuToggle.addEventListener('click', () => {
            navbar.classList.toggle('open');
            const icon = menuToggle.querySelector('i');
            if (navbar.classList.contains('open')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    }

    // CERRAR MENÚ AL HACER CLICK EN UN ENLACE
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbar.classList.contains('open')) {
                navbar.classList.remove('open');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    });

    // 2. CAMBIO DE CLASE ACTIVA EN EL NAVEGADOR SEGÚN EL SCROLL
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // 3. FUNCIÓN DIRECTA DE REDIRECCIÓN A WHATSAPP
    window.enviarAWhatsApp = function() {
        const nombreInput = document.getElementById('nombre');
        const telefonoInput = document.getElementById('telefono');
        const especialidadInput = document.getElementById('especialidad');
        const mensajeInput = document.getElementById('mensaje');

        const nombre = nombreInput ? nombreInput.value.trim() : '';
        const telefono = telefonoInput ? telefonoInput.value.trim() : '';
        const especialidad = especialidadInput ? especialidadInput.value : '';
        const mensaje = mensajeInput ? mensajeInput.value.trim() : '';

        // Validar campos obligatorios
        if (!nombre || !telefono || !mensaje) {
            alert('Por favor, completa todos los campos obligatorios antes de enviar.');
            if (!nombre && nombreInput) nombreInput.focus();
            else if (!telefono && telefonoInput) telefonoInput.focus();
            else if (!mensaje && mensajeInput) mensajeInput.focus();
            return;
        }

        const numeroEstudio = telefonoGuardado ? telefonoGuardado.replace(/\s+/g, '') : "51906380881"; // Usa el dinámico si existe

        // Construir el mensaje ordenado
        const textoWhatsApp = `*NUEVA CONSULTA DESDE LA WEB*\n\n` +
            `*Nombre:* ${nombre}\n` +
            `*Teléfono:* ${telefono}\n` +
            `*Materia Legal:* ${especialidad}\n` +
            `*Detalle del caso:* ${mensaje}`;

        // ENLACE UNIVERSAL CORRECTO (wa.me)
        const urlWhatsApp = `https://wa.me/${numeroEstudio}?text=${encodeURIComponent(textoWhatsApp)}`;

        // ABRIR EN UNA NUEVA PESTAÑA SIN CERRAR LA WEB
        window.open(urlWhatsApp, '_blank');

        // Limpiar el formulario tras la acción
        const whatsappForm = document.getElementById('whatsappForm');
        if (whatsappForm) {
            whatsappForm.reset();
        }
    };
    
    // 4. GALERÍA / VISIÓN DESPLEGABLE
    window.toggleGaleriaVision = function() {
        const galeria = document.getElementById('galeriaDesplegable');
        const flecha = document.getElementById('flecha-icono');
        
        if (galeria && flecha) {
            galeria.classList.toggle('activo');
            
            if (galeria.classList.contains('activo')) {
                flecha.style.transform = 'rotate(180deg)';
            } else {
                flecha.style.transform = 'rotate(0deg)';
            }
        }
    };

    // 5. LÓGICA DEL HERO SLIDER (CARRUSEL DINÁMICO)
    const slidesData = [
        {
            class: "slide-1",
            badgeText: "ATENCIÓN PENAL DE EMERGENCIA 24/7 EN COMISARÍAS Y JUZGADOS",
            title: "TU CONFIANZA, <br><span class='text-gold'>NUESTRA DEFENSA</span>",
            subtitle: "Defendemos tus derechos con compromiso, estrategia y excelencia. Más de 30 años de experiencia respaldando cada caso jurídico.",
            btnText: "<i class='fa-solid fa-shield-halved'></i> ¿Detenido? Asistencia 24 Horas",
            btnLink: "https://wa.me/51906380881?text=URGENCIA:%20Necesito%20asistencia%20legal%20inmediata."
        },
        {
            class: "slide-2",
            badgeText: "CENTRO DE CONCILIACIÓN EXTRAJUDICIAL",
            title: "SOLUCIONES RÁPIDAS, <br><span class='text-gold'>ACUERDOS SEGUROS</span>",
            subtitle: "Evita juicios prolongados. Logramos soluciones eficaces en familia, deudas y contratos con total respaldo legal en Chiclayo.",
            btnText: "<i class='fa-solid fa-comments'></i> Iniciar Conciliación",
            btnLink: "https://wa.me/51906380881?text=CONSULTA:%20Deseo%20información%20sobre%20conciliación."
        },
        {
            class: "slide-3",
            badgeText: "ESTUDIO JURÍDICO & CONSULTORÍA",
            title: "RIGOR Y EXPERIENCIA <br><span class='text-gold'>EN LITIGIOS COMPLEJOS</span>",
            subtitle: "Análisis meticuloso del marco legal y penal para proteger tu patrimonio, tu libertad y tu tranquilidad familiar.",
            btnText: "<i class='fa-solid fa-phone-alt'></i> Consulta Inmediata",
            btnLink: "https://wa.me/51906380881?text=ASESORÍA:%20Necesito%20una%20consulta%20legal."
        }
    ];

    let currentSlideIndex = 0;
    const heroSection = document.getElementById('inicio');
    const heroContent = document.getElementById('heroTextContent');
    const dots = document.querySelectorAll('.slider-dots .dot');

    function actualizarSlide(index) {
        if (!heroSection || !heroContent) return;

        heroContent.classList.add('fade-out');

        setTimeout(() => {
            heroSection.className = `hero ${slidesData[index].class}`;

            const badge = document.getElementById('heroBadge');
            const title = document.getElementById('heroTitle');
            const subtitle = document.getElementById('heroSubtitle');
            const btnPrimary = document.getElementById('heroBtnPrimary');

            if (badge) badge.innerHTML = `<span class="pulse-dot"></span> ${slidesData[index].badgeText}`;
            if (title) title.innerHTML = slidesData[index].title;
            if (subtitle) subtitle.innerText = slidesData[index].subtitle;
            
            if (btnPrimary) {
                btnPrimary.innerHTML = slidesData[index].btnText;
                btnPrimary.href = slidesData[index].btnLink;
            }

            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });

            heroContent.classList.remove('fade-out');
        }, 300);
    }

    window.cambiarSlide = function(n) {
        currentSlideIndex = (currentSlideIndex + n + slidesData.length) % slidesData.length;
        actualizarSlide(currentSlideIndex);
    };

    window.currentSlide = function(n) {
        currentSlideIndex = n;
        actualizarSlide(currentSlideIndex);
    };

    if (heroSection) {
        setInterval(() => {
            window.cambiarSlide(1);
        }, 6000);
    }


    // ==========================================
    // 6. CARGAR Y RENDERIZAR CASOS DE ÉXITO DINÁMICOS
    // ==========================================
    const contenedorCasos = document.getElementById("contenedorCasosExito");
    const STORAGE_CASOS_KEY = "carbonel_casos_exito";

// PEGA AQUÍ LA FUNCIÓN PARA RENDERIZAR LOS CASOS EN LA WEB PRINCIPAL
function renderizarCasosPublicos() {
        const contenedorCasos = document.getElementById("contenedorCasosExito");
        if (!contenedorCasos) return;

        let casosExito = JSON.parse(localStorage.getItem("carbonel_casos_exito"));
        
        if (!casosExito || casosExito.length === 0) {
            casosExito = [
                {
                    materia: "Derecho Penal",
                    titulo: "Absolución en Investigación Preliminar",
                    descripcion: "Defensa técnica oportuna en comisaría y fiscalía, logrando demostrar la falta de elementos de convicción y consiguiendo el archivo inmediato.",
                    imagen: ""
                }
            ];
            localStorage.setItem("carbonel_casos_exito", JSON.stringify(casosExito));
        }

        // Buscamos si ya existe un contenedor para el botón y lo limpiamos si se recarga
        let contenedorSeccion = contenedorCasos.parentElement;
        let botonExistente = document.getElementById("btnVerMasCasos");
        if (botonExistente) botonExistente.remove();

        contenedorCasos.innerHTML = "";

        // Definimos cuántos casos mostrar al inicio (6 casos)
        const limiteInicial = 6;
        let mostrarTodos = false;

        function pintarTarjetas(soloSeis) {
            contenedorCasos.innerHTML = "";
            let casosAMostrar = soloSeis ? casosExito.slice(0, limiteInicial) : casosExito;

            casosAMostrar.forEach((caso) => {
                const card = document.createElement("div");
                card.className = "caso-card";
                card.style.background = "#0f1a36";
                card.style.border = "1px solid rgba(212, 175, 55, 0.2)";
                card.style.borderRadius = "8px";
                card.style.overflow = "hidden";
                card.style.display = "flex";
                card.style.flexDirection = "column";
                card.style.justifyContent = "space-between";

                let imagenHtml = caso.imagen ? `<img src="${caso.imagen}" style="width: 100%; height: 180px; object-fit: cover; border-bottom: 1px solid rgba(212, 175, 55, 0.2);">` : '';

                card.innerHTML = `
                    <div>
                        ${imagenHtml}
                        <div style="padding: 25px;">
                            <span style="display: inline-block; background-color: rgba(212, 175, 55, 0.15); color: #d4af37; font-size: 11px; font-weight: 700; padding: 5px 12px; border-radius: 20px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 15px;">${caso.materia}</span>
                            <h3 style="font-size: 20px; color: #ffffff; margin-bottom: 12px; font-family: 'Playfair Display', serif;">${caso.titulo}</h3>
                            <p style="color: #c5cbd3; font-size: 14px; line-height: 1.6; margin-bottom: 20px;">${caso.descripcion}</p>
                        </div>
                    </div>
                    <div style="padding: 0 25px 25px 25px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255, 255, 255, 0.08); padding-top: 15px; font-size: 12px; color: #8a99ad;">
                            <span><i class="fa-solid fa-circle-check" style="color: #d4af37; margin-right: 5px;"></i> Resultado Exitoso</span>
                            <span>Estudio Carbonel</span>
                        </div>
                    </div>
                `;
                contenedorCasos.appendChild(card);
            });
        }

        // Pintar inicialmente los primeros 6
        pintarTarjetas(true);

        // Si hay más de 6 casos, creamos el botón "Ver más casos"
        if (casosExito.length > limiteInicial) {
            const divBtn = document.createElement("div");
            divBtn.style.textAlign = "center";
            divBtn.style.marginTop = "40px";
            divBtn.id = "btnVerMasCasos";

            divBtn.innerHTML = `
                <button id="accionVerMas" style="background: transparent; color: #d4af37; border: 2px solid #d4af37; padding: 12px 30px; font-weight: bold; border-radius: 4px; cursor: pointer; font-size: 14px; transition: all 0.3s ease;">
                    <i class="fas fa-chevron-down" style="margin-right: 8px;"></i> Ver Más Casos de Éxito (${casosExito.length - limiteInicial} más)
                </button>
            `;
            contenedorSeccion.appendChild(divBtn);

            document.getElementById("accionVerMas").addEventListener("click", function() {
                mostrarTodos = !mostrarTodos;
                if (mostrarTodos) {
                    pintarTarjetas(false);
                    this.innerHTML = `<i class="fas fa-chevron-up" style="margin-right: 8px;"></i> Ver Menos Casos`;
                } else {
                    pintarTarjetas(true);
                    this.innerHTML = `<i class="fas fa-chevron-down" style="margin-right: 8px;"></i> Ver Más Casos de Éxito (${casosExito.length - limiteInicial} más)`;
                    // Opcional: hacer un pequeño scroll hacia arriba de la sección
                    contenedorCasos.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    }

    renderizarCasosPublicos();

});

    
