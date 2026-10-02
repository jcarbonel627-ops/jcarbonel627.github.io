/* ==========================================
   ARCHIVO: admin.js
   CONTROL Y ACTUALIZACIÓN DEL PANEL DE ADMINISTRACIÓN
   ========================================== */

document.addEventListener("DOMContentLoaded", function () {
    // 1. Validar si el administrador ha iniciado sesión
    if (sessionStorage.getItem("adminAuth") !== "true") {
        alert("Acceso no autorizado. Inicia sesión primero.");
        window.location.href = "login.html";
        return;
    }

    // 2. Elementos del formulario de configuración general en el panel
    const adminConfigForm = document.getElementById("adminConfigForm");
    const inputTelefono = document.getElementById("inputTelefono");
    const inputCorreo = document.getElementById("inputCorreo");
    const inputDireccion = document.getElementById("inputDireccion");
    const btnLogout = document.getElementById("btnLogout");

    // 3. Cargar los datos guardados previamente (o los valores por defecto si es la primera vez)
    if (inputTelefono) {
        inputTelefono.value = localStorage.getItem("webTelefono") || "906 380 881";
    }
    if (inputCorreo) {
        inputCorreo.value = localStorage.getItem("webCorreo") || "jcarbonel627@gmail.com";
    }
    if (inputDireccion) {
        inputDireccion.value = localStorage.getItem("webDireccion") || "Manuel María Izaga 376A, Chiclayo";
    }

    // 4. Guardar los cambios de configuración general al hacer clic en "Guardar Cambios"
    if (adminConfigForm) {
        adminConfigForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const nuevoTelefono = inputTelefono.value.trim();
            const nuevoCorreo = inputCorreo.value.trim();
            const nuevaDireccion = inputDireccion.value.trim();

            // Guardar permanentemente en el navegador (localStorage)
            localStorage.setItem("webTelefono", nuevoTelefono);
            localStorage.setItem("webCorreo", nuevoCorreo);
            localStorage.setItem("webDireccion", nuevaDireccion);

            alert("¡Cambios guardados con éxito! Ya se reflejan en la página web principal.");
        });
    }

    // 5. Botón de Cerrar Sesión
    if (btnLogout) {
        btnLogout.addEventListener("click", function () {
            sessionStorage.removeItem("adminAuth");
            window.location.href = "login.html";
        });
    }







    
    // ==========================================
    // 6. GESTIÓN DE CASOS DE ÉXITO (NUEVO)
    // ==========================================
    const formNuevoCaso = document.getElementById("formNuevoCaso");
    const STORAGE_CASOS_KEY = "carbonel_casos_exito";

    if (formNuevoCaso) {
        formNuevoCaso.addEventListener("submit", function (e) {
            e.preventDefault();

            const materiaInput = document.getElementById("materiaCaso");
            const tituloInput = document.getElementById("tituloCaso");
            const descripcionInput = document.getElementById("descripcionCaso");

            if (!materiaInput || !tituloInput || !descripcionInput) return;

            // Obtener los casos actuales o inicializar un array vacío
            let casosExito = JSON.parse(localStorage.getItem(STORAGE_CASOS_KEY)) || [
                {
                    materia: "Derecho Penal",
                    titulo: "Absolución en Investigación Preliminar",
                    descripcion: "Defensa técnica oportuna en comisaría y fiscalía, logrando demostrar la falta de elementos de convicción y consiguiendo el archivo inmediato de la investigación."
                },
                {
                    materia: "Centro de Conciliación",
                    titulo: "Acuerdo Rápido en Obligación de Dar",
                    descripcion: "Mediación extrajudicial eficiente que evitó un proceso judicial prolongado, logrando la firma de un acta con acuerdo de pago total y garantía real."
                }
            ];

            // Crear el objeto del nuevo caso
            const nuevoCaso = {
                materia: materiaInput.value.trim(),
                titulo: tituloInput.value.trim(),
                descripcion: descripcionInput.value.trim()
            };

            // Agregar al listado y guardar en localStorage
            casosExito.push(nuevoCaso);
            localStorage.setItem(STORAGE_CASOS_KEY, JSON.stringify(casosExito));

            // Limpiar formulario y notificar
            formNuevoCaso.reset();
            alert("¡Caso de éxito registrado y publicado con éxito en la web principal!");
        });
    }
});