// Obtener los elementos HTML necesarios
const productsContainer = document.querySelector('.products');
const cartTable = document.querySelector('.cart table');
const totalElement = document.querySelector('.total');
const buyBtns = document.querySelectorAll('.buy-btn');

// Obtener el carrito de compras de LocalStorage o crear uno nuevo
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Función para agregar un producto al carrito de compras
function addToCart(product) {
  // Buscar si el producto ya está en el carrito
  const index = cart.findIndex(item => item.name === product.name);
  
  if (index !== -1) {
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
  cartTable.innerHTML = '<tr><th>Producto</th><th>Cantidad</th><th>Precio</th><th>Total</th></tr>';
  
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

// Agregar un event listener para cada botón de compra
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
{
// Actualizar el carrito de compras al cargar la página
updateCart();

// obtener el botón de vaciar carrito
const clearCartButton = document.getElementById('clear-cart-button');

// agregar un listener de eventos al botón
clearCartButton.addEventListener('click', clearCart);

// función para vaciar el carrito
function clearCart() {
  // vaciar el array de productos en el carrito
  cart = [];

  // guardar el carrito vacío en localStorage
  localStorage.setItem('cart', JSON.stringify(cart));

  // actualizar la interfaz de usuario
  showCartItems();
  updateCartTotal();
} }
