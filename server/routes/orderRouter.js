const orderController = require('../controllers/orderController');

const orderRouter = async (req, res, pathSegments) => {
    const { method } = req;
    res.setHeader('Content-Type', 'application/json');

    // POST /api/checkout
    if (pathSegments[0] === 'checkout' && method === 'POST') {
        return orderController.placeOrder(req, res);
    }

    // GET /api/orders/:id
    if (pathSegments[0] === 'orders' && pathSegments[1] && method === 'GET') {
        const orderId = parseInt(pathSegments[1], 10);
        return orderController.getOrder(req, res, orderId);
    }

    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Route not found' }));
};

module.exports = orderRouter;
