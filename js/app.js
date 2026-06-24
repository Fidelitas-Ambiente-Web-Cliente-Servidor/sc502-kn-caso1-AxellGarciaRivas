const menu = [
    { nombre: 'Bruschetta Clásica', descripcion: 'Pan tostado con tomate y albahaca fresca', precio: 4500, categoria: 'Entrada', imagen: './img/bruschetta.jpg' },
    { nombre: 'Tabla de Quesos', descripcion: 'Selección de quesos importados con mermelada', precio: 7800, categoria: 'Entrada', imagen: './img/tabla-queso.jpg' },
    { nombre: 'Lomo al Vino Tinto', descripcion: 'Lomo de res en reducción de vino tinto', precio: 15500, categoria: 'Plato Fuerte', imagen: './img/lomo-al-vino.jpg' },
    { nombre: 'Pasta Carbonara', descripcion: 'Pasta con tocino, huevo y queso parmesano', precio: 10200, categoria: 'Plato Fuerte', imagen: './img/pasta-carbonara.jpg' },
    { nombre: 'Salmón a la Plancha', descripcion: 'Filete de salmón con vegetales al vapor', precio: 13800, categoria: 'Plato Fuerte', imagen: './img/salmon-plancha.jpg' },
    { nombre: 'Tiramisú', descripcion: 'Postre italiano con café y mascarpone', precio: 5200, categoria: 'Postre', imagen: './img/tiramisu.jpg' },
    { nombre: 'Cheesecake de Maracuyá', descripcion: 'Cheesecake cremoso con coulis de maracuyá', precio: 4800, categoria: 'Postre', imagen: './img/cheesecake-maracuya.jpg' },
];

const reservas = [];


function renderMenu(listaPlatos) {
    // Obtenemos el contenedor padre
    const gridPlatillo = document.getElementById('grid-platillo');

    gridPlatillo.innerHTML = '';

    listaPlatos.forEach(plato => {
        // Creamo la tarjeta principal o contenedor
        const columna = document.createElement('div');
        columna.className = 'col-12 col-md-6 col-lg-4 mb-4'; 

        const tarjeta = document.createElement('article');
        tarjeta.className = 'card h-100 card-plato p-3 shadow-sm';

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body d-flex flex-column justify-content-between h-100';

        const contenedorSuperior = document.createElement('div');

        // Insertamos la image
        const imagen = document.createElement('img');
        imagen.src = plato.imagen;
        imagen.alt = plato.nombre;
        
        imagen.className = 'img-fluid card-img-top rounded mb-3';
        imagen.style.height = '200px';
        imagen.style.objectFit = 'cover';

        const badge = document.createElement('span');
        badge.className = 'badge mb-2 bg-dark text-uppercase font-monospace d-inline-block';
        badge.style.fontSize = '0.75rem';
        badge.textContent = plato.categoria;

        // Nombre del plato
        const titulo = document.createElement('h5');
        titulo.className = 'card-title h5 mb-2 fw-bold text-dark';
        titulo.textContent = plato.nombre;

        // Descripcion del plato
        const descripcion = document.createElement('p');
        descripcion.className = 'card-text text-muted small mb-3';
        descripcion.textContent = plato.descripcion;

        // Contenedore de precio
        const contenedorPrecio = document.createElement('div');
        contenedorPrecio.className = 'd-flex justify-content-between align-items-center mt-auto pt-2 border-top';

        const precioTag = document.createElement('span');
        precioTag.className = 'precio-tag fw-bold fs-5 text-warning';
        precioTag.textContent = '₡' + plato.precio.toLocaleString();

        // Insertamos de adentro hacia fuera
        contenedorSuperior.appendChild(imagen);
        contenedorSuperior.appendChild(badge);
        contenedorSuperior.appendChild(titulo);
        contenedorSuperior.appendChild(descripcion);

        contenedorPrecio.appendChild(precioTag);

        cardBody.appendChild(contenedorSuperior);
        cardBody.appendChild(contenedorPrecio);

        tarjeta.appendChild(cardBody);

        columna.appendChild(tarjeta);

        gridPlatillo.appendChild(columna);
    });
}

function filtrarCategoria(categoria) {
    if (categoria === 'Todos') {
        
        renderMenu(menu);
    } else {
        // Usamos .filter() para crear una sublista con la categoría exacta
        const platosFiltrados = menu.filter(plato => plato.categoria === categoria);

        // Renderizamos la sublista filtrada
        renderMenu(platosFiltrados);
    }
}

function configurarFiltros() {
    const botones = document.querySelectorAll('.btn-filtro');

    botones.forEach(boton => {
        boton.addEventListener('click', (evento) => {
            // 1. Manejo visual de los botones activos
            botones.forEach(b => b.classList.remove('btn-activo'));
            evento.target.classList.add('btn-activo');

            // 2. Capturar el valor de 'data-categoria' del HTML
            const categoriaSeleccionada = evento.target.getAttribute('data-categoria');

            // 3. LLAMADA A TU FUNCIÓN OBLIGATORIA
            filtrarCategoria(categoriaSeleccionada);
        });
    });
}


const listaReservas = [];

function inicializarEventosFormulario() {
    const formulario = document.getElementById('form-reserva');
    const camposInputs = ['nombre', 'correo', 'fecha', 'personas'];

    // Aqui validamos si el usuario cambia o agrega algun dato
    camposInputs.forEach(id => {
        const inputElement = document.getElementById(id);
        if (inputElement) {
            inputElement.addEventListener('input', validarFormulario);
        }
    });

    // Evitamos que la ventana se refresque
    if (formulario) {
        formulario.addEventListener('submit', (evento) => {
            evento.preventDefault();

            // Validamos si regresa verdadero agregamos la reserva
            if (validarFormulario()) {
                agregarReserva();
            }
        });
    }
}

