const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const passport = require("passport");
const logger = require("./utils/logging/logger");
const morgan = require("morgan");
const keys = require("./config/keys.js");
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
  taskRouter,
} = require("./routers/index.js");

const StartApp = ({
  authController,
  projectController,
  userController,
  pageController,
  componentController,
  refreshTokenController,
  taskController,
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

  app.set("true proxy", true);

  const corsOptions = {
    origin: keys.ALLOWED_ORIGIN_URL || "http://localhost:3001", // Specify the allowed origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    sameSite: false,
  };

  app.use(cors(corsOptions));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cookieParser({ credentials: true }));
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
    "/projects/:project_id/tasks",
    extractProjectId,
    extractProject,
    taskRouter(taskController)
  );
  router.use(
    "/projects/:project_id/components",
    extractProjectId,
    extractProject,
    componentRouter(componentController, pageController)
  );

  app.use("/", router);

  // Error Handler
  app.use(errorRouter);

  return app;
};

module.exports = StartApp;
