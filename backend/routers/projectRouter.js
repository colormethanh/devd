const express = require("express");
const { requireAuth } = require("./authMiddleware");
const { createError } = require("../utils/errorHelpers");
const { createResponseObject } = require("../utils/responseHelpers");
const logger = require("../utils/logging/logger");

const projectRoutes = function (projectController) {
  const router = express.Router();

  // get all projects
  router.get("/", async (req, res, next) => {
    try {
      logger.info("Attempting to search DB for all projects");
      const projects = await projectController.getAllProjects();

      return res.send(
        createResponseObject(projects, "successfully retrieved all project")
      );
    } catch (err) {
      next(createError(err.statusCode, err.message));
    }
  });

  // get project by id
  router.get("/:projectId", async (req, res, next) => {
    try {
      const projectId = req.params.projectId;

      logger.info(`searching DB for project: ${projectId}`);
      const project = await projectController.getProject(projectId);

      if (project instanceof Error) return next(project);

      if (!project) return next(createError(404));

      return res.send(
        createResponseObject(project, "successfully retrieved project")
      );
    } catch (err) {
      next(createError(err.statusCode, err.message));
    }
  });

  router.post("/", requireAuth, async (req, res, next) => {
    try {
      const { name, description } = req.body;
      if (!name || !description || !req.user._id)
        return next(createError(400, "Name and Description is required"));

      logger.info("Attempting to post new project to DB");
      const newProject = await projectController.postNewProject(
        name,
        description,
        req.user._id
      );

      if (newProject instanceof Error) return next(newProject);

      return res.send(
        createResponseObject(
          { project_id: newProject._id },
          "New project successfully created"
        )
      );
    } catch (err) {
      next(createError(err.statusCode, err.message));
    }
  });

  return router;
};

module.exports = projectRoutes;
