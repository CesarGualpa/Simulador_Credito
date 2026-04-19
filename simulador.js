//AQUI EL JAVASCRIPT PARA MANIPULAR EL HTML
function calcular(){
    // 1. Leer ingresos
    let ingresos = parseFloat(document.getElementById("txtIngresos").value);
    // 2. Leer egresos
    let egresos = parseFloat(document.getElementById("txtEgresos").value);
    // 3. Llamar a calcularDispoible
    let disponible = calcularDisponible(ingresos, egresos);
    // 4. Mostrar en pantalla
document.getElementById("spnDisponible").textContent = disponible.toFixed(2);}
// evento botón
document.getElementById("btnCalcularCredito").onclick = calcular;