import { servicesProducts } from "./product-services.js";
// Modal de confirmación
const confirmationModal = document.getElementById("confirmationModal");
const confirmDeleteButton = document.getElementById("confirmDelete");
const cancelDeleteButton = document.getElementById("cancelDelete");
const closeButton = document.querySelector(".close-button");
let productToDelete = null; // Variable para almacenar el producto a eliminar

// Cierra el modal
function closeModal() {
    confirmationModal.style.display = "none";
    productToDelete = null;
}

// Muestra el modal
function openModal(product) {
    confirmationModal.style.display = "block";
    productToDelete = product;
}

// Eventos del modal
confirmDeleteButton.addEventListener("click", () => {
    if (productToDelete) {
        servicesProducts.deleteProduct(productToDelete.id)
            .then(() => {
                productToDelete.card.remove(); // Elimina la tarjeta del DOM
                closeModal();
            })
            .catch(err => console.log(err));
    }
});

cancelDeleteButton.addEventListener("click", closeModal);
closeButton.addEventListener("click", closeModal);
window.addEventListener("click", (event) => {
    if (event.target === confirmationModal) {
        closeModal();
    }
});

export const confirmation = {
    openModal
}