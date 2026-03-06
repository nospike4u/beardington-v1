const db = require("../db");
const { getRequestBody } = require("../utils/bodyParser");
const { hashPassword } = require("../utils/auth");

const registerUser = async (req, res) => {
  try {
    const body = await getRequestBody(req);
    const { name, email, password } = body;

    const password_hash = await hashPassword(password);

    const [userId] = await db("users")
      .insert({
        name,
        email,
        password_hash,
      })
      .returning("id");

    res.writeHead(201);
    res.end(JSON.stringify({ id: userId, message: "User created" }));
    return;
  } catch (error) {
    res.writeHead(500);
    res.end(JSON.stringify({ error: error.message }));
    return;
  }
};

const getUserById = async (req, res, userId) => {
  try {
    const user = await db("users").where({ id: userId }).first();
    if (!user) {
      res.writeHead(404);
      res.end(JSON.stringify({ error: "User not found" }));
      return;
    }
    // Don't send password_hash lolz!
    const { password_hash, ...safeUser } = user;
    res.writeHead(200);
    res.end(JSON.stringify(safeUser));
    return;
  } catch (error) {
    res.writeHead(500);
    res.end(JSON.stringify({ error: error.message }));
    return;
  }
};

module.exports = { registerUser, getUserById };
