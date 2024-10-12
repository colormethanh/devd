const express = require("express");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const devdDocument = YAML.load("./static/devd.yaml");

const swaggerRoutes = function () {
  const router = express.Router();

  router.use("/", swaggerUi.serve, swaggerUi.setup(devdDocument));
  return router;
};

module.exports = swaggerRoutes;
