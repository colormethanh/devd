const express = require("express");

const authRoutes = function (authController) {
  const router = express.Router();

  router.post("/login", authController.login);
  router.post("/signup", authController.signup);
  return router;
};

module.exports = authRoutes;
