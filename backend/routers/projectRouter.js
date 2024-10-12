const express = require("express");
const { requireAuth } = require("./authMiddleware");

const productRoutes = function (productDB) {
  const router = express.Router();

  router.get("/", productDB.getAllProjects);
  router.post("/", requireAuth, productDB.postNewProjects);
  return router;
};

module.exports = productRoutes;
