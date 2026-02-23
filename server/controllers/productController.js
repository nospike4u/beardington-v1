const db = require("../db");

const getAll = async (req, res) => {
  const products = await db("products").select("*");
  res.writeHead(200);
  res.end(JSON.stringify({ products }));
};
const getBySlug = async (req, res, slug) => {
  const product = await db("products").where({ slug }).first();
  if (!product) {
    res.writeHead(404);
    return res.end(JSON.stringify({ error: "Product not found" }));
  }
  res.writeHead(200);
  res.end(JSON.stringify({ product }));
};

module.exports = { getAll, getBySlug };
