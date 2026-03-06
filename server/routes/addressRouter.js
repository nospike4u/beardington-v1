const addressController = require("../controllers/addressController");

const addressRouter = async (req, res, pathSegments) => {
  const method = req.method;
  const userId = parseInt(pathSegments[1], 10);
  const addressId = parseInt(pathSegments[3], 10);

  if (pathSegments[2] === "addresses") {
    if (method === "GET")
      return addressController.getAllAddresses(req, res, userId);
    if (method === "POST")
      return addressController.createAddress(req, res, userId);
    if (method === "DELETE" && pathSegments[3])
      return addressController.deleteAddress(req, res, addressId);
    if (method === "PUT" && pathSegments[3])
      return addressController.updateAddress(req, res, addressId);
  }

  res.writeHead(404);
  res.end(JSON.stringify({ error: "Address route not found" }));
};

module.exports = addressRouter;
