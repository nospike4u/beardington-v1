const productController = require('../controllers/productController');

const productRouter = async (req, res, segments) => {
    const method = req.method;
    const slug = segments[1];

    if (method === 'GET' && !slug) return productController.getAll(req, res);
    if (method === 'GET' && slug) return productController.getBySlug(req, res, slug);
};

module.exports = productRouter;