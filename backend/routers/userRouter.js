const express = require("express");
const { requireAuth } = require("./authMiddleware");

const userRoutes = function (userController) {
  const router = express.Router();

  router.get("/me", requireAuth, async (req, res, next) => {
    try {
      const user = await userController.getUser(req.user._id);

      if (!user) return res.status(404).send("User could not be found");

      if (user instanceof Error)
        return res.status(user.statusCode).send(user.message);

      res.send(user);
    } catch (err) {
      next(err);
    }
  });

  return router;
};

module.exports = userRoutes;
