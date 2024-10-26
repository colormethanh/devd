const authController = require("./authentication");
const componentController = require("./component");
const pageController = require("./page");
const projectController = require("./project");
const refreshTokenController = require("./refreshToken");
const userController = require("./user");

const index = {
  authController,
  componentController,
  pageController,
  projectController,
  refreshTokenController,
  userController,
};

module.exports = index;
