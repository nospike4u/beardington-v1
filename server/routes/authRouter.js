const authController = require('../controllers/authController');

module.exports = (req, res, segments) => {
    const root = segments[0];
    if (req.method !== 'POST') return;

    if (root === 'signup') return authController.signup(req, res);
    if (root === 'login') return authController.login(req, res);
    if (root === 'logout') return authController.logout(req, res);
};