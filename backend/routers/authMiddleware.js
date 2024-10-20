const passport = require("passport");

const requireAuth = passport.authenticate("jwt", { session: false });

const requireProjectRole = (req, res, next) => {
  if (!req.user) {
    req.role = "public";
    return next();
  }

  const project = req.user.projects.find((project) => {
    return project.project_id.toString() === req.project_id;
  });

  if (project) {
    req.role = project.role;
    return next();
  }

  req.role = "public";
  return next();
};

module.exports = { requireAuth, requireProjectRole };
