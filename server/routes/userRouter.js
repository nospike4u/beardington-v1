const userController = require("../controllers/userController");

const userRouter = async (req, res, pathSegments) => {
  const method = req.method;
  // pathSegments: ["users", ":userId"]
  if (method === "POST" && pathSegments[0] === "users") {
    return userController.registerUser(req, res);
  }
  if (method === "GET" && pathSegments[0] === "users" && pathSegments[1]) {
    const userId = parseInt(pathSegments[1], 10);
    return userController.getUserById(req, res, userId);
  }
  res.writeHead(404);
  res.end(JSON.stringify({ error: "User route not found" }));
};

module.exports = userRouter;