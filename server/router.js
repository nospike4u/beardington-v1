const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./routes/authRoutes');

const router = async (req, res) => {
    const [path] = req.url.split('?');
    const pathSegments = path.split('/').filter(Boolean);
    
    if (pathSegments[0] === 'api') pathSegments.shift();
    
    const root = pathSegments[0];
    res.setHeader('Content-Type', 'application/json');

    switch (root) {
        case 'products':
            return productRoutes(req, res, pathSegments);
        case 'cart':
            return cartRoutes(req, res, pathSegments);
        case 'orders':
        case 'checkout':
            return orderRoutes(req, res, pathSegments);
        case 'signup':
        case 'login':
        case 'logout':
            return authRoutes(req, res, pathSegments);
        default:
            res.writeHead(404);
            res.end(JSON.stringify({ error: "Route not found" }));
    }
};

module.exports = router;