const express = require("express");
const { createError } = require("../utils/errorHelpers");
const { createResponseObject } = require("../utils/responseHelpers");
const { requireAuth } = require("./authMiddleware");
const logger = require("../utils/logging/logger");
const { hasOne, fillObjectWithFromBody } = require("../utils/requestHelpers");
const { extractRole } = require("../utils/middlewares");

const userRoutes = function (userController) {
  const router = express.Router();

  router.get("/me", requireAuth, async (req, res, next) => {
    try {
      const user = await userController.getUser(req.user._id);

      if (!user) return next(createError(404, "User could not be found"));

      if (user instanceof Error) return next(user);

      res.send(
        createResponseObject({ user: user }, "successfully retrieved used data")
      );
    } catch (err) {
      next(createError(err.statusCode, err.message));
    }
  });

  router.get("/user/:user_id", async (req, res, next) => {
    try {
      const { user_id } = req.params;
      const user = await userController.getUser(user_id);
      if (!user) return next(createError(404, "User could not be found"));

      if (user instanceof Error) return next(user);

      res.send(
        createResponseObject({ user: user }, "successfully retrieved used data")
      );
    } catch (err) {
      next(createError(err.statusCode, err.message));
    }
  });

  router.patch("/:user_id", requireAuth, async (req, res, next) => {
    try {
      const { user_id } = req.params;

      logger.info({
        message: `Initiating user updates for user ${user_id}`,
        request_id: req.metadata.request_id,
      });

      const originalUser = await userController.getUser(user_id);
      if (!originalUser)
        return next(createError(400, `user ${user_id} does not exist`));

      const allowedUpdates = ["fname", "lname", "bio", "email"];

      if (!hasOne(allowedUpdates, req.body))
        next(createError(400, "Must update at least one property"));

      const updates = fillObjectWithFromBody(
        allowedUpdates,
        req.body,
        originalUser
      );

      const updatedUser = await userController.updateUser(user_id, updates);
      if (!updatedUser) next(createError(500, "Error when updating"));

      if (updatedUser instanceof Error) next(updatedUser);

      return res.send(createResponseObject({ updatedUser }));
    } catch (err) {
      next(createError(err.statusCode, err.message));
    }
  });

  return router;
};

module.exports = userRoutes;
