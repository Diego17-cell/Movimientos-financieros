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
    saldoTotal.textContent = sumaSaldos;
}

function actualizarSaldo(){
    cuenta = document.getElementById("cuenta-actualizar").value;
    valor = document.getElementById("valor-actualizar").value;
    celda = document.getElementById(cuenta);

    celda.textContent = celda.dataset.valor = parseFloat(valor) || 0;

    actualizarSaldoTotal();

};

botonActualizarSaldo.addEventListener("click", actualizarSaldo);

function agregarMovimiento(){
    if(!tipo.value || !fecha.value || !descripcion.value || !valorMovimiento.value || !cuentaMovimiento.value){
        alert("Por favor completa los campos");
        return;
    }else{
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
        casillaValor.textContent = parseInt(valorMovimiento.value,10);

        const casillaCuenta = document.createElement("td");
        casillaCuenta.textContent = cuentaMovimiento.value;


        casillaCheck.appendChild(checkbox);

        nuevoMovimiento.appendChild(casillaCheck);
        nuevoMovimiento.appendChild(casillaTipo);
        nuevoMovimiento.appendChild(casillaFecha);
        nuevoMovimiento.appendChild(casillaDescripcion);
        nuevoMovimiento.appendChild(casillaValor);
        nuevoMovimiento.appendChild(casillaCuenta);

        listaMovimientos.appendChild(nuevoMovimiento);

        tipo.value = "";
        fecha.value = "";
        descripcion.value = "";
        valorMovimiento.value = "";
        cuentaMovimiento.value = "";
    }
}

botonAgregarMovimiento.addEventListener("click", agregarMovimiento);