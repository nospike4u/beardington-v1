// const orderController = require("./controllers/orderController");

// const orderRouter = async (req, res) => {

//     const { method, url } = req;
//     const [path, query] = url.split('?');
//     const pathSegments = path.split('/').filter(Boolean);

//     res.setHeader('Content-Type', 'application/json');

//     if (pathSegments[0] === 'orders' && !pathSegments[1] && method === 'GET') {
//         return orderController.checkout(req, res);
//     }

//     if (pathSegments[0] === 'orders' && pathSegments[1] && method === 'GET') {
//         const id = pathSegments[1];
//         return productController.getProductById(req, res, id);
//     }

//     res.writeHead(404);
//     res.end(JSON.stringify({ message: "Route not found" }));
// };

// module.exports = orderRouter;