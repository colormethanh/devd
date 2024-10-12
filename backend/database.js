const mongoose = require("mongoose");
const keys = require("./config/keys");
const authController = require("./controllers/authentication");
const projectController = require("./controllers/project");

const Controllers = { authController, projectController };

async function ConnectDB() {
  try {
    await mongoose.connect(keys.MONGO_URI);
    console.log("🚀 DB connected!");
  } catch (err) {
    console.log(err);
  }
}

module.exports = { ConnectDB, Controllers };
