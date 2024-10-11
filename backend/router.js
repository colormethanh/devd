const Product = require("./controllers/project");
const Auth = require("./controllers/authentication");

module.exports = function (app) {
  app.get("/", (req, res) => {
    res.redirect(301, "/documentation");
  });
  // Auth Routes
  app.post("/auth/signup", Auth.signup);
  app.post("/auth/login", Auth.login);

  // Project Routes
  app.get("/projects", Product.getAllProducts);
  app.post("/projects", Product.postNewProduct);
};
