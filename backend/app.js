const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const logger = require("./utils/logging/logger");
const morgan = require("morgan");
const { extractProjectId } = require("./utils/middlewares");
const errorRouter = require("./routers/errorRouter");

// Sub Routers
const userRouter = require("./routers/userRouter");
const projectRouter = require("./routers/projectRouter");
require("./services/passport");
const authRouter = require("./routers/authRouter");
const swaggerRouter = require("./routers/swaggerRouter");
const pageRouter = require("./routers/pageRouter");
const componentRouter = require("./routers/componentRouter");

const StartApp = ({
  authController,
  projectController,
  userController,
  pageController,
  componentController,
  refreshTokenController,
}) => {
  const app = express();

  // App Level middleware setup
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(passport.initialize());
  const router = express.Router();

  app.use(
    morgan("common", {
      stream: { write: (message) => logger.info(message.trim()) },
    })
  );

  app.use((req, res, next) => {
    logger.info(`Request received - ${req.url}`);
    next();
  });

  // App routes
  router.use(
    "/auth",
    authRouter(authController, userController, refreshTokenController)
  );
  router.use("/user", userRouter(userController));
  router.use("/documentation", swaggerRouter());
  router.use("/projects", projectRouter(projectController));
  router.use(
    "/projects/:project_id/pages",
    extractProjectId,
    pageRouter(pageController)
  );
  router.use(
    "/projects/:project_id/components",
    extractProjectId,
    componentRouter(componentController, pageController)
  );

  app.use("/", router);

  // Error Handler
  app.use(errorRouter);

  return app;
};

module.exports = StartApp;
