document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.navbar-burger');
    const menu = document.querySelector('.navbar-menu');

    burger.addEventListener('click', () => {
        // Toggle la clase 'is-active' en el menú y el botón hamburguesa
        burger.classList.toggle('is-active');
        menu.classList.toggle('is-active');
    });
});


document.addEventListener('DOMContentLoaded', function () {
    cargarCarrito();
});

// Simular productos con stock inicial


var productosDisponibles = [
    { id: '1', nombre: 'Correadentada VW Suran 2014', precio:35000, stock: 15, descripcion: 'Correa dentada para VW Suran 2014, alta calidad y resistencia.' },
    { id: '2', nombre: 'Correadentada VW Gol Trend 2014-2018', precio: 32500, stock: 23, descripcion: 'Correa dentada para VW Gol Trend 2014-2018.' },
    { id: '3', nombre: 'Correa dentada POLO 2022', precio: 42000, stock: 29, descripcion: 'Correa dentada para VW Polo 2022.' },
    { id: '4', nombre: 'Correa dentada Renault Logan 2016', precio: 55000, stock: 17, descripcion: 'Correa dentada para Renault Logan 2016.' },
    { id: '5', nombre: 'Correa dentada Renault Duster 2016', precio: 52000, stock: 27, descripcion: 'Correa dentada para Renault Duster 2016.' },
    { id: '6', nombre: 'Correa dentada Renault Logan 2022', precio: 57000, stock: 12, descripcion: 'Correa dentada para Renault Logan 2022.' },
];


var botonesAgregar = document.getElementsByClassName('agregar-carrito');
for (var i = 0; i < botonesAgregar.length; i++) {
    botonesAgregar[i].addEventListener('click', agregarProducto);
}

// Vaciar carrito
document.getElementById('vaciar-carrito').addEventListener('click', function () {
    localStorage.removeItem('carrito');
    cargarCarrito();
});

function agregarProducto(event) {
    var productoId = event.target.getAttribute('data-id');
    var carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Encontrar el producto en la lista de productos disponibles
    var producto = productosDisponibles.find((prod) => prod.id === productoId);

    if (producto.stock > 0) {
        // Verificar si el producto ya está en el carrito
        var productoEnCarrito = carrito.find((prod) => prod.id === productoId);
        if (productoEnCarrito) {
            productoEnCarrito.cantidad++;
        } else {
            carrito.push({ id: producto.id, nombre: producto.nombre, precio: producto.precio, cantidad: 1 });
        }

        // Reducir el stock del producto
        producto.stock--;

        // Guardar el carrito actualizado
        localStorage.setItem('carrito', JSON.stringify(carrito));
        cargarCarrito();
    } else {
        alert('Sin stock disponible para ' + producto.nombre);
    }
}

function cargarCarrito() {
    var listaCarrito = document.getElementById('lista-carrito');
    var totalCarrito = document.getElementById('total-carrito');
    listaCarrito.innerHTML = '';

    var carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    var total = 0;

    carrito.forEach((producto, index) => {
        var productoStock = productosDisponibles.find((prod) => prod.id === producto.id);

        var li = document.createElement('li');
        li.innerHTML = `
            ${producto.nombre} - $${producto.precio} x ${producto.cantidad} = $${(producto.precio * producto.cantidad).toFixed(2)}
            <button class="btn btn-outline-danger btn-sm btn-menos" data-index="${index}">-</button>
            <button class="btn btn-outline-success btn-sm btn-mas" data-index="${index}" ${
                productoStock.stock === 0 ? 'disabled' : ''
            }>+</button>
            <span class="text-muted">(Stock: ${productoStock.stock})</span>
        `;

        listaCarrito.appendChild(li);
        total += producto.precio * producto.cantidad;
    });

    totalCarrito.textContent = `Total: $${total.toFixed(2)}`;

    // Agregar eventos a los botones + y -
    var botonesMas = document.getElementsByClassName('btn-mas');
    var botonesMenos = document.getElementsByClassName('btn-menos');

    for (var i = 0; i < botonesMas.length; i++) {
        botonesMas[i].addEventListener('click', incrementarCantidad);
        botonesMenos[i].addEventListener('click', decrementarCantidad);
    }
}

