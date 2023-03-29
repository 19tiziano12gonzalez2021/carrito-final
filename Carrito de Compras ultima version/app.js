
// Obtener el carrito de compras de LocalStorage o crear uno nuevo
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Obtener los elementos HTML necesarios
const productsContainer = document.querySelector('.products');
const cartTable = document.querySelector('.cart table');
const totalElement = document.querySelector('.total');
let buyBtns = null;
// obtener el botón de vaciar carrito
const clearCartButton = document.getElementById('clear-cart-button');

// Seleccionamos el contenedor de productos en el DOM
const contenedorProductos = document.querySelector('.products');

// variable productos

// Definimos el array de productos
const productos = [
  {
    titulo: "chupetin simple",
    descripcion: "chupetin sin chicle (manzana, naranja, frutilla, cereza)",
    precio: 15
  },
  {
    titulo: "chupetin con chicle",
    descripcion: "chupetin con chicle (cereza, strewberry)",
    precio: 30
  },
  {
    titulo: "turron",
    descripcion: "turron con galleta (arcor)",
    precio: 40
  },
  {
    titulo: "alfajor tatin simple",
    descripcion: "alfajor pequeño de chocolate (blanco y negro)",
    precio: 50
  },
  {
    titulo: "alfajor guaymallen",
    descripcion: "algajor triple (blanco, negro, membrillo)",
    precio: 80
  },
  {
    titulo: "chocolate block",
    descripcion: "chocolate block chico (25gr)",
    precio: 120
  },
]



// Recorremos el array y creamos un elemento HTML para cada producto
function mostrarProductos(){
  productos.forEach(producto => {
    const divProducto = document.createElement('div');
    divProducto.classList.add('product');
    divProducto.innerHTML = `
      <h2>${producto.titulo}</h2>
      <p>${producto.descripcion}</p>
      <p>Precio: $${producto.precio.toFixed(2)}</p>
      <button class="buy-btn"  data-name="${producto.titulo}" data-price="${producto.precio}">Comprar</button>
    `;
    contenedorProductos.appendChild(divProducto);
    buyBtns = document.querySelectorAll('.buy-btn');
  });  
}


// Función para agregar un producto al carrito de compras
function addToCart(product) {
  // Buscar si el producto ya está en el carrito  
  const index = cart.findIndex(item => item.name === product.name); 

  if (index != -1) {
    // Si el producto ya está en el carrito, aumentar la cantidad
    cart[index].quantity++;
  } else {
    // Si el producto no está en el carrito, agregarlo
    cart.push({
      name: product.name,
      description: product.description,
      price: product.price,
      quantity: 1
    });
  }
    // Guardar el carrito de compras actualizado en LocalStorage
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Función para actualizar el carrito de compras en la página
function updateCart() {
  // Limpiar la tabla de carrito de compras
  cartTable.innerHTML = '<tr><th>ID</th><th>Producto</th><th>Cantidad</th><th>Precio</th><th>Total</th></tr>';

  // Calcular el total de la compra
  let total = 0;

  // Recorrer los productos en el carrito y agregarlos a la tabla
  cart.forEach(item => {
    const price = parseFloat(item.price);
    const quantity = item.quantity;
    const subTotal = price * quantity;
    total += subTotal;

    cartTable.innerHTML += `
      <tr>
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>${quantity}</td>
        <td>$${price.toFixed(2)}</td>
        <td>$${subTotal.toFixed(2)}</td>
      </tr>
    `;
  });

  // Actualizar el total en la página
  totalElement.innerHTML = `Total: $${total.toFixed(2)}`;
}

// función para vaciar el carrito
function clearCart() {
  // vaciar el array de productos en el carrito
  cart = [];

  // guardar el carrito vacío en localStorage
  localStorage.setItem('cart', JSON.stringify(cart));

  // actualizar la interfaz de usuario
  updateCart();
  updateCartTotal();
}

mostrarProductos()

buyBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const product = {
      name: btn.dataset.name,
      description: btn.dataset.description,
      price: btn.dataset.price
    };

    addToCart(product);
    updateCart();
  });
});

// agregar un listener de eventos al botón
clearCartButton.addEventListener('click', clearCart)

// Actualizar el carrito de compras al cargar la página
updateCart();

