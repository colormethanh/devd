const express = require("express");
const { requireAuth } = require("./authMiddleware");
const { createError } = require("../utils/errorHelpers");
const { createResponseObject } = require("../utils/responseHelpers");

const projectRoutes = function (projectController) {
  const router = express.Router();

  router.get("/", async (req, res, next) => {
    try {
      const projects = await projectController.getAllProjects();

      return res.send(createResponseObject(projects));
    } catch (err) {
      next(createError(err.statusCode, err.message));
    }
  });

  router.get("/:projectId", async (req, res, next) => {
    try {
      const projectId = req.params.projectId;

      const project = await projectController.getProject(projectId);

      if (project instanceof Error) return next(project);

      return res.send(project);
    } catch (err) {
      next(createError(err.statusCode, err.message));
    }
  });

  router.post("/", requireAuth, async (req, res, next) => {
    try {
      const { name, description } = req.body;
      if (!name || !description || !req.user._id)
        return next(createError(400, "Name and Description is required"));

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

  // todo: Put project
  // todo: Delete project

  return router;
};

module.exports = projectRoutes;
