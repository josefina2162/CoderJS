// Quiero seguir con la pagina que estuve haciendo en el curso de desarrollo web
/* Lo que hice fue un carrito de compras para los distintos servicios que la casa ofrece  */

// Defino las variables para los productos y sus precios 
let servicio1 = "Servicio de catering";
let precio1 = 10000;

let servicio2 = "Carrito de comidas";
let precio2 = 5000;

let servicio3 = "Barra de tragos";
let precio3 = 7000;

let servicio4 = "Servicio de mozos";
let precio4 = 7000;

let servicio5 = "Mesa de dulces";
let precio5 = 12000;

let servicio6 = "Servicio de DJ con estructuras";
let precio6 = 15000;

function mostrarServiciosDisponibles() {
  let listaServicios = "Servicios disponibles, recuerde el número del servicio para ingresarlo posteriormente:\n";
  listaServicios += `1: ${servicio1} - $${precio1}\n`;
  listaServicios += `2: ${servicio2} - $${precio2}\n`;
  listaServicios += `3: ${servicio3} - $${precio3}\n`;
  listaServicios += `4: ${servicio4} - $${precio4}\n`;
  listaServicios += `5: ${servicio5} - $${precio5}\n`;
  listaServicios += `6: ${servicio6} - $${precio6}\n`;
  alert(listaServicios);
}

function calcularCostoTotal() {
  let costoTotal = 0;

  mostrarServiciosDisponibles();

  while (true) {
    const seleccion = (+prompt("Ingrese el número del producto o servicio (o escriba 'salir' para terminar):"));


// Use el isNaN para determinar si el valor proporcionado por el usuario no es un número
  
if (isNaN(seleccion)) {
      alert("Por favor, ingrese un número válido.");
      continue;
    }

    if (seleccion === 0) {
      break; // 
    }

    switch (seleccion) {
      case 1:
        costoTotal += precio1;
        break;
      case 2:
        costoTotal += precio2;
        break;
      case 3:
        costoTotal += precio3;
        break;
      case 4:
        costoTotal += precio4;
        break;
      case 5:
        costoTotal += precio5;
        break;
      case 6:
        costoTotal += precio6;
        break;
      default:
        alert(`El número ${seleccion} no corresponde a un producto o servicio válido.`);
    }
  }

  return costoTotal;
}

const costoTotal = calcularCostoTotal();

alert(`El costo total de los servicios seleccionados es: $${costoTotal}`);