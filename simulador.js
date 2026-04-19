function limpiarErrores(){
    document.getElementById("errorIngresos").textContent = "";
    document.getElementById("errorEgresos").textContent = "";
    document.getElementById("errorMonto").textContent = "";
    document.getElementById("errorPlazo").textContent = "";
    document.getElementById("errorTasa").textContent = "";

    document.getElementById("txtIngresos").classList.remove("input-error");
    document.getElementById("txtEgresos").classList.remove("input-error");
    document.getElementById("txtMonto").classList.remove("input-error");
    document.getElementById("txtPlazo").classList.remove("input-error");
    document.getElementById("txtTasaInteres").classList.remove("input-error");
}

function mostrarError(idInput, idError, mensaje){
    document.getElementById(idError).textContent = mensaje;
    document.getElementById(idInput).classList.add("input-error");
}

function validarFormulario(){
    limpiarErrores();

    let esValido = true;

    let ingresos = document.getElementById("txtIngresos").value.trim();
    let egresos = document.getElementById("txtEgresos").value.trim();
    let monto = document.getElementById("txtMonto").value.trim();
    let plazo = document.getElementById("txtPlazo").value.trim();
    let tasa = document.getElementById("txtTasaInteres").value.trim();

    if(ingresos == ""){
        mostrarError("txtIngresos","errorIngresos","El campo ingresos es obligatorio");
        esValido = false;
    }else if(isNaN(ingresos)){
        mostrarError("txtIngresos","errorIngresos","Ingresos debe ser numérico");
        esValido = false;
    }else if(parseFloat(ingresos) < 0){
        mostrarError("txtIngresos","errorIngresos","Ingresos no puede ser negativo");
        esValido = false;
    }else if(parseFloat(ingresos) > 100000){
        mostrarError("txtIngresos","errorIngresos","Ingresos no puede ser mayor a 100000");
        esValido = false;
    }

    if(egresos == ""){
        mostrarError("txtEgresos","errorEgresos","El campo egresos es obligatorio");
        esValido = false;
    }else if(isNaN(egresos)){
        mostrarError("txtEgresos","errorEgresos","Egresos debe ser numérico");
        esValido = false;
    }else if(parseFloat(egresos) < 0){
        mostrarError("txtEgresos","errorEgresos","Egresos no puede ser negativo");
        esValido = false;
    }else if(parseFloat(egresos) > 100000){
        mostrarError("txtEgresos","errorEgresos","Egresos no puede ser mayor a 100000");
        esValido = false;
    }

    if(monto == ""){
        mostrarError("txtMonto","errorMonto","El campo monto es obligatorio");
        esValido = false;
    }else if(isNaN(monto)){
        mostrarError("txtMonto","errorMonto","Monto debe ser numérico");
        esValido = false;
    }else if(parseInt(monto) < 100){
        mostrarError("txtMonto","errorMonto","Monto mínimo permitido: 100");
        esValido = false;
    }else if(parseInt(monto) > 50000){
        mostrarError("txtMonto","errorMonto","Monto máximo permitido: 50000");
        esValido = false;
    }

    if(plazo == ""){
        mostrarError("txtPlazo","errorPlazo","El campo plazo es obligatorio");
        esValido = false;
    }else if(isNaN(plazo)){
        mostrarError("txtPlazo","errorPlazo","Plazo debe ser numérico");
        esValido = false;
    }else if(parseInt(plazo) < 1){
        mostrarError("txtPlazo","errorPlazo","El plazo mínimo es 1 año");
        esValido = false;
    }else if(parseInt(plazo) > 30){
        mostrarError("txtPlazo","errorPlazo","El plazo máximo es 30 años");
        esValido = false;
    }

    if(tasa == ""){
        mostrarError("txtTasaInteres","errorTasa","El campo tasa es obligatorio");
        esValido = false;
    }else if(isNaN(tasa)){
        mostrarError("txtTasaInteres","errorTasa","La tasa debe ser numérica");
        esValido = false;
    }else if(parseInt(tasa) <= 0){
        mostrarError("txtTasaInteres","errorTasa","La tasa debe ser mayor a 0");
        esValido = false;
    }else if(parseInt(tasa) > 100){
        mostrarError("txtTasaInteres","errorTasa","La tasa no puede ser mayor a 100");
        esValido = false;
    }

    if(!isNaN(ingresos) && !isNaN(egresos)){
        if(parseFloat(egresos) > parseFloat(ingresos)){
            mostrarError("txtEgresos","errorEgresos","Egresos no puede ser mayor que ingresos");
            esValido = false;
        }
    }

    return esValido;
}

function calcular(){
    let valido = validarFormulario();

    if(valido == false){
        document.getElementById("spnDisponible").textContent = "";
        document.getElementById("spnCapacidadPago").textContent = "";
        document.getElementById("spnInteresPagar").textContent = "";
        document.getElementById("spnTotalPrestamo").textContent = "";
        document.getElementById("spnCuotaMensual").textContent = "";
        document.getElementById("spnEstadoCredito").textContent = "ANALIZANDO...";
        return;
    }

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

    let aprobado = aprobarCredito(capacidad, cuotaMensual);

    if(aprobado == true){
        document.getElementById("spnEstadoCredito").textContent = "CREDITO APROBADO";
    }else{
        document.getElementById("spnEstadoCredito").textContent = "CREDITO RECHAZADO";
    }
}

function reiniciar(){
    document.getElementById("txtIngresos").value = "";
    document.getElementById("txtEgresos").value = "";
    document.getElementById("txtMonto").value = "";
    document.getElementById("txtPlazo").value = "";
    document.getElementById("txtTasaInteres").value = "";

    document.getElementById("spnDisponible").textContent = "";
    document.getElementById("spnCapacidadPago").textContent = "";
    document.getElementById("spnInteresPagar").textContent = "";
    document.getElementById("spnTotalPrestamo").textContent = "";
    document.getElementById("spnCuotaMensual").textContent = "";
    document.getElementById("spnEstadoCredito").textContent = "ANALIZANDO...";

    limpiarErrores();
}

document.getElementById("btnCalcularCredito").onclick = calcular;
document.getElementById("btnReiniciar").onclick = reiniciar;