function validarFormulario() {
    let formularioValido = true;

    // Validamos el nombre 
    const nombreInput = document.getElementById('nombre');
    const nombreVal = nombreInput.value.trim();
    const errorNombre = document.getElementById('error-nombre');
    const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{5,}$/;

    
    const nombreCorrecto = regexNombre.test(nombreVal);
    if (!nombreCorrecto) formularioValido = false;

    // SOLO MUESTRA EL ERROR SI EL USUARIO YA ESCRIBIÓ ALGO
    if (nombreVal.length > 0 && !nombreCorrecto) {
        errorNombre.textContent = "El nombre debe contener al menos 5 letras (sin numeros ni simbolos).";
    } else {
        errorNombre.textContent = "";
    }

    // Validamos el correo
    const correoInput = document.getElementById('correo');
    const correoVal = correoInput.value.trim();
    const errorCorreo = document.getElementById('error-correo');
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const correoCorrecto = regexCorreo.test(correoVal);
    if (!correoCorrecto) formularioValido = false;

    if (correoVal.length > 0 && !correoCorrecto) {
        errorCorreo.textContent = "Introduce una dirección de correo válida (ejemplo@dominio.com).";
    } else {
        errorCorreo.textContent = "";
    }

    // Validamos fecha
    const fechaInput = document.getElementById('fecha');
    const errorFecha = document.getElementById('error-fecha');
    let fechaCorrecta = false;

    if (fechaInput.value) {
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);
        const fechaElegida = new Date(fechaInput.value + 'T00:00:00');

        if (fechaElegida >= hoy) {
            fechaCorrecta = true;
        }
    }

    if (!fechaCorrecta)  {
        formularioValido = false;
    }

    if (fechaInput.value && !fechaCorrecta) {
        errorFecha.textContent = "No se puede reservar en una fecha que ya pasó.";
    } else {
        errorFecha.textContent = "";
    }

    // Validamos la cantidad de personas
    const personasInput = document.getElementById('personas');
    const errorPersonas = document.getElementById('error-personas');
    const cantidadPax = parseInt(personasInput.value, 10);

    const personasCorrectas = (!isNaN(cantidadPax) && cantidadPax >= 1 && cantidadPax <= 20);
    if (!personasCorrectas) formularioValido = false;

    if (personasInput.value !== "" && !personasCorrectas) {
        errorPersonas.textContent = "La cantidad de comensales debe estar entre 1 y 20.";
    } else {
        errorPersonas.textContent = "";
    }

    // Si todo esta correcto habilitamos el boton de envio
    const btnSubmit = document.getElementById('btn-submit');
    if (btnSubmit) {
        btnSubmit.disabled = !formularioValido;
    }

    return formularioValido;
}

function agregarReserva() {
    // Traemos los valores de html
    const nombre = document.getElementById('nombre').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const fecha = document.getElementById('fecha').value;
    const hora = document.getElementById('hora').value;
    const personas = parseInt(document.getElementById('personas').value, 10);
    const comentarios = document.getElementById('comentarios').value.trim();

    // Guardar los datos en el arrego
    const nuevaReserva = { nombre, correo, fecha, hora, personas, comentarios };
    listaReservas.push(nuevaReserva);

    // Hacemos la insersion
    const tablaBody = document.getElementById('tabla-reservas-body');
    const fila = document.createElement('tr');
    fila.className = 'fila-reserva'; // Clase obligatoria del documento

    // Condición VIP: Resalta la fila si son grupos grandes (6 o más personas)
    if (personas >= 6) {
        fila.classList.add('vip-row');
    }

    // Estructurar las celdas
    fila.innerHTML = `
        <td class="p-3 fw-bold text-dark">${nombre}</td>
        <td class="p-3 text-muted small">${correo}</td>
        <td class="p-3">${fecha} a las ${hora}</td>
        <td class="p-3 text-center fw-bold">${personas}</td>
    `;

    // Adjuntar la fila armada al cuerpo de la tabla
    tablaBody.appendChild(fila);

    // Llamamos a la tercera función obligatoria para actualizar los totales
    actualizarResumen();

    // Limpiar el formulario y bloquear de nuevo el botón
    document.getElementById('form-reserva').reset();
    document.getElementById('btn-submit').disabled = true;
}

function actualizarResumen() {
    const totalReservas = listaReservas.length;

    // Suma de comensales acumulados
    const totalPersonas = listaReservas.reduce((acumulado, reserva) => acumulado + reserva.personas, 0);

    // Encontrar el grupo con mayor volumen de personas
    let clienteMayorText = "Ninguna";
    if (totalReservas > 0) {
        const reservaMayor = listaReservas.reduce((max, reserva) => reserva.personas > max.personas ? reserva : max, listaReservas[0]);
        clienteMayorText = `${reservaMayor.nombre} (${reservaMayor.personas} Personas)`;
    }

    // Inyectar los resultados en los ID del cuadro estadístico del HTML
    document.getElementById('resumen-total').textContent = totalReservas;
    document.getElementById('resumen-personas').textContent = totalPersonas;
    document.getElementById('resumen-mayor').textContent = clienteMayorText;
}


document.addEventListener('DOMContentLoaded', function () {
    renderMenu(menu);
    configurarFiltros();
    inicializarEventosFormulario();
});


document.getElementById('form-reserva').addEventListener('submit', function (e) {
    e.preventDefault(); // Evitar recarga de página

});
