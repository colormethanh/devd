const express = require("express");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const devdDocument = YAML.load("./static/devd.yaml");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.use("/documentation", swaggerUi.serve, swaggerUi.setup(devdDocument));

app.get("/", (req, res) => {
  res.redirect([200], "/projects");
});

app.get("/projects", (req, res) => {
  res.send([{ name: "test project 1" }, { name: "test project 2" }]);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
