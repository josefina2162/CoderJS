class Servicio {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }
}

const nuevosServicios = [
    new Servicio('Pista de baile', 8000),
    new Servicio('Fotógrafo', 7000),
];

const casaDeComida = [
    ...nuevosServicios,
    new Servicio('Barra de tragos', 20000),
    new Servicio('Mesa de dulces', 15000),
    new Servicio('Picadas', 10000),
    new Servicio('Asador', 5000),
    new Servicio('Mozos', 35000),
    new Servicio('Cascada de chocolate', 4000),
    new Servicio('DJ y luces', 55000),
];

function mostrarListaServicios() {
    const listaServicios = document.getElementById('listaServicios');
    listaServicios.innerHTML = '';

    casaDeComida.forEach((servicio, index) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.classList.add('dropdown-item');
        a.href = '#';
        a.textContent = `${servicio.nombre} - $${servicio.precio}`;
        li.appendChild(a);
        listaServicios.appendChild(li);

        a.addEventListener('click', () => {
            agregarServicioAServicios(servicio, index);
        });
    });
}

document.querySelector('.dropdown button').addEventListener('click', mostrarListaServicios);

const tablaServicios = document.getElementById('tablaServicios');
const totalElement = document.getElementById('total');

let total = 0;

function agregarServicioAServicios(servicio) {
    const cantidad = 1; 

    const precioTotal = servicio.precio * cantidad;
    const row = tablaServicios.insertRow();
    const numColumn = row.insertCell(0);
    const nombreColumn = row.insertCell(1);
    const precioColumn = row.insertCell(2); 

    numColumn.textContent = tablaServicios.rows.length;
    nombreColumn.textContent = servicio.nombre;
    precioColumn.textContent = `$${precioTotal}`;

    total += precioTotal;
    totalElement.textContent = total;

    sessionStorage.setItem(`servicio-${tablaServicios.rows.length}`, JSON.stringify({
        nombre: servicio.nombre,
        precioTotal: precioTotal
    }));

}

function cargarServiciosDesdeStorage() {
    for (let i = 1; i <= sessionStorage.length; i++) {
        const clave = sessionStorage.key(i - 1);
        const { nombre, precioTotal } = JSON.parse(sessionStorage.getItem(clave));

        if (nombre && precioTotal) {
            const row = tablaServicios.insertRow();
            const numColumn = row.insertCell(0);
            const nombreColumn = row.insertCell(1);
            const precioColumn = row.insertCell(2); 

            numColumn.textContent = i;
            nombreColumn.textContent = nombre;
            precioColumn.textContent = `$${precioTotal}`;
        }
    }

    actualizarTotal();
}

cargarServiciosDesdeStorage();

function actualizarTotal() {
    let totalActualizado = 0;
    for (let i = 1; i <= tablaServicios.rows.length; i++) {
        const precioTotal = parseFloat(tablaServicios.rows[i - 1].cells[2].textContent.replace('$', ''));
        totalActualizado += precioTotal;
    }
    total = totalActualizado;
    totalElement.textContent = total;
}

const botonBorrar = document.getElementById('borrar-btn-custom');

botonBorrar.addEventListener('click', () => {
    while (tablaServicios.rows.length > 0) {
        tablaServicios.deleteRow(0);
    }

    total = 0;
    totalElement.textContent = total;

    const totalCarritoElement = document.querySelector('.totalCarrito');
    totalCarritoElement.innerHTML = '';

    totalCarrito.style.display = 'none';

    for (let i = 1; i <= sessionStorage.length; i++) {
        sessionStorage.removeItem(sessionStorage.key(i - 1));
    }
});

const botonAceptar = document.getElementById('aceptar-btn');
const totalCarrito = document.querySelector('.totalCarrito');

botonAceptar.addEventListener('click', () => {
    const filas = tablaServicios.rows;

    const serviciosSeleccionados = [];

    for (let i = 0; i < filas.length; i++) {
        const nombreServicio = filas[i].cells[1].textContent;
        const precioServicio = parseFloat(filas[i].cells[2].textContent.replace('$', ''));
        serviciosSeleccionados.push({ nombre: nombreServicio, precio: precioServicio });
    }

    mostrarServiciosEnCarrito(serviciosSeleccionados);
});

function mostrarServiciosEnCarrito(servicios) {
    const totalCarritoElement = document.querySelector('.totalCarrito');

    totalCarritoElement.innerHTML = '';

    if (servicios.length === 0) {
        totalCarritoElement.innerHTML = '<p>No has seleccionado ningún servicio.</p>';
        return;
    }

    const listaServiciosSeleccionados = document.createElement('ul');
    listaServiciosSeleccionados.classList.add('servicios-seleccionados');

    servicios.forEach((servicio) => {
        const servicioItem = document.createElement('li');
        servicioItem.textContent = `${servicio.nombre} - $${servicio.precio.toFixed(2)}`;
        listaServiciosSeleccionados.appendChild(servicioItem);
    });

    const total = servicios.reduce((acc, servicio) => acc + servicio.precio, 0);

    const totalElement = document.createElement('p');
    totalElement.textContent = `Total: $${total.toFixed(2)}`;

    totalCarritoElement.appendChild(listaServiciosSeleccionados);
    totalCarritoElement.appendChild(totalElement);

    totalCarrito.style.display = 'block';
}