nombreNota = document.getElementById("nombreNota");
buttonCrearNota = document.getElementById("crearNota");
contenedorNotas = document.getElementById("notasContainer");
buttonGuardarNotas = document.getElementById("buttonGuardarNotas");

function crearNota(){
    if(!nombreNota.value){
        alert("Por favor ingresa un nombre para la nota");
        return;
    }else{
            const nuevaNota = document.createElement("details");
            nuevaNota.innerHTML = `
                <summary>${nombreNota.value}</summary>
                <textarea rows="5" placeholder="Escribe aquí tu nota..."></textarea>
                <button class="eliminarNota">Eliminar Nota</button>
            `;

            contenedorNotas.appendChild(nuevaNota);

            nombreNota.value = "";
    };
};

buttonCrearNota.addEventListener("click", crearNota);