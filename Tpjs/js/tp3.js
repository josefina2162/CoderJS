class Servicio {
    constructor(nombre, precio) {
      this.nombre = nombre;
      this.precio = precio;
    }
  }
  
  const tablaServicios = document.getElementById('tablaServicios');
  const totalElement = document.getElementById('total');
  let total = 0;
  
  //Función para cargar los servicios desde un archivo JSON local
  async function cargarServiciosDesdeJSON() {
    try {
      const response = await fetch('servicios.json');
      const data = await response.json();
      cargarServiciosDesdeObjetos(data);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  }
  
  //Función para cargar los servicios
  document.querySelector('.dropdown button').addEventListener('click', cargarServiciosDesdeJSON);
  
  //Función para cargar servicios desde objetos
  function cargarServiciosDesdeObjetos(servicios) {
    const listaServicios = document.getElementById('listaServicios');
    listaServicios.innerHTML = '';
  
    servicios.forEach((servicio, index) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.classList.add('dropdown-item');
      a.href = '#';
      a.textContent = `${servicio.nombre} - $${servicio.precio}`;
      li.appendChild(a);
      listaServicios.appendChild(li);
  
      a.addEventListener('click', () => {
        agregarServicioAServicios(servicio);
      });
    });
  }
  
  //Función para agregar un servicio al carrito
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
  
  //Función para cargar servicios desde el almacenamiento local
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
  
  //Función para actualizar el total
  function actualizarTotal() {
    let totalActualizado = 0;
    for (let i = 1; i <= tablaServicios.rows.length; i++) {
      const precioTotal = parseFloat(tablaServicios.rows[i - 1].cells[2].textContent.replace('$', ''));
      totalActualizado += precioTotal;
    }
    total = totalActualizado;
    totalElement.textContent = total;
  }
  
  //Función para borrar los servicios del carrito
  function borrarServicios() {
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
  }
  
  const botonBorrar = document.getElementById('borrar-btn-custom');
  botonBorrar.addEventListener('click', borrarServicios);
  
  const botonAceptar = document.getElementById('aceptar-btn');
  const totalCarrito = document.querySelector('.totalCarrito');
  
  //Función para mostrar el total de la compra
  async function mostrarTotalCompra() {
    const serviciosSeleccionados = obtenerServiciosSeleccionados();
    const total = calcularTotal(serviciosSeleccionados);
  
    const listaServiciosSeleccionados = serviciosSeleccionados.map(servicio => `${servicio.nombre} - $${servicio.precio.toFixed(2)}`).join('<br>');
  
    const result = await Swal.fire({
      title: `El total de tu compra es de: $${total.toFixed(2)}`,
      confirmButtonText: 'Aceptar',
      showCancelButton: true,
      html: `Servicios seleccionados:<br>${listaServiciosSeleccionados}`,
    });
  
    if (result.isConfirmed) {
      mostrarAlertaEmail();
    } else {
      console.log('El usuario canceló la acción.');
    }
  }
  
  //Función para obtener los servicios seleccionados
  function obtenerServiciosSeleccionados() {
    const filas = tablaServicios.rows;
    const serviciosSeleccionados = [];
  
    for (let i = 0; i < filas.length; i++) {
      const nombreServicio = filas[i].cells[1].textContent;
      const precioServicio = parseFloat(filas[i].cells[2].textContent.replace('$', ''));
      serviciosSeleccionados.push({ nombre: nombreServicio, precio: precioServicio });
    }
  
    return serviciosSeleccionados;
  }
  
  //Función para calcular el total de la compra
  function calcularTotal(servicios) {
    return servicios.reduce((acc, servicio) => acc + servicio.precio, 0);
  }
  
 //Función para mostrar una alerta para ingresar el nombre y correo electrónico
async function mostrarAlertaEmail() {
  const { value: formValues, isConfirmed } = await Swal.fire({
    title: 'Ingresa tus datos',
    html:
    '<input id="swal-input1" class="swal2-input" placeholder="Nombre y Apellido">' +
    '<input id="swal-input2" class="swal2-input" placeholder="Correo electrónico">',
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: 'Aceptar',
    cancelButtonText: 'Cancelar',
    preConfirm: () => {
      const nombre = document.getElementById('swal-input1').value;
      const email = document.getElementById('swal-input2').value;
      
      if (!nombre || !email) {
        Swal.showValidationMessage('Por favor, completa ambos campos.');
      }
      
      return [nombre, email];
    }
  });

  if (isConfirmed) {
    if (formValues) {
      const [nombre, email] = formValues;
      console.log(`Nombre y Apellido: ${nombre}`);
      console.log(`Correo electrónico: ${email}`);
      mostrarServiciosEnCarrito();
      mostrarConfirmacionFinal(nombre, email);
    } else {
      console.log('El usuario no ingresó datos.');
    }
  } else {
    console.log('El usuario canceló la acción.');
  }
}
  
  //Función para mostrar una confirmación de la interacción
  async function mostrarConfirmacionFinal(nombre, email) {
    await Swal.fire({
      title: `Gracias, ${nombre}!`,
      text: `Nos estaremos comunicando al correo electrónico ${email} para concluir la compra.`,
      confirmButtonText: 'Aceptar'
    });
  }
  
  botonAceptar.addEventListener('click', mostrarTotalCompra);
  
  //Función para mostrar los servicios en el carrito
  function mostrarServiciosEnCarrito() {
    const filas = tablaServicios.rows;
    const serviciosSeleccionados = [];
  
    for (let i = 0; i < filas.length; i++) {
      const nombreServicio = filas[i].cells[1].textContent;
      const precioServicio = parseFloat(filas[i].cells[2].textContent.replace('$', ''));
      serviciosSeleccionados.push({ nombre: nombreServicio, precio: precioServicio });
    }
  
    mostrarServiciosEnCarritoHTML(serviciosSeleccionados);
  }
  
  function mostrarServiciosEnCarritoHTML(servicios) {
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