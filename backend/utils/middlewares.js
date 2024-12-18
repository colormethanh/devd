const { createError } = require("./errorHelpers");
const logger = require("./logging/logger");
const { projectController } = require("../controllers/controllersIndex");

const extractProjectId = (req, res, next) => {
  logger.info({
    message: "Extracting Project Id from parameters",
    request_id: req.metadata.request_id,
  });
  req.project_id = req.params.project_id;
  return next();
};

const extractProject = async (req, res, next) => {
  logger.info({
    message: "extracting project",
    request_id: req.metadata.request_id,
  });

  let project;

  if (req.project_id) {
    project = await projectController.getProject(req.project_id);
    if (!project) next(createError(404, "Project could not be found"));
    req.project = project;
    return next();
  }

  return next(createError(400, "project_id is required"));
};

const extractRole = (req, res, next) => {
  logger.info({
    message: "extracting role of user for project",
    request_id: req.metadata.request_id,
  });
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
  logger.info({
    message: `User is of role: ${req.role} for project ${req.project_id}`,
    request_id: req.metadata.request_id,
  });
  return next();
};

module.exports = { extractProjectId, extractRole, extractProject };
