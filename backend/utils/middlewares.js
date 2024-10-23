const { createError } = require("./errorHelpers");

const extractProjectId = (req, res, next) => {
  req.project_id = req.params.project_id;
  return next();
};

const extractRole = (req, res, next) => {
  if (!req.user) {
    req.role = "public";
    return next();
  }

  if (!req.project_id) {
    return next(createError(400, "project_id is required"));
  }

  const userProjects = req.user.projects;
  const project = userProjects.find(
    (project) => project.project_id.toString() === req.project_id
  );

  req.role = !project ? "public" : project.role;

  return next();
};

module.exports = { extractProjectId, extractRole };
