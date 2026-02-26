
const cartController = require('../controllers/cartController');

const cartRouter = async (req, res, pathSegments) => {
	// pathSegments: ["cart", ...]
	const method = req.method;
	// e.g. /cart/items/:productId
	if (pathSegments[1] === 'items') {
		const productId = parseInt(pathSegments[2], 10);
		// Add to cart
		if (method === 'POST') {
			return cartController.addToCart(req, res, productId);
		}
		// Update cart item quantity
		if (method === 'PUT') {
			// You may want to get userId from session/cookie or body
			const userId = req.body?.userId || 1; // fallback for now
			return cartController.updateCartItem(req, res, userId, productId);
		}
		// Remove from cart
		if (method === 'DELETE') {
			const userId = req.body?.userId || 1;
			return cartController.removeFromCart(req, res, productId, userId);
		}
	}
	// Get cart for user
	if (method === 'GET') {
		// e.g. /cart/:userId
		const userId = pathSegments[1] || 1; // fallback userId
		return cartController.getCart(req, res, userId);
	}
	res.writeHead(404);
	res.end(JSON.stringify({ error: 'Cart route not found' }));
};

module.exports = cartRouter;