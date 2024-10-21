const express = require("express");
const { createError } = require("../utils/errorHelpers");
const { createResponseObject } = require("../utils/responseHelpers");
const jwt = require("jwt-simple");
const keys = require("../config/keys");
const { tokenForUser } = require("../services/passport");

const authRoutes = function (
  authController,
  userController,
  refreshTokenController
) {
  const router = express.Router();

  router.post("/login", async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password)
      return next(createError(400, "Must provide username and password"));

    try {
      const tokens = await authController.login(username, password);

      if (tokens instanceof Error) return next(tokens);
      const { accessToken, refreshToken } = tokens;

      return res.send(
        createResponseObject(
          { token: accessToken, refreshToken },
          "Login Successful"
        )
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

  router.post("/refresh-token", async (req, res, next) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return next(createError(400, "RefreshToken is required"));
    }

    try {
      const tokenInDB = await refreshTokenController.getRefreshToken(
        refreshToken.token
      );

      if (tokenInDB instanceof Error) return next(tokenInDB);

      if (!tokenInDB)
        return next(createError(403, "Invalid or expired refresh token"));

      // Issue new access token
      const userInDB = await userController.getUser(refreshToken.user_id);

      if (userInDB instanceof Error) return next(userInDB);

      if (!userInDB) return next(401, "invalid user ID");

      const accessToken = tokenForUser(userInDB);

      return res.send(createResponseObject({ accessToken }));
    } catch (err) {
      return next(err.statusCode, err.message);
    }
  });

  return router;
};

module.exports = authRoutes;
