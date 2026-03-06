
const redisClient = require("../redisClient");
const { getRequestBody } = require("../utils/bodyParser");
const db = require("../db");

// Helper: fetch product details for each cart item
async function enrichCartItems(cartItems) {
  if (!cartItems || cartItems.length === 0) return [];
  const ids = cartItems.map(item => item.productId);
  const products = await db("products").whereIn("id", ids);
  const productMap = {};
  for (const p of products) {
    productMap[p.id] = {
      ...p,
      image_urls: Array.isArray(p.image_urls) ? p.image_urls : JSON.parse(p.image_urls)
    };
  }
  return cartItems.map(item => ({
    ...productMap[item.productId],
    quantity: item.quantity
  }));
}

const calculateTotals = (cart) => {
  return cart.items.reduce(
    (sum, item) => sum + item.price_cents * item.quantity,
    0,
  );
};


const addToCart = async (req, res, productId) => {
  const { userId } = await getRequestBody(req); // Can use cookie here..?
  const cartKey = `cart:${userId}`;

  const cartData = await redisClient.get(cartKey);
  let cart = cartData ? JSON.parse(cartData) : { items: [] };

  // Add or update item
  const idx = cart.items.findIndex(i => i.productId === productId);
  if (idx > -1) {
    cart.items[idx].quantity += 1;
  } else {
    cart.items.push({ productId, quantity: 1 });
  }

  await redisClient.set(cartKey, JSON.stringify(cart));

  // Enrich items for response
  const enrichedItems = await enrichCartItems(cart.items);
  const subtotalCents = enrichedItems.reduce((sum, item) => sum + item.price_cents * item.quantity, 0);

  res.writeHead(200);
  res.end(JSON.stringify({ items: enrichedItems, subtotalCents }));
};


const updateCartItem = async (req, res, userId, productId) => {
  try {
    const { quantity } = await getRequestBody(req);
    const cartKey = `cart:${userId}`;
    const cartData = await redisClient.get(cartKey);

    if (!cartData) {
      res.writeHead(404);
      return res.end(JSON.stringify({ error: "Cart not found" }));
    }

    let cart = JSON.parse(cartData);
    const itemIndex = cart.items.findIndex((i) => i.productId === productId);

    if (itemIndex > -1) {
      if (quantity <= 0) {
        cart.items.splice(itemIndex, 1);
      } else {
        cart.items[itemIndex].quantity = quantity;
      }

      await redisClient.set(cartKey, JSON.stringify(cart));

      const enrichedItems = await enrichCartItems(cart.items);
      const subtotalCents = enrichedItems.reduce((sum, item) => sum + item.price_cents * item.quantity, 0);

      res.writeHead(200);
      res.end(JSON.stringify({ items: enrichedItems, subtotalCents }));
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ error: "Item not in cart" }));
    }
  } catch (err) {
    res.writeHead(500);
    res.end(JSON.stringify({ error: err.message }));
  }
};


const removeFromCart = async (req, res, productId, userId) => {
  try {
    const cartKey = `cart:${userId}`;
    const cartData = await redisClient.get(cartKey);

    if (!cartData) {
      res.writeHead(200);
      return res.end(JSON.stringify({ items: [], subtotalCents: 0 }));
    }

    let cart = JSON.parse(cartData);
    cart.items = cart.items.filter((i) => i.productId !== productId);

    await redisClient.set(cartKey, JSON.stringify(cart));

    const enrichedItems = await enrichCartItems(cart.items);
    const subtotalCents = enrichedItems.reduce((sum, item) => sum + item.price_cents * item.quantity, 0);

    res.writeHead(200);
    res.end(JSON.stringify({ items: enrichedItems, subtotalCents }));
  } catch (err) {
    res.writeHead(500);
    res.end(JSON.stringify({ error: err.message }));
  }
};


const getCart = async (req, res, userId) => {
  const cartData = await redisClient.get(`cart:${userId}`);
  let cart = cartData ? JSON.parse(cartData) : { items: [] };
  const enrichedItems = await enrichCartItems(cart.items);
  const subtotalCents = enrichedItems.reduce((sum, item) => sum + item.price_cents * item.quantity, 0);
  res.writeHead(200);
  res.end(JSON.stringify({ items: enrichedItems, subtotalCents }));
};

module.exports = { addToCart, getCart, updateCartItem, removeFromCart };
