function calcular(){
    let ingresos = parseFloat(document.getElementById("txtIngresos").value);
    let egresos = parseFloat(document.getElementById("txtEgresos").value);

    let disponible = calcularDisponible(ingresos, egresos);
    document.getElementById("spnDisponible").textContent = disponible.toFixed(2);

    let capacidad = calcularCapacidadPago(disponible);
    document.getElementById("spnCapacidadPago").textContent = capacidad.toFixed(2);

    let monto = parseInt(document.getElementById("txtMonto").value);
    let plazoAnios = parseInt(document.getElementById("txtPlazo").value);
    let tasa = parseInt(document.getElementById("txtTasaInteres").value);

    let interes = calcularInteresSimple(monto, tasa, plazoAnios);
    document.getElementById("spnInteresPagar").textContent = interes.toFixed(2);

    let totalPagar = calcularTotalPagar(monto, interes);
    document.getElementById("spnTotalPrestamo").textContent = totalPagar.toFixed(2);

    let cuotaMensual = calcularCuotaMensual(totalPagar, plazoAnios);
    document.getElementById("spnCuotaMensual").textContent = cuotaMensual.toFixed(2);
}

document.getElementById("btnCalcularCredito").onclick = calcular;