const mongoose = require("mongoose");
const keys = require("./config/keys");

// DB Controllers
const authController = require("./controllers/authentication");
const projectController = require("./controllers/project");
const userController = require("./controllers/user");
const pageController = require("./controllers/page");
const componentController = require("./controllers/component");

const Controllers = {
  authController,
  projectController,
  userController,
  pageController,
  componentController,
};

async function ConnectDB() {
  try {
    await mongoose.connect(keys.MONGO_URI);
    console.log("🚀 DB connected!");
  } catch (err) {
    console.log(err);
  }
}

async function DisconnectDB() {
  try {
    await mongoose.disconnect();
    console.log("🌙 Database has been disconnected");
  } catch (error) {
    console.log(error);
  }
}

module.exports = { ConnectDB, DisconnectDB, Controllers };
