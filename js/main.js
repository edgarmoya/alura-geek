import { servicesProducts } from "./product-services.js";
import { confirmation } from "./confirmation.js";
// Obtener los contenedores de datos
const productContainer = document.querySelector("[product-list]"); // Contenedor de los productos
const form = document.querySelector("[data-form]"); // Formulario para agregar nuevos productos

// Crear la tarjeta para el producto
function createCard(nombre, precio, imagen, id) {
  const card = document.createElement("div"); // Crea el contenedor del producto
  card.classList.add("product"); // Añade la clase 'product' al contenedor

  card.innerHTML = `
      <div class="card">
        <div class="product__image__container">
            <img class="product__image__container__image" src="${imagen}" alt="${nombre}">
        </div>
        <div class="product__detail">
              <h3>${nombre}</h3>
              <h4>$ ${precio} USD</h4>
        </div>
        <div class="trash-button">
            <i class="fa-solid fa-xmark"></i>
        </div>
      </div>    
    `;

  // Añadir evento para eliminar producto
  const deleteButton = card.querySelector(".trash-button");
  deleteButton.addEventListener("click", () => {
    confirmation.openModal({ card, id });
  });

  productContainer.appendChild(card); // Añade la tarjeta al contenedor de productos
  return card;
}

//Lista los productos en la pagina
const render = async () => {
  try {
    const listProducts = await servicesProducts.fetchProductList();
    listProducts.forEach((productos) => {
      productContainer.appendChild(
        createCard(
          productos.nombre,
          productos.precio,
          productos.imagen,
          productos.id
        )
      );
    });
  } catch (error) {
    console.log(error);
  }
};

//Añadimos el evendo de enviar datos de un nuevo producto
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.querySelector("[data-name]").value;
  const price = document.querySelector("[data-price]").value;
  const image = document.querySelector("[data-image]").value;

  servicesProducts
    .createProduct(name, price, image)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.log(err));
});

render();
