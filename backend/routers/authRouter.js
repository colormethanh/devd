const express = require("express");
const { createError } = require("../utils/errorHelpers");
const { createResponseObject } = require("../utils/responseHelpers");

const authRoutes = function (authController) {
  const router = express.Router();

  router.post("/login", async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password)
      return next(createError(400, "Must provide username and password"));

    try {
      const userToken = await authController.login(username, password);

      if (userToken instanceof Error) return next(userToken);

      return res.send(
        createResponseObject({ token: userToken }, "Login Successful")
      );
    } catch (err) {
      next(createError(err.statusCode, err.message));
    }
  });

  router.post("/signup", async (req, res, next) => {
    const { email, username, password } = req.body;

    if (!email || !username || !password)
      return next(
        createError(400, "Email, Username, and Password are required")
      );

    try {
      const userToken = await authController.signup(email, username, password);

      if (userToken instanceof Error) return next(userToken);

      return res.send(createResponseObject({ token: userToken }));
    } catch (err) {
      next(createError(err.statusCode, err.message));
    }
  });

  return router;
};

module.exports = authRoutes;
