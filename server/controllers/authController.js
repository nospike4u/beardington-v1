const db = require("../db");
const { verifyPassword, hashPassword } = require("../utils/auth");
const { getRequestBody } = require("../utils/bodyParser");
// const redis = require('../redisClient'); // Might need for later

const signup = async (req, res) => {
  const { name, email, password } = await getRequestBody(req);
  const password_hash = await hashPassword(password);
  await db("users").insert({ name, email, password_hash });
  res.writeHead(201);
  res.end(JSON.stringify({ message: "User created" }));
};

const login = async (req, res) => {
  const { email, password } = await getRequestBody(req);
  const user = await db("users").where({ email }).first();

  if (user && (await verifyPassword(password, user.password_hash))) {
    // Create Session ID
    const sessionId = require("crypto").randomBytes(16).toString("hex");

    // Save to Redis (Session expires in 24h)
    // await redis.set(`sess:${sessionId}`, user.id, 'EX', 86400);

    // Set Cookie and Response
    res.setHeader(
      "Set-Cookie",
      `sid=${sessionId}; HttpOnly; Path=/; Max-Age=86400`,
    );
    res.writeHead(200);
    res.end(JSON.stringify({ message: "Logged in", userId: user.id }));
  } else {
    res.writeHead(401);
    res.end(JSON.stringify({ error: "Invalid credentials" }));
  }
};

const logout = async (req, res) => {
  // Get sessionId from Cookie header, then delete from Redis
  // await redis.del(`sess:${sessionId}`);
  res.setHeader("Set-Cookie", "sid=; Path=/; Max-Age=0"); // Clear the cookie
  res.writeHead(200);
  res.end(JSON.stringify({ message: "Logged out" }));
};

module.exports = { signup, login, logout };
