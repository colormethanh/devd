const express = require("express");
const { requireAuth } = require("./authMiddleware");
const pageModel = require("../models/Page");

const pageRoutes = function (pageController) {
  const router = express.Router();

  router.get("/", (req, res, next) => {
    res.send("Request for pages received");
  });

  return router;
};

module.exports = pageRoutes;
