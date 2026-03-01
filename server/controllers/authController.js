const crypto = require("crypto");
const db = require("../db");
const { verifyPassword, hashPassword } = require("../utils/auth");
const { getRequestBody } = require("../utils/bodyParser");
const redis = require('../redisClient');

const SESSION_TTL = 86400; // 24h in seconds

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
    const sessionId = crypto.randomBytes(16).toString("hex");
    await redis.set(`sess:${sessionId}`, user.id, { EX: SESSION_TTL });

    res.setHeader(
      "Set-Cookie",
      `sid=${sessionId}; HttpOnly; Path=/; Max-Age=${SESSION_TTL}`,
    );
    res.writeHead(200);
    res.end(JSON.stringify({ message: "Logged in", userId: user.id }));
  } else {
    res.writeHead(401);
    res.end(JSON.stringify({ error: "Invalid credentials" }));
  }
};

const logout = async (req, res) => {
  const cookieHeader = req.headers.cookie || '';
  const match = cookieHeader.match(/(?:^|;\s*)sid=([^;]+)/);
  if (match) {
    await redis.del(`sess:${match[1]}`);
  }
  res.setHeader("Set-Cookie", "sid=; Path=/; Max-Age=0");
  res.writeHead(200);
  res.end(JSON.stringify({ message: "Logged out" }));
};

module.exports = { signup, login, logout };
