export function formatoPesosColombianos(valor) {
    if (isNaN(valor)) return;
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(valor);
}
