//Sigo trabajando con la página que quería hacer para seguir con mi trabajo de Desarrollo Web 
// Clase Servicio para representar los servicios
class Servicio {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }
}

// Utilice un array para guardar los servicios de la casa y luego poder recorrerlos 
const casaDeComida = [];

// Todos los servicios de Doña Alicia 
casaDeComida.push(new Servicio('Barra de tragos', 20000));
casaDeComida.push(new Servicio('Mesa de dulces', 15000));
casaDeComida.push(new Servicio('Picadas', 10000));
casaDeComida.push(new Servicio('Asador', 5000));
casaDeComida.push(new Servicio('Mozos', 35000));
casaDeComida.push(new Servicio('Cascada de chocolate', 4000));
casaDeComida.push(new Servicio('DJ y luces', 55000));

// Hago una función para mostrar toda la lista de servicios 
function mostrarServicios() {
    let mensaje = 'Servicios disponibles que ofrece Doña Alicia:\n';

    casaDeComida.forEach((servicio, index) => {
        mensaje += `${index + 1}. ${servicio.nombre} - $${servicio.precio}\n`;
    });

    alert(mensaje);
}

// Hice una función para buscar cualquier servicio por el nombre o el precio 
function buscarServicio(nombrePrecio) {
    return casaDeComida.filter(servicio =>
        servicio.nombre.toLowerCase() === nombrePrecio.toLowerCase() ||
        servicio.precio.toString() === nombrePrecio.toLowerCase()
    );
}

// Hice una función para que se pueda realizar la compra/alquiler de cualquier servicio 
function realizarCompra() {
    const carrito = []; // Hice un array para almacenar los servicios en el carrito 

    while (true) {
        const nombrePrecioServicio = prompt('Ingrese el nombre, precio o "terminar" para finalizar la compra:');

        if (nombrePrecioServicio.toLowerCase() === 'terminar') {
            break; 
        }

        const cantidad = parseInt(prompt('Ingrese la cantidad de servicios que desea alquilar:'));

        const servicioEncontrado = buscarServicio(nombrePrecioServicio);

        if (servicioEncontrado.length > 0) {
            const servicio = servicioEncontrado[0]; 
            const costoTotal = servicio.precio * cantidad;
            carrito.push({ nombre: servicio.nombre, cantidad, costoTotal });
        } else {
            alert('El servicio no se encuentra en la casa de comida.');
        }
    }

    // Hice una condición para mostrar los carritos que estan en e carrito y calcular el costo total 
    if (carrito.length > 0) {
        let mensajeCarrito = 'Servicios en su carrito:\n';
        let costoTotalCarrito = 0;

        carrito.forEach(item => {
            mensajeCarrito += `${item.cantidad} ${item.nombre} por $${item.costoTotal}\n`;
            costoTotalCarrito += item.costoTotal;
        });

        alert(`Compra realizada:\n${mensajeCarrito}Costo Total: $${costoTotalCarrito}`);
    } else {
        alert('No ha agregado ningún servicio al carrito.');
    }
}


mostrarServicios();
realizarCompra();