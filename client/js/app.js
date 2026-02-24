import { renderProducts } from "./products.js";
renderProducts();

document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("add-btn")) {
    const productId = e.target.dataset.id;

    const response = await fetch(`/api/cart/items/${productId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      alert("Added to beardington cart!");
    }
  }
});