function incrementarCantidad(event) {
    var index = event.target.getAttribute('data-index');
    var carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    var productoId = carrito[index].id;

    // Encontrar el producto en la lista de productos disponibles
    var productoStock = productosDisponibles.find((prod) => prod.id === productoId);

    if (productoStock.stock > 0) {
        carrito[index].cantidad++;
        productoStock.stock--;
        localStorage.setItem('carrito', JSON.stringify(carrito));
        cargarCarrito();
    } else {
        alert('Sin stock disponible para ' + productoStock.nombre);
    }
}

function decrementarCantidad(event) {
    var index = event.target.getAttribute('data-index');
    var carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    var productoId = carrito[index].id;

    // Encontrar el producto en la lista de productos disponibles
    var productoStock = productosDisponibles.find((prod) => prod.id === productoId);

    if (carrito[index].cantidad > 1) {
        carrito[index].cantidad--;
        productoStock.stock++;
    } else {
        carrito.splice(index, 1); // Elimina el producto si la cantidad llega a 0
        productoStock.stock++;
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    cargarCarrito();
}

// Generar dinámicamente los productos en la página

function cargarProductos() {
    var listaProductos = document.getElementById('lista-productos');
    listaProductos.innerHTML = ''; // Limpiar la lista actual

    productosDisponibles.forEach((producto) => {
        // Crear una card para cada producto
        var card = document.createElement('div');
        card.classList.add('col-12', 'col-sm-6', 'col-md-4', 'mb-4');

        card.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">Precio: $${producto.precio}</p>
                    <p class="card-text">Stock: ${producto.stock}</p>
                    
                    <!-- Botón para agregar al carrito -->
                    <button class="agregar-carrito btn btn-primary" 
                            data-id="${producto.id}" 
                            data-nombre="${producto.nombre}" 
                            data-precio="${producto.precio}">
                        Agregar al Carrito
                    </button>

                    <!-- Botón para ver la descripción -->
                    <button class="ver-descripcion btn btn-info btn-sm mt-2" 
                            data-id="${producto.id}">
                        Ver Descripción
                    </button>

                    <!-- Descripción del producto -->
                    <div class="descripcion mt-2" id="descripcion-${producto.id}" style="display: none;">
                        <p>${producto.descripcion}</p>
                    </div>
                </div>
            </div>
        `;

        // Agregar la card al contenedor
        listaProductos.appendChild(card);

        // Asignar eventos a los botones
        var botonDescripcion = card.querySelector('.ver-descripcion');
        botonDescripcion.addEventListener('click', mostrarDescripcion);
    });

    // Asignar eventos a los botones de agregar al carrito
    var botonesAgregar = document.getElementsByClassName('agregar-carrito');
    for (var i = 0; i < botonesAgregar.length; i++) {
        botonesAgregar[i].addEventListener('click', agregarProducto);
    }
}


// Llamar a la función para cargar los productos al iniciar la página
document.addEventListener('DOMContentLoaded', function () {
    cargarProductos(); // Generar productos al cargar la página
});

// Función para mostrar productos en la consola
function mostrarProductosEnConsola() {
    console.log("Lista de productos disponibles:");
    console.log("-------------------------------");
    
    productosDisponibles.forEach((producto, index) => {
        console.log(
            `${index + 1}. ${producto.nombre} - Precio: $${producto.precio} - Stock: ${producto.stock}`
        );
    });
    
    console.log("-------------------------------");
}

function mostrarDescripcion(event) {
    var productoId = event.target.getAttribute('data-id');
    var descripcion = document.getElementById('descripcion-' + productoId);

    if (descripcion.style.display === 'none') {
        descripcion.style.display = 'block';
        descripcion.style.transition = 'opacity 0.5s ease';
        descripcion.style.opacity = 1;
    } else {
        descripcion.style.opacity = 0;
        setTimeout(() => {
            descripcion.style.display = 'none';
        }, 500);
    }
}

// Llamar a la función para mostrar los productos
mostrarProductosEnConsola();


