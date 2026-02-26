console.log("Loaded product.js");
export const renderProducts = async () => {
  const app = document.getElementById("app");

  app.innerHTML = '<img src="client/assets/moustache-favicon-180x180.png" />';

  try {
    const response = await fetch("/api/products");
    const data = await response.json();

    const productListHTML = data.products
      .map((product) => {
        let firstUrl = "";
        try {
          const urls = JSON.parse(product.image_urls);
          if (Array.isArray(urls) && urls.length > 0) {
            firstUrl = urls[0];
          }
        } catch (e) {
          console.log(e.message, "Error. Image not found.");
        }
        return `
            <div class="product-card">
                <img src="${firstUrl}" alt="${product.name}" width="150">
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <span class="price">$${(product.price_cents / 100).toFixed(2)}</span>
                <div class="add-btn-container">
                <button class="add-btn" data-id="${product.id}">Add to Cart</button>
                </div>
                <div class="view-details-container">
                <a href="/products/${product.slug}" data-link>View Details</a>
                </div>
            </div>
        `;
      })
      .join("");

    app.innerHTML = `
            <section class="products-grid">
                <h1>Store</h1>
                <div class="grid">${productListHTML}</div>
            </section>
        `;
  } catch (error) {
    app.innerHTML = `<p class="error">Failed to load products: ${error.message}</p>`;
  }
};
