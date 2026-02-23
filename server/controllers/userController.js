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
  } catch (error) {
    res.writeHead(500);
    res.end(JSON.stringify({ error: error.message }));
  }
};

module.exports = { registerUser };
