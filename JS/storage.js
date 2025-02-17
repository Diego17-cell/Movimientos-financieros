import { saldoInversiones, saldoAhorros, saldoEfectivo, listaMovimientos, saveDataButton } from "./domElements.js";
import { formatoPesosColombianos } from "./utils.js";
import { actualizarSaldoTotal } from "./saldo.js";
import { asignarEventosMovimiento } from "./movimientos.js";

export function guardarDatos() {
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
    alert("Datos guardados exitosamente");
}

export function cargarDatos() {
    let datosGuardados = localStorage.getItem("datosFinancieros");
    if (datosGuardados) {
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

saveDataButton.addEventListener("click", guardarDatos);
document.addEventListener("DOMContentLoaded", cargarDatos);
