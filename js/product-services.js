// URL de la API desplegada en Vercel
const apiUrl = "https://alura-geek-api-ebon.vercel.app/productos";

/**
 * Obtiene la lista de productos desde la API.
 * @returns {Promise<Array>} Lista de productos.
 */
const fetchProductList = async () => {
  try {
    const res = await fetch(apiUrl);
    console.log(res);
    return await res.json();
  } catch (err) {
    console.log(err);
    return [];
  }
};

/**
 * Crea un nuevo producto en la API.
 * @param {string} nombre - Nombre del producto.
 * @param {number} precio - Precio del producto.
 * @param {string} imagen - URL de la imagen del producto.
 * @returns {Promise<Object>} Producto creado.
 */
const createProduct = async (nombre, precio, imagen) => {
  try {
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre,
        precio,
        imagen,
      }),
    });
    // Después de crear el producto, recarga la página
    location.reload();
    return await res.json();
  } catch (err) {
    console.log(err);
    return null;
  }
};

/**
 * Elimina un producto por su ID.
 * @param {string} id - ID del producto a eliminar.
 * @returns {Promise<Object>} Resultado de la eliminación.
 */
const deleteProduct = async (id) => {
  try {
    const res = await fetch(`${apiUrl}/${id}`, {
      method: "DELETE",
    });
    return await res.json();
  } catch (err) {
    console.log(err);
    return null;
  }
};

// Exportamos las funciones
export const servicesProducts = {
  fetchProductList,
  createProduct,
  deleteProduct,
};
