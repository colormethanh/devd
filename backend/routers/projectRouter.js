const express = require("express");

const productRoutes = function (productDB) {
  const router = express.Router();

  router.get("/", productDB.getAllProducts);
  return router;
};

module.exports = productRoutes;
