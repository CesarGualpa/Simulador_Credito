function calcularDisponible(ingresos, egresos){
    let disponible = ingresos - egresos;
    if(disponible < 0){
        return 0;
    }
    return disponible;
}

function calcularCapacidadPago(montoDisponible){
    let capacidad = montoDisponible * 0.5;
    return capacidad;
}

function calcularInteresSimple(monto, tasa, plazoAnios){
    let interes = plazoAnios * monto * (tasa / 100);
    return interes;
}

function calcularTotalPagar(monto, interes){
    let total = monto + interes + 100;
    return total;
}

function calcularCuotaMensual(total, plazoAnios){
    let meses = plazoAnios * 12;
    let cuota = total / meses;
    return cuota;
}

function aprobarCredito(capacidadPagoMensual, cuotaMensual){
    if(capacidadPagoMensual > cuotaMensual){
        return true;
    }
    return false;
}