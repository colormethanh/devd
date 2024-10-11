const express = require("express");
const router = require("./router");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const devdDocument = YAML.load("./static/devd.yaml");
const mongoose = require("mongoose");
const cors = require("cors");
const keys = require("./config/keys");
const { ProjectModel } = require("./models/ModelsStore");
const passport = require("passport");
require("./services/passport");

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());

app.use("/documentation", swaggerUi.serve, swaggerUi.setup(devdDocument));

router(app);

// Server setup
const PORT = process.env.PORT || 3000;

const StartServer = async () => {
  try {
    await mongoose.connect(keys.MONGO_URI);
    console.log("🚀 DB connected!");
    app.listen(PORT, () => {
      console.log(`Server running on port http://localhost:${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

StartServer();
