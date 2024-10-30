// Selección de elementos del DOM
const productForm = document.getElementById("product-form");
const productList = document.getElementById("product-list");

// Escuchar el evento de envío del formulario para agregar productos
productForm.addEventListener("submit", function(event) {
    event.preventDefault();

    // Obtener valores de los campos de entrada
    const name = document.getElementById("product-name").value;
    const quantity = document.getElementById("product-quantity").value;
    const price = document.getElementById("product-price").value;

    // Crear un nuevo elemento de producto
    const productItem = document.createElement("li");
    productItem.classList.add("product-item");
    productItem.innerHTML = `
        <span>${name} - Cantidad: ${quantity} - Precio: $${price}</span>
        <button class="delete-btn">Eliminar</button>
    `;

    // Añadir el producto a la lista de inventario
    productList.appendChild(productItem);

    // Limpiar los campos del formulario
    productForm.reset();

    // Agregar funcionalidad para eliminar el producto
    const deleteButton = productItem.querySelector(".delete-btn");
    deleteButton.addEventListener("click", function() {
        productList.removeChild(productItem);
    });
});
