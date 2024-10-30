// Mostrar sección activa
function showSection(sectionId) {
    const sections = document.querySelectorAll(".section");
    sections.forEach(section => {
        section.classList.add("hidden");
        if (section.id === sectionId) {
            section.classList.remove("hidden");
        }
    });
}

// Variables de almacenamiento
let inventory = JSON.parse(localStorage.getItem("inventory")) || [];
let sales = JSON.parse(localStorage.getItem("sales")) || [];
let purchases = JSON.parse(localStorage.getItem("purchases")) || [];
let clients = JSON.parse(localStorage.getItem("clients")) || [];

// Actualizar almacenamiento local y pantalla
function updateLocalStorage() {
    localStorage.setItem("inventory", JSON.stringify(inventory));
    localStorage.setItem("sales", JSON.stringify(sales));
    localStorage.setItem("purchases", JSON.stringify(purchases));
    localStorage.setItem("clients", JSON.stringify(clients));
    updateMetrics();
    displayInventory();
    displaySales();
    displayPurchases();
    displayClients();
}

// Agregar producto al inventario
document.getElementById("product-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("product-name").value;
    const quantity = parseInt(document.getElementById("product-quantity").value);
    const price = parseFloat(document.getElementById("product-price").value);

    if (name && quantity > 0 && price > 0) {
        inventory.push({ name, quantity, price });
        updateLocalStorage();
        document.getElementById("product-form").reset();
    }
});

// Registrar venta
document.getElementById("sales-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("sale-product-name").value;
    const quantity = parseInt(document.getElementById("sale-quantity").value);
    const paymentMethod = document.getElementById("payment-method").value;
    const currency = document.getElementById("currency").value;

    if (name && quantity > 0) {
        sales.push({ name, quantity, paymentMethod, currency });
        updateLocalStorage();
        document.getElementById("sales-form").reset();
    }
});

// Registrar compra
document.getElementById("purchase-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("purchase-product-name").value;
    const quantity = parseInt(document.getElementById("purchase-quantity").value);
    const price = parseFloat(document.getElementById("purchase-price").value);

    if (name && quantity > 0 && price > 0) {
        purchases.push({ name, quantity, price });
        updateLocalStorage();
        document.getElementById("purchase-form").reset();
    }
});

// Registrar cliente y deuda
document.getElementById("client-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("client-name").value;
    const debt = parseFloat(document.getElementById("client-debt").value);

    if (name && debt >= 0) {
        clients.push({ name, debt });
        updateLocalStorage();
        document.getElementById("client-form").reset();
    }
});

// Mostrar inventario
function displayInventory() {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";
    inventory.forEach((product, index) => {
        const productItem = document.createElement("li");
        productItem.textContent = `${product.name} - Cantidad: ${product.quantity} - Precio: $${product.price}`;
        productList.appendChild(productItem);
    });
}

// Mostrar ventas
function displaySales() {
    const salesList = document.getElementById("sales-list");
    salesList.innerHTML = "";
    sales.forEach((sale) => {
        const saleItem = document.createElement("li");
        saleItem.textContent = `${sale.name} - Cantidad: ${sale.quantity} - Pago: ${sale.paymentMethod} - Moneda: ${sale.currency}`;
        salesList.appendChild(saleItem);
    });
}

// Mostrar compras
function displayPurchases() {
    const purchaseList = document.getElementById("purchase-list");
    purchaseList.innerHTML = "";
    purchases.forEach((purchase) => {
        const purchaseItem = document.createElement("li");
        purchaseItem.textContent = `${purchase.name} - Cantidad: ${purchase.quantity} - Precio: $${purchase.price}`;
        purchaseList.appendChild(purchaseItem);
    });
}

// Mostrar clientes
function displayClients() {
    const clientList = document.getElementById("client-list");
    clientList.innerHTML = "";
    clients.forEach((client) => {
        const clientItem = document.createElement("li");
        clientItem.textContent = `${client.name} - Deuda: $${client.debt}`;
        clientList.appendChild(clientItem);
    });
}

// Actualizar métricas
function updateMetrics() {
    const totalSales = sales.reduce((total, sale) => total + sale.quantity, 0);
    const totalPurchases = purchases.reduce((total, purchase) => total + purchase.quantity * purchase.price, 0).toFixed(2);

    document.getElementById("total-sales").textContent = totalSales;
    document.getElementById("total-purchases").textContent = totalPurchases;
}

// Inicializar la aplicación
updateLocalStorage();
showSection('inventory');
