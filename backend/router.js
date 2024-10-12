const Project = require("./controllers/project");
const Auth = require("./controllers/authentication");
const passport = require("passport");

const requireAuth = passport.authenticate("jwt", { session: false });

module.exports = function (app) {
  app.get("/", (req, res) => {
    res.redirect(301, "/documentation");
  });

  // Auth Routes
  app.post("/auth/signup", Auth.signup);
  app.post("/auth/login", Auth.login);
  // todo: Logout

  // Project Routes
  app.get("/projects", Project.getAllProducts);
  app.post("/projects", requireAuth, Project.postNewProduct);
};
