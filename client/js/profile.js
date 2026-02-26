export const renderProfile = async () => {
  const app = document.getElementById("app");
  app.innerHTML = "<p>Loading profile...</p>";
  try {
    const response = await fetch(`/api/users/${userId}`);
    const userData = await response.json();
    updateProfile(userData);
  } catch (error) {
    app.innerHTML = `<p class="error">Failed to load profile: ${error.message}</p>`;
  }
};

const CartItemTemplate = (item) => {
  // image_urls is already an array after server enrichment
  const firstUrl =
    Array.isArray(item.image_urls) && item.image_urls.length > 0
      ? item.image_urls[0]
      : "/assets/placeholder-product-image.png";

  return `
    <div class="cart-item" data-id="${item.id}">
      <img src="${firstUrl}" alt="${item.name}" width="100">
      <div class="item-info">
        <h2>${item.name}</h2>
        <span class="price">$${(item.price_cents / 100).toFixed(2)}</span>
        <div class="quantity-controls">
          <button class="qty-btn" data-action="decrease">-</button>
          <span class="qty">${item.quantity}</span>
          <button class="qty-btn" data-action="increase">+</button>
        </div>
      </div>
      <button class="delete-btn">Remove</button>
    </div>
  `;
};

const updateCart = (cartData) => {
  const app = document.getElementById("app");

  if (!cartData.items || cartData.items.length === 0) {
    app.innerHTML = `
      <section class="cart-section">
        <h1>Your Cart</h1>
        <p>Your beardington cart is empty!</p>
      </section>`;
    return;
  }

  const itemsHTML = cartData.items.map(CartItemTemplate).join("");
  const subtotalHTML = `
    <div class="cart-total">
      <h3>Subtotal: $${(cartData.subtotalCents / 100).toFixed(2)}</h3>
      <button id="checkout-btn">Proceed to Checkout</button>
    </div>`;

  app.innerHTML = `
    <section class="cart-section">
      <h1>Your Cart</h1>
      <div id="cart-container">${itemsHTML}${subtotalHTML}</div>
    </section>`;

  document.getElementById("cart-container").addEventListener("click", async (e) => {
    const cartItem = e.target.closest(".cart-item");

    if (e.target.classList.contains("delete-btn") && cartItem) {
      const productId = parseInt(cartItem.dataset.id, 10);
      const response = await fetch(`/api/cart/items/${productId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) updateCart(await response.json());
    }

    if (e.target.classList.contains("qty-btn") && cartItem) {
      const productId = parseInt(cartItem.dataset.id, 10);
      const currentQty = parseInt(cartItem.querySelector(".qty").textContent, 10);
      const newQty =
        e.target.dataset.action === "increase" ? currentQty + 1 : currentQty - 1;
      const response = await fetch(`/api/cart/items/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: newQty }),
      });
      if (response.ok) updateCart(await response.json());
    }
  });
};
