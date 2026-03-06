const db = require("../db");
const { getRequestBody } = require("../utils/bodyParser");

const getAllAddresses = async (req, res, userId) => {
  try {
    const addresses = await db("addresses").where({ user_id: userId });
    if (!addresses) {
      res.writeHead(404);
      res.end(JSON.stringify({ addresses }));
      return;
    }
    res.writeHead(200);
    res.end(JSON.stringify({ addresses }));
    return;
  } catch (error) {
    res.writeHead(500);
    res.end(JSON.stringify({ error: error.message }));
    return;
  }
};

const createAddress = async (req, res, userId) => {
  try {
    const body = await getRequestBody(req);
    const { full_name, street, city, postal_code, country, phone, is_default } =
      body;

    const [id] = await db("addresses")
      .insert({
        user_id: userId,
        full_name,
        street,
        city,
        postal_code,
        country,
        phone,
        is_default,
      })
      .returning("id");

    res.writeHead(201);
    res.end(JSON.stringify({ id, message: "Address created" }));
    return;
  } catch (error) {
    res.writeHead(500);
    res.end(JSON.stringify({ error: error.message }));
    return;
  }
};

const deleteAddress = async (req, res, addressId) => {
  try {
    const deleted = await db("addresses").where({ id: addressId }).delete();
    if (!deleted) {
      res.writeHead(404);
      return res.end(JSON.stringify({ error: "Address not found" }));
    }
    res.writeHead(200);
    res.end(JSON.stringify({ message: "Address deleted" }));
    return;
  } catch (error) {
    res.writeHead(500);
    res.end(JSON.stringify({ error: error.message }));
    return;
  }
};

const updateAddress = async (req, res, addressId) => {
  try {
    const updateBody = await getRequestBody(req);
    const { full_name, street, city, postal_code, country, phone, is_default } =
      updateBody;

    const [id] = await db("addresses").where({ id: addressId})
      .update({
        
        full_name,
        street,
        city,
        postal_code,
        country,
        phone,
        is_default,
      })
      .returning("id");

    res.writeHead(200);
    res.end(JSON.stringify({ addressId, id, message: "Address updated" }));
    return;
  } catch (error) {
    res.writeHead(500);
    res.end(JSON.stringify({ error: error.message }));
    return;
  }
};

module.exports = {
  getAllAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
};
