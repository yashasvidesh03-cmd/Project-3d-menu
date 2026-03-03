const menuContainer = document.getElementById("menuContainer");
const categoryFilter = document.getElementById("categoryFilter");
const cartCount = document.getElementById("cart-count");

let cart = 0;
let menuData = [];

fetch("menu.json")
  .then(res => res.json())
  .then(data => {
      menuData = data;
      renderMenu(data);
      loadCategories(data);
  });

function renderMenu(data) {
    menuContainer.innerHTML = "";
    data.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p class="price">₹${item.price}</p>
            <button onclick="addToCart()">Add to Cart</button>
        `;
        menuContainer.appendChild(card);
    });
}

function loadCategories(data) {
    const categories = [...new Set(data.map(item => item.category))];
    categories.forEach(cat => {
        const option = document.createElement("option");
        option.value = cat;
        option.textContent = cat;
        categoryFilter.appendChild(option);
    });
}

categoryFilter.addEventListener("change", () => {
    if (categoryFilter.value === "all") {
        renderMenu(menuData);
    } else {
        const filtered = menuData.filter(item => item.category === categoryFilter.value);
        renderMenu(filtered);
    }
});

function addToCart() {
    cart++;
    cartCount.textContent = cart;
}

// Generate QR Code
new QRCode(document.getElementById("qrcode"), {
    text: window.location.href,
    width: 200,
    height: 200
});
