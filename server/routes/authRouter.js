const authController = require('../controllers/authController');

const authRouter = async (req, res, pathSegments) => {
    const root = pathSegments[0];
    if (req.method !== 'POST') return;

    if (root === 'signup') return authController.signup(req, res);
    if (root === 'login') return authController.login(req, res);
    if (root === 'logout') return authController.logout(req, res);
};

module.exports = authRouter;