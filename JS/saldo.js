import { saldoInversiones, saldoAhorros, saldoEfectivo, saldoTotal, botonActualizarSaldo } from "./domElements.js";
import { formatoPesosColombianos } from "./utils.js";

export function actualizarSaldoTotal() {
    let sumaSaldos = parseFloat(saldoInversiones.dataset.valor) + parseFloat(saldoAhorros.dataset.valor) + parseFloat(saldoEfectivo.dataset.valor);
    saldoTotal.textContent = formatoPesosColombianos(sumaSaldos);
}

export function actualizarSaldo() {
    let cuentaInput = document.getElementById("cuenta-actualizar");
    let valorInput = document.getElementById("valor-actualizar");

    let cuenta = cuentaInput.value;
    let valor = valorInput.value;

    if(valor != ""){
        let celda = document.getElementById(cuenta);
        let nuevoValor = parseFloat(valor.replace(/\./g, "")) || 0;

        if (celda) {
            celda.dataset.valor = nuevoValor;
            celda.textContent = formatoPesosColombianos(nuevoValor);
            actualizarSaldoTotal();
        } else {
            alert("Cuenta no válida");
        }
    }
    else{
        alert("Por favor ingresa un valor valido");
        return;
    }
    cuentaInput.value = "";
    valorInput.value = "";
}

botonActualizarSaldo.addEventListener("click", actualizarSaldo);
