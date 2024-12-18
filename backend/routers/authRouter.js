const express = require("express");
const { createError } = require("../utils/errorHelpers");
const { createResponseObject } = require("../utils/responseHelpers");
const jwt = require("jwt-simple");
const keys = require("../config/keys");
const { tokenForUser } = require("../services/passport");
const logger = require("../utils/logging/logger");

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
      logger.info({
        message: "user lookup initiated",
        request_id: req.metadata.request_id,
      });
      const tokens = await authController.login(username, password);

      if (tokens instanceof Error) {
        logger.error({
          message: `Error when looking up user: ${tokens.message} - ${tokens.statusCode}`,
          request_id: req.metadata.request_id,
        });
        return next(tokens);
      }

      const { accessToken, refreshToken, user } = tokens;

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: "none",
        secure: true,
      });

      return res.send(
        createResponseObject(
          { accessToken, user_id: user._id, user: user },
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
      const signupResponse = await authController.signup(
        email,
        username,
        password
      );

      if (signupResponse instanceof Error) return next(signupResponse);

      const accessToken = {
        accessToken: signupResponse.accessToken,
      };

      const refreshToken = signupResponse.refreshToken;

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      return res.send(createResponseObject(accessToken, "signup successful"));
    } catch (err) {
      next(createError(err.statusCode, err.message));
    }
  });

  router.post("/logout", async (req, res, next) => {
    const { refreshToken } = req.cookies;

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

      const response = await refreshTokenController.deleteRefreshToken(
        tokenInDB
      );

      if (response instanceof Error) return response;

      return res.send(createResponseObject({}, "successfully logged outn"));
    } catch (err) {
      return next(err.statusCode, err.message);
    }
  });

  router.post("/refresh-token", async (req, res, next) => {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return next(createError(400, "RefreshToken is required"));
    }

    try {
      // Retrieve and check refresh token
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

      return res.send(
        createResponseObject(
          { accessToken, user_id: userInDB._id, user: userInDB },
          "successfully refreshed token"
        )
      );
    } catch (err) {
      return next(err.statusCode, err.message);
    }
  });

  return router;
};

module.exports = authRoutes;
