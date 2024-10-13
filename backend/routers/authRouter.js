const express = require("express");

const authRoutes = function (authController) {
  const router = express.Router();

  router.post("/login", async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password)
      return res.status(400).send("Must provide username and password");

    try {
      const userToken = await authController.login(username, password);

      if (userToken instanceof Error)
        return res.status(userToken.statusCode).send(userToken.message);

      return res.send({ token: userToken });
    } catch (err) {
      next(err);
    }
  });

  router.post("/signup", async (req, res, next) => {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      return res
        .status(400)
        .send({ error: "You must provide an email, username, and password" });
    }

    try {
      const userToken = await authController.signup(email, username, password);

      if (userToken instanceof Error)
        return res.status(userToken.statusCode).send(userToken.message);

      res.send({ token: userToken });
    } catch (err) {
      next(err);
    }
  });

  return router;
};

module.exports = authRoutes;
