const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");

// Sub Routers
const productRouter = require("./routers/projectRouter");
require("./services/passport");
const authRouter = require("./routers/authRouter");
const swaggerRoutes = require("./routers/swaggerRouter");

const StartApp = ({ authController, projectController }) => {
  const app = express();

  // App Level middleware setup
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(passport.initialize());
  const router = express.Router();

  // App routes
  router.use("/documentation", swaggerRoutes());
  router.use("/projects", productRouter(projectController));
  router.use("/auth", authRouter(authController));
  app.use("/", router);
  return app;
};

module.exports = StartApp;
