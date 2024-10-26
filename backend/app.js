const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const logger = require("./utils/logging/logger");
const morgan = require("morgan");
const { extractProjectId, extractProject } = require("./utils/middlewares");
require("./services/passport");

const {
  userRouter,
  projectRouter,
  authRouter,
  swaggerRouter,
  pageRouter,
  componentRouter,
  errorRouter,
} = require("./routers/index.js");

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
  app.use((req, res, next) => {
    req.metadata = {
      request_id: crypto.randomUUID(),
    };

    logger.info({
      message: `Request received - ${req.url} `,
      request_id: req.metadata.request_id,
    });

    next();
  });
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
    extractProject,
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
