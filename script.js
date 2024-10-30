// Selección de elementos del DOM
const productForm = document.getElementById("product-form");
const productList = document.getElementById("product-list");
const searchBar = document.getElementById("search-bar");
const totalProducts = document.getElementById("total-products");
const totalValue = document.getElementById("total-value");

let inventory = JSON.parse(localStorage.getItem("inventory")) || [];

// Actualizar el inventario en la interfaz y localStorage
function updateInventory() {
    productList.innerHTML = "";
    inventory.forEach((product, index) => {
        const productItem = document.createElement("li");
        productItem.classList.add("product-item");
        productItem.innerHTML = `
            <span>${product.name} - Cantidad: ${product.quantity} - Precio: $${product.price}</span>
            <button class="edit-btn" onclick="editProduct(${index})">Editar</button>
            <button class="delete-btn" onclick="deleteProduct(${index})">Eliminar</button>
        `;
        productList.appendChild(productItem);
    });
    updateSummary();
    localStorage.setItem("inventory", JSON.stringify(inventory));
}

// Actualizar el resumen de inventario
function updateSummary() {
    totalProducts.textContent = inventory.length;
    totalValue.textContent = inventory.reduce((acc, product) => acc + (product.quantity * product.price), 0).toFixed(2);
}

// Añadir producto
productForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const name = document.getElementById("product-name").value;
    const quantity = parseInt(document.getElementById("product-quantity").value);
    const price = parseFloat(document.getElementById("product-price").value);

    if (name && quantity > 0 && price > 0) {
        inventory.push({ name, quantity, price });
        updateInventory();
        productForm.reset();
    }
});

// Eliminar producto
function deleteProduct(index) {
    inventory.splice(index, 1);
    updateInventory();
}

// Editar producto
function editProduct(index) {
    const product = inventory[index];
    document.getElementById("product-name").value = product.name;
    document.getElementById("product-quantity").value = product.quantity;
    document.getElementById("product-price").value = product.price;

    // Temporizador para guardar cambios
    productForm.onsubmit = function(event) {
        event.preventDefault();
        inventory[index] = {
            name: document.getElementById("product-name").value,
            quantity: parseInt(document.getElementById("product-quantity").value),
            price: parseFloat(document.getElementById("product-price").value)
        };
        updateInventory();
        productForm.reset();
        productForm.onsubmit = addProduct; // Regresa el evento al original
    };
}

// Función de búsqueda en el inventario
searchBar.addEventListener("input", function(event) {
    const query = event.target.value.toLowerCase();
    productList.innerHTML = "";
    inventory
        .filter(product => product.name.toLowerCase().includes(query))
        .forEach((product, index) => {
            const productItem = document.createElement("li");
            productItem.classList.add("product-item");
            productItem.innerHTML = `
                <span>${product.name} - Cantidad: ${product.quantity} - Precio: $${product.price}</span>
                <button class="edit-btn" onclick="editProduct(${index})">Editar</button>
                <button class="delete-btn" onclick="deleteProduct(${index})">Eliminar</button>
            `;
            productList.appendChild(productItem);
        });
});

// Inicializar el inventario al cargar la página
updateInventory();
