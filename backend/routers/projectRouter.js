const express = require("express");
const { requireAuth } = require("./authMiddleware");

const productRoutes = function (productController) {
  const router = express.Router();

  router.get("/", productController.getAllProjects);
  router.post("/", requireAuth, productController.postNewProjects);
  return router;
};

module.exports = productRoutes;
