const userController = require("./controllers/userController");

const userRouter = async (req, res) => {
  const { method, url } = req;
  const pathSegments = url.split("?")[0].split("/").filter(Boolean);

  res.setHeader("Content-Type", "application/json");
  try {
    if (pathSegments.includes("users") && method === "POST") {
      return userController.registerUser(req, res);
    }
  } catch (error) {
    console.error("User Router Error:", error);
    res.writeHead(500);
    res.end(JSON.stringify({ error: "Internal Server Error" }));
  }
};

module.exports = userRouter;
