const productRouter = require('./routes/productRouter');
// const cartRouter = require('./routes/cartRouter');
const orderRouter = require('./routes/orderRouter');
const authRouter = require('./routes/authRouter');

const router = async (req, res) => {
    const [path] = req.url.split('?');
    const pathSegments = path.split('/').filter(Boolean);

    if (pathSegments[0] === 'api') pathSegments.shift();
    const root = pathSegments[0];
    res.setHeader('Content-Type', 'application/json');

    switch (root) {
        case 'products':
            return productRouter(req, res, pathSegments);
        // case 'cart':
        //     return cartRouter(req, res, pathSegments);
        case 'orders':
        case 'checkout':
            return orderRouter(req, res, pathSegments);
        case 'signup':
        case 'login':
        case 'logout':
            return authRouter(req, res, pathSegments);
        default:
            res.writeHead(404);
            res.end(JSON.stringify({ error: "Route not found" }));
    }
};

module.exports = router;