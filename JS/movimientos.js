import { tipo, fecha, descripcion, valorMovimiento, cuentaMovimiento, listaMovimientos, botonAgregarMovimiento } from "./domElements.js";
import { formatoPesosColombianos } from "./utils.js";
import { actualizarSaldoTotal } from "./saldo.js";

export function agregarMovimiento() {
    if (!tipo.value || !fecha.value || !descripcion.value || !valorMovimiento.value || !cuentaMovimiento.value) {
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

export function asignarEventosMovimiento(movimiento) {
    let checkbox = movimiento.querySelector(".checkbox-movimiento");
    let botonEliminar = movimiento.querySelector(".btn-eliminar");
    let casillaCuenta = movimiento.children[5].textContent;
    let casillaValor = movimiento.children[4];
    let cuentaAfectada = document.getElementById(casillaCuenta);
    let tipoMovimiento = casillaValor.dataset.tipo;

    checkbox.addEventListener("change", () => {
        let saldoActual = parseFloat(cuentaAfectada.dataset.valor) || 0;
        let valorMovimiento = parseFloat(casillaValor.dataset.valor) || 0;

        if (checkbox.checked) {
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

botonAgregarMovimiento.addEventListener("click", agregarMovimiento);
