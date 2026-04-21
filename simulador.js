function limpiarErrores(){
    document.getElementById("errorIngresos").textContent = "";
    document.getElementById("errorArriendo").textContent = "";
    document.getElementById("errorAlimentacion").textContent = "";
    document.getElementById("errorVarios").textContent = "";
    document.getElementById("errorMonto").textContent = "";
    document.getElementById("errorPlazo").textContent = "";
    document.getElementById("errorTasa").textContent = "";

    document.getElementById("txtIngresos").classList.remove("input-error");
    document.getElementById("txtArriendo").classList.remove("input-error");
    document.getElementById("txtAlimentacion").classList.remove("input-error");
    document.getElementById("txtVarios").classList.remove("input-error");
    document.getElementById("txtMonto").classList.remove("input-error");
    document.getElementById("txtPlazo").classList.remove("input-error");
    document.getElementById("txtTasaInteres").classList.remove("input-error");
}

function mostrarError(idInput, idError, mensaje){
    document.getElementById(idError).textContent = mensaje;
    document.getElementById(idInput).classList.add("input-error");
}

function validarCampoNumero(valor, idInput, idError, nombreCampo){
    let esValido = true;

    if(valor == ""){
        mostrarError(idInput, idError, "El campo " + nombreCampo + " es obligatorio");
        esValido = false;
    }else if(isNaN(valor)){
        mostrarError(idInput, idError, nombreCampo + " debe ser numérico");
        esValido = false;
    }else if(parseFloat(valor) < 0){
        mostrarError(idInput, idError, nombreCampo + " no puede ser negativo");
        esValido = false;
    }else if(parseFloat(valor) > 100000){
        mostrarError(idInput, idError, nombreCampo + " no puede ser mayor a 100000");
        esValido = false;
    }

    return esValido;
}

function validarFormulario(){
    limpiarErrores();

    let esValido = true;

    let ingresos = document.getElementById("txtIngresos").value.trim();
    let arriendo = document.getElementById("txtArriendo").value.trim();
    let alimentacion = document.getElementById("txtAlimentacion").value.trim();
    let varios = document.getElementById("txtVarios").value.trim();
    let monto = document.getElementById("txtMonto").value.trim();
    let plazo = document.getElementById("txtPlazo").value.trim();
    let tasa = document.getElementById("txtTasaInteres").value.trim();

    if(!validarCampoNumero(ingresos, "txtIngresos", "errorIngresos", "ingresos")){
        esValido = false;
    }
    if(!validarCampoNumero(arriendo, "txtArriendo", "errorArriendo", "arriendo")){
        esValido = false;
    }
    if(!validarCampoNumero(alimentacion, "txtAlimentacion", "errorAlimentacion", "alimentación")){
        esValido = false;
    }
    if(!validarCampoNumero(varios, "txtVarios", "errorVarios", "varios")){
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
    }else if(parseFloat(tasa) <= 0){
        mostrarError("txtTasaInteres","errorTasa","La tasa debe ser mayor a 0");
        esValido = false;
    }else if(parseFloat(tasa) > 100){
        mostrarError("txtTasaInteres","errorTasa","La tasa no puede ser mayor a 100");
        esValido = false;
    }

    if(!isNaN(ingresos) && !isNaN(arriendo) && !isNaN(alimentacion) && !isNaN(varios)){
        let totalGastos = parseFloat(arriendo) + parseFloat(alimentacion) + parseFloat(varios);

        if(totalGastos > parseFloat(ingresos)){
            mostrarError("txtVarios","errorVarios","La suma de gastos no puede ser mayor que ingresos");
            esValido = false;
        }
    }

    return esValido;
}

function calcular(){
    let valido = validarFormulario();

    if(valido == false){
        document.getElementById("spnTotalGastos").textContent = "";
        document.getElementById("spnDisponible").textContent = "";
        document.getElementById("spnCapacidadPago").textContent = "";
        document.getElementById("spnInteresPagar").textContent = "";
        document.getElementById("spnTotalPrestamo").textContent = "";
        document.getElementById("spnCuotaMensual").textContent = "";
        document.getElementById("spnEstadoCredito").textContent = "ANALIZANDO...";
        return;
    }

    let ingresos = parseFloat(document.getElementById("txtIngresos").value);
    let arriendo = parseFloat(document.getElementById("txtArriendo").value);
    let alimentacion = parseFloat(document.getElementById("txtAlimentacion").value);
    let varios = parseFloat(document.getElementById("txtVarios").value);

    let totalGastos = arriendo + alimentacion + varios;
    document.getElementById("spnTotalGastos").textContent = totalGastos.toFixed(2);

    let disponible = calcularDisponible(ingresos, totalGastos);
    document.getElementById("spnDisponible").textContent = disponible.toFixed(2);

    let capacidad = calcularCapacidadPago(disponible);
    document.getElementById("spnCapacidadPago").textContent = capacidad.toFixed(2);

    let monto = parseInt(document.getElementById("txtMonto").value);
    let plazoAnios = parseInt(document.getElementById("txtPlazo").value);
    let tasa = parseFloat(document.getElementById("txtTasaInteres").value);

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
    document.getElementById("txtArriendo").value = "";
    document.getElementById("txtAlimentacion").value = "";
    document.getElementById("txtVarios").value = "";
    document.getElementById("txtMonto").value = "";
    document.getElementById("txtPlazo").value = "";
    document.getElementById("txtTasaInteres").value = "";

    document.getElementById("spnTotalGastos").textContent = "";
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