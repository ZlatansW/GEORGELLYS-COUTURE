const cartCount = document.getElementById("cart-count");
const cartButtons = document.querySelectorAll(".cart-btn");
const cartIcon = document.getElementById("cart-icon");
const cartDropdown = document.getElementById("cart-dropdown");
const cartItemsList = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const clearCartBtn = document.getElementById("clear-cart");

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let count = cart.length;
let total = cart.reduce((sum, item) => sum + item.price, 0);

// Initialize cart display
cartCount.textContent = count;
renderCart();

// Toggle dropdown
cartIcon.addEventListener("click", () => {
  cartDropdown.classList.toggle("hidden");
});

// Add to cart
cartButtons.forEach(button => {
  button.addEventListener("click", () => {
    const productCard = button.closest(".product-card");
    const productName = productCard.querySelector("h3").textContent;
    const productPrice = productCard.querySelector("p").textContent.replace("$", "");
    const price = parseFloat(productPrice);

    cart.push({ name: productName, price: price });
    count++;
    total += price;

    localStorage.setItem("cart", JSON.stringify(cart));

    cartCount.textContent = count;
    renderCart();
  });
});

// Clear cart
clearCartBtn.addEventListener("click", () => {
  cart = [];
  count = 0;
  total = 0;

  localStorage.removeItem("cart");

  cartCount.textContent = count;
  renderCart();
});

// Render cart items
function renderCart() {
  cartItemsList.innerHTML = "";
  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartItemsList.appendChild(li);
  });
  cartTotal.textContent = `Total: $${total}`;
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const errorMsg = document.getElementById("form-error");

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // prevent default submission

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // Validation rules
    if (name.length < 2) {
      errorMsg.textContent = "Name must be at least 2 characters.";
      errorMsg.style.display = "block";
      return;
    }

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.match(emailPattern)) {
      errorMsg.textContent = "Please enter a valid email address.";
      errorMsg.style.display = "block";
      return;
    }

    if (message.length < 10) {
      errorMsg.textContent = "Message must be at least 10 characters.";
      errorMsg.style.display = "block";
      return;
    }

    // If all checks pass
    errorMsg.style.display = "none";
    alert("Form submitted successfully!");
    form.reset();
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const greetingDiv = document.getElementById("greeting");

  // Get current date and time
  const now = new Date();
  const hours = now.getHours();

  // Decide greeting based on time
  let greeting;
  if (hours < 12) {
    greeting = "Good Morning";
  } else if (hours < 18) {
    greeting = "Good Afternoon";
  } else {
    greeting = "Good Evening";
  }

  // Format today's date
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const today = now.toLocaleDateString(undefined, options);

  // Display greeting + date
  greetingDiv.textContent = `${greeting}, today is ${today}`;
});

// Theme toggle
const themeToggle = document.getElementById("theme-toggle");

// Check saved preference
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  themeToggle.textContent = "☀️ Light Mode";
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    themeToggle.textContent = "☀️ Light Mode";
    localStorage.setItem("theme", "dark");
  } else {
    themeToggle.textContent = "🌙 Dark Mode";
    localStorage.setItem("theme", "light");
  }
});
