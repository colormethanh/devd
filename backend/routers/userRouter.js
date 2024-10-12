const express = require("express");
const { requireAuth } = require("./authMiddleware");

const userRoutes = function (userController) {
  const router = express.Router();

  router.get("/me", requireAuth, userController.getUser);

  return router;
};

module.exports = userRoutes;
