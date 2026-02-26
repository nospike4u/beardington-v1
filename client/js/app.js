import { renderProducts } from "./products.js";
import { renderCart } from "./cart.js";

const appRouter = () => {
  if (location.pathname === "/cart") {
    renderCart();
  } else {
    renderProducts();
  }
};

document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("add-btn")) {
    const productId = e.target.dataset.id;
    const response = await fetch(`/api/cart/items/${productId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: 1 }),
    });
    if (response.ok) {
      alert("Added to beardington cart!");
    }
  }
});

document.addEventListener("navigate", appRouter);
appRouter();
