const express = require("express");

const authRoutes = function (authDB) {
  const router = express.Router();

  router.post("/login", authDB.login);
  router.post("/signup", authDB.signup);
  return router;
};

module.exports = authRoutes;
