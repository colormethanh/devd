const express = require("express");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const devdDocument = YAML.load("./static/devd.yaml");
const cors = require("cors");
const passport = require("passport");
const productRouter = require("./routers/projectRouter");
require("./services/passport");
const authRouter = require("./routers/authRouter");

const StartServer = ({ authController, projectController }) => {
  const app = express();

  // App Level middleware
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(passport.initialize());
  const router = express.Router();

  // App routes
  router.use("/documentation", swaggerUi.serve, swaggerUi.setup(devdDocument));
  router.use("/projects", productRouter(projectController));
  router.use("/auth", authRouter(authController));
  app.use("/", router);
  return app;
};

module.exports = StartServer;
