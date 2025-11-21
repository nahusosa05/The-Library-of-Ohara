import { getProducts } from "./request.js";
import { badgeUpdate, shoppingAddItem, displayCart } from "./shopping.js";

document.addEventListener("DOMContentLoaded", async () => {
  badgeUpdate();
  const products = await getProducts();
  const productContainer = document.querySelector("#products-container");

  if (productContainer) {
    displayProducts(products, productContainer);

    productContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("product-card__add-button")) {
        const idLibro = parseInt(e.target.dataset.id);

        const libroEncontrado = products.find((book) => book.id === idLibro);

        if (libroEncontrado) {
          shoppingAddItem(libroEncontrado);
          console.log(`Se agregó al carrito: ${libroEncontrado.title}`);
        }
      }
    });
  } else {
    console.error("Error: No se encontró #products-container");
  }

  displayCart();
});

function displayProducts(products, container) {
  let htmlString = "";

  products.forEach((product) => {
    const genresList = product.genres.join(", ");

    htmlString += `
        <article class="product-card">
            <div class="product-card__image-container">
                <img src="${product.image}" alt="Portada del libro ${product.title}">
            </div>
            <div class="product-card__text-container">
            <h3 class="product-card__title">${product.title}</h3>
            <p class="product-card__author">${product.author}</p>
            <p class="product-card__genres">${genresList}</p>
            <p class="product-card__price">$${product.price}</p>
            <button class="product-card__add-button" data-id="${product.id}">Añadir al carrito</button>
            </div>
        </article>
        `;
  });

  container.innerHTML = htmlString;
}

function activeShoppingButton(listOfProducts) {
  const buttons = document.querySelectorAll(".product-card__add-button");
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const bookId = parseInt(e.target.dataset.id);
      const buyProduct = listOfProducts.find((item) => item.id === bookId);

      if (buyProduct) {
        shoppingAddItem(buyProduct);
        console.log(`Agregaste: ${productoAComprar.title}`);
      }
    });
  });
}
