let cantidadObras = 0;
let contadorObras = 0;

let obras = [];

function aceptarCantidad() {

    let cantidad = Number(txtCantidadObras.value);

    if (cantidad <= 0 || isNaN(cantidad)) {
        alert("Ingrese una cantidad válida de obras.");
        return;
    }

    cantidadObras = cantidad;

    txtCantidadObras.disabled = true;
    btnCantidad.disabled = true;

    formularioObra.style.display = "flex";
}

function ingresarObra() {

    let nombre = txtNombre.value;
    let luces = Number(txtLuces.value);
    let horas = Number(txtHoras.value);
    let consumo = Number(txtConsumo.value);
    let costo = Number(txtCosto.value);

    if (nombre == "") {
        alert("Ingrese el nombre de la obra.");
        return;
    }

    if (luces <= 0 || isNaN(luces)) {
        alert("Ingrese una cantidad válida de luces.");
        return;
    }

    if (horas <= 0 || horas > 24 || isNaN(horas)) {
        alert("Ingrese una cantidad válida de horas.");
        return;
    }

    if (consumo <= 0 || isNaN(consumo)) {
        alert("Ingrese un consumo válido.");
        return;
    }

    if (costo <= 0 || isNaN(costo)) {
        alert("Ingrese un costo válido.");
        return;
    }

    let obra = {
        nombre: nombre,
        luces: luces,
        horas: horas,
        consumoHora: consumo,
        costoKwh: costo
    };

    obras.push(obra);

    contadorObras++;

    txtNombre.value = "";
    txtLuces.value = "";
    txtHoras.value = "";
    txtConsumo.value = "";
    txtCosto.value = "";

    if (contadorObras == cantidadObras) {

        btnIngresar.disabled = true;
        btnCalcular.disabled = false;

        alert("Se cargaron todas las obras.");
    }
}

function calcularResultados() {
    if (obras.length === 0) {
        resultado.innerHTML = "<h3>No hay datos para calcular</h3>";
        return;
    }

    let consumoTotal = 0;
    let obrasMas20 = 0;
    let mayorTiempo = obras[0];

    for (let i = 0; i < obras.length; i++) {
        let consumoObra = obras[i].luces * obras[i].horas * obras[i].consumoHora;
        consumoTotal += consumoObra;

        if (obras[i].horas > mayorTiempo.horas) {
            mayorTiempo = obras[i];
        }

        if (obras[i].luces > 20) {
            obrasMas20++;
        }
    }

    let promedio = consumoTotal / obras.length;
    let costoMayor = mayorTiempo.luces * mayorTiempo.horas * mayorTiempo.consumoHora * mayorTiempo.costoKwh;
    let porcentaje = (obrasMas20 * 100) / obras.length;

    let consumoTotalRedondeado = Math.round(consumoTotal * 100) / 100;
    let promedioRedondeado     = Math.round(promedio * 100) / 100;
    let costoMayorRedondeado   = Math.round(costoMayor * 100) / 100;
    let porcentajeRedondeado   = Math.round(porcentaje * 100) / 100;

    resultado.innerHTML =
        "<h3>Resultados</h3>" +
        "<p><strong>Consumo diario total:</strong> " + consumoTotalRedondeado + " kWh</p>" +
        "<p><strong>Consumo promedio por obra:</strong> " + promedioRedondeado + " kWh</p>" +
        "<p><strong>Obra con mayor tiempo:</strong> " + mayorTiempo.nombre + "</p>" +
        "<p><strong>Horas de funcionamiento:</strong> " + mayorTiempo.horas + "</p>" +
        "<p><strong>Costo diario:</strong> $" + costoMayorRedondeado + "</p>" +
        "<p><strong>Porcentaje de obras con más de 20 luces:</strong> " + porcentajeRedondeado + "%</p>";

    btnCalcular.disabled = true;
    btnReiniciar.disabled = false;
}
function reiniciar() {
    location.reload();
}

btnCantidad.addEventListener("click", aceptarCantidad);

btnIngresar.addEventListener("click", ingresarObra);

btnCalcular.addEventListener("click", calcularResultados);

btnReiniciar.addEventListener("click", reiniciar);