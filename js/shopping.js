export function badgeUpdate() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const badge = document.getElementById("cart-count");

  if (badge) {
    badge.textContent = carrito.length;
  }
}

export function shoppingAddItem(newProduct) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const isItemInCart = carrito.find((item) => item.id === newProduct.id);

  if (isItemInCart) {
    isItemInCart.cantidad++;
  } else {
    newProduct.cantidad = 1;
    carrito.push(newProduct);
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  badgeUpdate();
}

export function displayCart() {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const container = document.querySelector("#cart-items-container");
  const summaryContainer = document.querySelector("#cart-summary");

  if (!container) return;

  if (carrito.length === 0) {
    container.innerHTML = `
        <p class="empty-cart-msg"> El carrito está vacío </p>
        `;
    summaryContainer.innerHTML = "";
    return;
  }

  let htmlContent = "";
  let totalPrice = 0;

  carrito.forEach((product) => {
    const subtotal = product.price * product.cantidad;
    totalPrice += subtotal;

    htmlContent += `
        <article class="cart-item">
            <div class="cart-item__img">
                <img src=".${product.image}" alt="${product.title}">
            </div>
            
            <div class="cart-item__info">
                <h3>${product.title}</h3>
                <p>Autor: ${product.author}</p>
                <p>Precio: ${product.price}</p>
            </div>

            <div class="cart-item-qty">
                <p>Cantidad: ${product.cantidad}</p>
            </div>

            <div class="cart-item__actions">
                <button class="btn-delete" data-id="${product.id}">
                Eliminar
                </button>
            </div>
        </article>
        `;
  });
  container.innerHTML = htmlContent;

  summaryContainer.innerHTML = `
  <div class="total-box">
    <h3>Total a pagar: $${totalPrice}</h3>
    <button class="btn-checkout">Finalizar Compra</button>
  </div>
  `;

  activateDeleteBtn(container);
}

function activateDeleteBtn(container) {
  container.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-delete")) {
      const deletedItemId = parseInt(e.target.dataset.id);
      let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

      // Me quedo con todos y saco el que quiero borrar.
      const nuevoCarrito = carrito.filter((item) => item.id !== deletedItemId);

      localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
      displayCart();
      badgeUpdate();
    }
  });
}
