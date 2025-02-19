// Obtener elementos del DOM
var nombreNota = document.getElementById("nombreNota");
var buttonCrearNota = document.getElementById("crearNota");
var contenedorNotas = document.getElementById("notasContainer");
var buttonGuardarNotas = document.getElementById("buttonGuardarNotas");

// Función para crear una nota
function crearNota() {
    var nombreValido = nombreNota.value.trim();
    if (!nombreValido) {
        alert("Por favor ingresa un nombre para la nota");
        return;
    }

    var nuevaNota = document.createElement("details");

    nuevaNota.innerHTML = `
        <summary>${nombreValido}</summary>
        <textarea rows="5" placeholder="Escribe aquí tu nota..."></textarea>
        <button class="eliminarNota">Eliminar Nota</button>
    `;

    contenedorNotas.appendChild(nuevaNota);
    nombreNota.value = "";
    actualizarEventos();
}

// Función para guardar notas en localStorage
function guardarNotas() {
    var notas = [];
    var listaNotas = document.querySelectorAll("#notasContainer details");

    listaNotas.forEach(nota => {
        notas.push({
            nombre: nota.querySelector("summary").textContent,
            contenido: nota.querySelector("textarea").value
        });
    });

    localStorage.setItem("notas", JSON.stringify(notas));
    alert("Datos guardados exitosamente");
}

// Función para cargar notas desde localStorage
function cargarNotas() {
    var notasGuardadas = JSON.parse(localStorage.getItem("notas")) || [];

    notasGuardadas.forEach(nota => {
        var nuevaNota = document.createElement("details");

        nuevaNota.innerHTML = `
            <summary>${nota.nombre}</summary>
            <textarea rows="5" placeholder="Escribe aquí tu nota...">${nota.contenido}</textarea>
            <button class="eliminarNota">Eliminar Nota</button>
        `;

        contenedorNotas.appendChild(nuevaNota);
    });

    actualizarEventos();
}

// Función para actualizar eventos de botones de eliminación
function actualizarEventos() {
    document.querySelectorAll(".eliminarNota").forEach(boton => {
        boton.onclick = function () {
            this.parentElement.remove();
            guardarNotas();
        };
    });
}

// Eventos
buttonCrearNota.onclick = crearNota;
buttonGuardarNotas.onclick = guardarNotas;
window.onload = cargarNotas;
