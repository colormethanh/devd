const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const { ErrorMessages } = require("./utils/errorHelpers");
const { createResponseObject } = require("./utils/responseHelpers");
const { extractProjectId } = require("./utils/middlewares");

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
    componentRouter(componentController)
  );

  app.use("/", router);

  // Error Handler
  app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || ErrorMessages[statusCode];
    return res
      .status(statusCode)
      .send(
        createResponseObject(
          { message: message, statusCode: statusCode },
          "Error"
        )
      );
  });
  return app;
};

module.exports = StartApp;
