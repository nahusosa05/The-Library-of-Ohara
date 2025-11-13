import { getProducts } from "./request.js";

document.addEventListener("DOMContentLoaded", async () => {
  const products = await getProducts();

  const productContainer = document.querySelector("#products-container");

  if (productContainer) {
    displayProducts(products, productContainer);
  } else {
    console.error("Error: No se encontró el div");
  }
});

function displayProducts(products, container) {
  let htmlString = "";

  products.forEach((product) => {
    const genresList = product.genres.join(", ");

    htmlString += `
        <article class="product-card">
            <div class="product-card__image-container">
                <img src="${product.image}" alt="Portada del libro ${product.title}">
            </div
            <h3 class="product-card__title">${product.title}</h3>
            <p class="product-card__author">${product.author}</p>
            <p class="product-card__genres">${genresList}</p>
            <p class="product-card__price">${product.price}</p>
            <button class="product-card__add-button" data-id="${product.id}">Añadir al carrito</button>
            </div>
        </article>
        `;
  });

  container.innerHTML = htmlString;
}
