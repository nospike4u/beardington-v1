const userController = require("./controllers/userController");

const userRouter = async (req, res) => {
  res.setHeader("Content-Type", "application/json");

  if (pathSegments[0] === "users" && method === "POST") {
    return userController.registerUser(req, res);
  }
};

module.exports = userRouter;
