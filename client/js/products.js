console.log('Loaded product.js');
export const renderProducts = async () => {
    const app = document.getElementById('app');
    
    app.innerHTML = '<img src="client/assets/moustache-favicon-180x180.png" />';

    try {
 
        const response = await fetch('/api/products');
        const data = await response.json();

        const productListHTML = data.products.map(product => `
            <div class="product-card">
                <img src="${Array.isArray(product.imageUrls) ? product.imageUrls[0] : ''}" alt="${product.name}" width="150">
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <span class="price">$${(product.priceCents / 100).toFixed(2)}</span>
                <button class="add-btn" data-id="${product.id}">Add to Cart</button>
                <a href="/products/${product.slug}" data-link>View Details</a>
            </div>
        `).join('');

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