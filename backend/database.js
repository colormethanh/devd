const mongoose = require("mongoose");
const keys = require("./config/keys");

// DB Controllers
const authController = require("./controllers/authentication");
const projectController = require("./controllers/project");
const userController = require("./controllers/user");

const Controllers = { authController, projectController, userController };

async function ConnectDB() {
  try {
    await mongoose.connect(keys.MONGO_URI);
    console.log("🚀 DB connected!");
  } catch (err) {
    console.log(err);
  }
}

module.exports = { ConnectDB, Controllers };
