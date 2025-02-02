saldoFiducia = document.getElementById("fiducia");
saldoAhorros = document.getElementById("cta-ahorro");
saldoEfectivo = document.getElementById("efectivo");
saldoTotal = document.getElementById("saldo-total");
botonActualizarSaldo = document.getElementById("guardar-saldos");
tipo = document.getElementById("tipo");
fecha = document.getElementById("fecha");
descripcion = document.getElementById("descripcion");
valorMovimiento = document.getElementById("valor");
cuentaMovimiento = document.getElementById("cuenta-afectada");
botonAgregarMovimiento = document.getElementById("buttonAgregar");
listaMovimientos = document.getElementById("lista-movimientos");

function actualizarSaldoTotal(){
    sumaSaldos = parseFloat(saldoFiducia.dataset.valor) + parseFloat(saldoAhorros.dataset.valor) + parseFloat(saldoEfectivo.dataset.valor);
    saldoTotal.textContent = formatoPesosColombianos(sumaSaldos);
}

function actualizarSaldo() {
    let cuentaInput = document.getElementById("cuenta-actualizar"); // Obtener el input
    let valorInput = document.getElementById("valor-actualizar"); // Obtener el input
    
    let cuenta = cuentaInput.value; // Obtener el valor del input
    let valor = valorInput.value; // Obtener el valor del input

    let celda = document.getElementById(cuenta);
    let nuevoValor = parseFloat(valor.replace(/\./g, "")) || 0;

    if (celda) { // Verifica que la celda exista
        celda.dataset.valor = nuevoValor;
        celda.textContent = formatoPesosColombianos(nuevoValor);
        actualizarSaldoTotal();
    } else {
        alert("Cuenta no válida");
    }

    // ✅ Limpiar campos correctamente
    cuentaInput.value = "";
    valorInput.value = "";
}


botonActualizarSaldo.addEventListener("click", actualizarSaldo);

function agregarMovimiento(){
    if(!tipo.value || !fecha.value || !descripcion.value || !valorMovimiento.value || !cuentaMovimiento.value){
        alert("Por favor completa los campos");
        return;
    }else{

        //creacion de elementos para el nuevo movimiento

        const nuevoMovimiento = document.createElement("tr");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        const casillaCheck = document.createElement("td");
        
        const casillaTipo = document.createElement("td");
        casillaTipo.textContent = tipo.value;

        const casillaFecha = document.createElement("td");
        casillaFecha.textContent = fecha.value;

        const casillaDescripcion = document.createElement("td");
        casillaDescripcion.textContent = descripcion.value;

        const casillaValor = document.createElement("td");
        const valorNumerico = parseFloat(valorMovimiento.value.replace(/\./g, "")) || 0;
        casillaValor.dataset.valor = valorNumerico;
        casillaValor.textContent = formatoPesosColombianos(valorNumerico);

        const casillaCuenta = document.createElement("td");
        casillaCuenta.textContent = cuentaMovimiento.value;

        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "eliminar";
        //funcionalidad de eliminar
        botonEliminar.addEventListener("click", ()=>{
                nuevoMovimiento.remove();
            }
        );

        const casillaBotonEliminar = document.createElement("td");

        //funcionalidad check box
        checkbox.addEventListener("change", ()=>{

            let cuentaAfectada = document.getElementById(casillaCuenta.textContent);
            let saldoActual = parseFloat(cuentaAfectada.dataset.valor) || 0;
            let valorMovimiento = parseFloat(casillaValor.dataset.valor) || 0;

                if(checkbox.checked){
                    nuevoMovimiento.style.textDecoration = "line-through";
                    nuevoMovimiento.style.color = "gray";

                    //actualizar saldo segun naturaleza del movimiento
                    if(casillaTipo.textContent === "ingreso"){
                        cuentaAfectada.dataset.valor = saldoActual + valorMovimiento;
                    }else if(casillaTipo.textContent === "egreso"){
                        cuentaAfectada.dataset.valor = saldoActual - valorMovimiento;
                    }

                    cuentaAfectada.textContent = cuentaAfectada.dataset.valor;

                }else{

                    //revertir cambios

                    nuevoMovimiento.style.textDecoration = "none";
                    nuevoMovimiento.style.color = "black";

                    if(casillaTipo.textContent === "ingreso"){
                        cuentaAfectada.dataset.valor = saldoActual - valorMovimiento;
                    }else if(casillaTipo.textContent === "egreso"){
                        cuentaAfectada.dataset.valor = saldoActual + valorMovimiento;
                    }
                }
                cuentaAfectada.textContent = formatoPesosColombianos(cuentaAfectada.dataset.valor);
                actualizarSaldoTotal();
            }
        );

        //asignacion de hijos

        casillaCheck.appendChild(checkbox);

        casillaBotonEliminar.appendChild(botonEliminar);

        nuevoMovimiento.appendChild(casillaCheck);
        nuevoMovimiento.appendChild(casillaTipo);
        nuevoMovimiento.appendChild(casillaFecha);
        nuevoMovimiento.appendChild(casillaDescripcion);
        nuevoMovimiento.appendChild(casillaValor);
        nuevoMovimiento.appendChild(casillaCuenta);
        nuevoMovimiento.appendChild(casillaBotonEliminar);

        listaMovimientos.appendChild(nuevoMovimiento);

        //limpiar campos

        tipo.value = "";
        fecha.value = "";
        descripcion.value = "";
        valorMovimiento.value = "";
        cuentaMovimiento.value = "";
    }
}

botonAgregarMovimiento.addEventListener("click", agregarMovimiento);

//funcion para dar formato en pesos colombianos separado con . de miles
function formatoPesosColombianos(valor) {
    // Asegurarse de que el valor sea un número
    if (isNaN(valor)) {
        console.log("El valor ingresado no es un número válido.");
        return;
    }

    // Crear el formato de pesos colombianos con separadores de miles
    const formato = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP'
    });

    // Retornar el valor formateado
    return formato.format(valor);
}