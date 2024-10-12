// StartServer();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const StartServer = require("./app");
const authController = require("./controllers/authentication");
const projectController = require("./controllers/project");

dotenv.config();
const PORT = process.env.PORT || 3000;

const connectDB = async () => {
  try {
    await mongoose.connect(keys.MONGO_URI);
    console.log("🚀 DB connected!");
  } catch (err) {
    console.log(err);
  }
};
connectDB();

const app = StartServer({ authController, projectController });
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
