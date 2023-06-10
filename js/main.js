let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// FUNCIÓN PARA MOSTRAR LOS PRODUCTOS
const mostrarProductos = (productos) => {
  const contenedorProductos = document.querySelector(".product-list");

  contenedorProductos.innerHTML = "";
  // Recorro el array y por cada uno creo una card para mostrar en pantalla
  productos.forEach((producto) => {
    const li = document.createElement("li");
    li.innerHTML = `
    <img src="${producto.imagen}" alt="${producto.nombre}" />
    <h3>${producto.nombre}</h3>
    <p class="product-description">${producto.descripcion}</p>
    <p class="product-price">$${producto.precio}</p>
    <button id="agregar-${producto.id}" class="add-to-cart">Agregar al carrito</button>
    `;

    contenedorProductos.appendChild(li);
    const boton = document.getElementById(`agregar-${producto.id}`);
    boton.addEventListener("click", () => {
      agregarAlCarrito(producto.id);
    });
  });
};

const agregarAlCarrito = (id) => {
  if (!carrito.some((producto) => producto.id === id)) {
    // Buscamos el producto en el array de productos
    const producto = productos.find((producto) => producto.id === id);
    carrito.push({ ...producto, cantidad: 1 });
  } else {
    const producto = carrito.find((producto) => producto.id === id);
    producto.cantidad++;
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));

  mostrarCarrito();
};

const mostrarCarrito = () => {
  const contenedorCarrito = document.querySelector(".carrito");
  contenedorCarrito.innerHTML = "";
  if (carrito.length > 0) {
    const productsCart = document.createElement("ul");
    productsCart.classList.add("productsCart");
    contenedorCarrito.appendChild(productsCart);
    const contenedorTotal = document.createElement("p");
    actualizarTotal(contenedorTotal);
    contenedorCarrito.appendChild(contenedorTotal);

    carrito.forEach((producto) => {
      const li = document.createElement("li");
      li.innerHTML = `
			<img src="${producto.imagen}" alt="${producto.nombre}" />
			<div class="productContent">
				<h3>${producto.nombre}</h3>
				<p class="product-description">${producto.descripcion}</p>
				<p class="product-price">$${producto.precio}</p>
				<p class="product-price">${producto.cantidad}u.</p>
			</div>
			<button id="eliminar-${producto.id}" class="remove">Eliminar</button>
		`;
      // Agrego la card al contenedor
      productsCart.appendChild(li);

      const boton = document.getElementById(`eliminar-${producto.id}`);

      boton.addEventListener("click", () => {
        eliminarProducto(producto.id);
      });
    });
  } else {
    contenedorCarrito.innerHTML = '<p class="empty">No hay productos</p>';
  }
};

const eliminarProducto = (id) => {
  carrito = carrito.filter((producto) => producto.id !== id);

  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
};

const actualizarTotal = (contenedor) => {
  const total = carrito.reduce(
    (acumulador, producto) => acumulador + producto.precio * producto.cantidad,
    0
  );
  contenedor.textContent = `Total: $${total}`;
};

mostrarProductos(productos);
mostrarCarrito();
