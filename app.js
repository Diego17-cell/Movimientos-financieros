saldoInversiones = document.getElementById("inversiones");
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
saveDataButton = document.getElementById("saveData");

function actualizarSaldoTotal(){
    sumaSaldos = parseFloat(saldoInversiones.dataset.valor) + parseFloat(saldoAhorros.dataset.valor) + parseFloat(saldoEfectivo.dataset.valor);
    saldoTotal.textContent = formatoPesosColombianos(sumaSaldos);
}

function actualizarSaldo() {
    let cuentaInput = document.getElementById("cuenta-actualizar");
    let valorInput = document.getElementById("valor-actualizar");
    
    let cuenta = cuentaInput.value;
    let valor = valorInput.value;

    let celda = document.getElementById(cuenta);
    let nuevoValor = parseFloat(valor.replace(/\./g, "")) || 0;

    if (celda) {
        celda.dataset.valor = nuevoValor;
        celda.textContent = formatoPesosColombianos(nuevoValor);
        actualizarSaldoTotal();
    } else {
        alert("Cuenta no válida");
    }

    cuentaInput.value = "";
    valorInput.value = "";
}

botonActualizarSaldo.addEventListener("click", actualizarSaldo);

function agregarMovimiento(){
    if(!tipo.value || !fecha.value || !descripcion.value || !valorMovimiento.value || !cuentaMovimiento.value){
        alert("Por favor completa los campos");
        return;
    }

    const nuevoMovimiento = document.createElement("tr");
    nuevoMovimiento.innerHTML = `
        <td><input type="checkbox" class="checkbox-movimiento"></td>
        <td>${tipo.value}</td>
        <td>${fecha.value}</td>
        <td>${descripcion.value}</td>
        <td data-valor="${valorMovimiento.value.replace(/\./g, "")}" data-tipo="${tipo.value}">${formatoPesosColombianos(parseFloat(valorMovimiento.value.replace(/\./g, "")) || 0)}</td>
        <td>${cuentaMovimiento.value}</td>
        <td><button class="btn-eliminar">X</button></td>
    `;

    listaMovimientos.appendChild(nuevoMovimiento);
    asignarEventosMovimiento(nuevoMovimiento);

    tipo.value = "";
    fecha.value = "";
    descripcion.value = "";
    valorMovimiento.value = "";
    cuentaMovimiento.value = "";
}

botonAgregarMovimiento.addEventListener("click", agregarMovimiento);

function asignarEventosMovimiento(movimiento) {
    let checkbox = movimiento.querySelector(".checkbox-movimiento");
    let botonEliminar = movimiento.querySelector(".btn-eliminar");
    let casillaCuenta = movimiento.children[5].textContent;
    let casillaValor = movimiento.children[4];
    let cuentaAfectada = document.getElementById(casillaCuenta);
    let tipoMovimiento = casillaValor.dataset.tipo;
    
    checkbox.addEventListener("change", () => {
        let saldoActual = parseFloat(cuentaAfectada.dataset.valor) || 0;
        let valorMovimiento = parseFloat(casillaValor.dataset.valor) || 0;

        if(checkbox.checked){
            movimiento.style.textDecoration = "line-through";
            movimiento.style.color = "gray";
            cuentaAfectada.dataset.valor = tipoMovimiento === "ingreso" ? saldoActual + valorMovimiento : saldoActual - valorMovimiento;
        } else {
            movimiento.style.textDecoration = "none";
            movimiento.style.color = "black";
            cuentaAfectada.dataset.valor = tipoMovimiento === "ingreso" ? saldoActual - valorMovimiento : saldoActual + valorMovimiento;
        }
        cuentaAfectada.textContent = formatoPesosColombianos(cuentaAfectada.dataset.valor);
        actualizarSaldoTotal();
    });

    botonEliminar.addEventListener("click", () => movimiento.remove());
}

saveDataButton.addEventListener("click", () => {
    let datos = {
        saldos: {
            inversiones: saldoInversiones.dataset.valor,
            ahorro: saldoAhorros.dataset.valor,
            efectivo: saldoEfectivo.dataset.valor
        },
        movimientos: Array.from(listaMovimientos.children).map(mov => ({
            html: mov.innerHTML,
            checked: mov.querySelector(".checkbox-movimiento").checked
        }))
    };
    localStorage.setItem("datosFinancieros", JSON.stringify(datos));
    alert("Datos guardados exitosamente")
});

function cargarDatos() {
    let datosGuardados = localStorage.getItem("datosFinancieros");
    if(datosGuardados){
        let datos = JSON.parse(datosGuardados);

        saldoInversiones.dataset.valor = datos.saldos.inversiones;
        saldoAhorros.dataset.valor = datos.saldos.ahorro;
        saldoEfectivo.dataset.valor = datos.saldos.efectivo;

        saldoInversiones.textContent = formatoPesosColombianos(datos.saldos.inversiones);
        saldoAhorros.textContent = formatoPesosColombianos(datos.saldos.ahorro);
        saldoEfectivo.textContent = formatoPesosColombianos(datos.saldos.efectivo);
        actualizarSaldoTotal();

        listaMovimientos.innerHTML = "";
        datos.movimientos.forEach(movData => {
            let nuevoMovimiento = document.createElement("tr");
            nuevoMovimiento.innerHTML = movData.html;
            listaMovimientos.appendChild(nuevoMovimiento);
            let checkbox = nuevoMovimiento.querySelector(".checkbox-movimiento");
            checkbox.checked = movData.checked;
            asignarEventosMovimiento(nuevoMovimiento);
        });
    }
}

document.addEventListener("DOMContentLoaded", cargarDatos);

function formatoPesosColombianos(valor) {
    if (isNaN(valor)) return;
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(valor);
}
