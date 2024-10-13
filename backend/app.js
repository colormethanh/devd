const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");

// Sub Routers
const userRouter = require("./routers/userRouter");
const projectRouter = require("./routers/projectRouter");
require("./services/passport");
const authRouter = require("./routers/authRouter");
const swaggerRouter = require("./routers/swaggerRouter");
const pageRouter = require("./routers/pageRouter");

const StartApp = ({ authController, projectController, userController }) => {
  const app = express();

  // App Level middleware setup
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(passport.initialize());
  const router = express.Router();

  // App routes
  router.use("/documentation", swaggerRouter());
  router.use("/projects", projectRouter(projectController));
  router.use("/auth", authRouter(authController));
  router.use("/user", userRouter(userController));
  router.use("/projects/:projectid/pages", pageRouter());

  app.use("/", router);
  return app;
};

module.exports = StartApp;
