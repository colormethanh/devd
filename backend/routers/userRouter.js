const express = require("express");
const { createError } = require("../utils/errorHelpers");
const { createResponseObject } = require("../utils/responseHelpers");
const { requireAuth } = require("./authMiddleware");

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

  return router;
};

module.exports = userRoutes;
