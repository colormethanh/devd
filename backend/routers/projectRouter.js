const express = require("express");
const { requireAuth } = require("./authMiddleware");
const { createError } = require("../utils/errorHelpers");
const { createResponseObject } = require("../utils/responseHelpers");
const logger = require("../utils/logging/logger");

const { hasOne, fillObjectWithFromBody } = require("../utils/requestHelpers");

const projectRoutes = function (projectController) {
  const router = express.Router();

  // get all projects
  router.get("/", async (req, res, next) => {
    try {
      logger.info({
        message: "Attempting to search DB for all projects",
        request_id: req.metadata.request_id,
      });
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

      logger.info({
        message: `searching DB for project: ${projectId}`,
        request_id: req.metadata.request_id,
      });
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

  // post a new project to db
  router.post("/", requireAuth, async (req, res, next) => {
    try {
      const { name, description } = req.body;
      if (!name || !description || !req.user._id)
        return next(createError(400, "Name and Description is required"));
      logger.info({
        message: "Attempting to post new project to DB",
        request_id: req.metadata.request_id,
      });
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

  // edits an existing project
  // *User should only be able to update name and description
  router.put("/:project_id", requireAuth, async (req, res, next) => {
    try {
      const { project_id } = req.params;
      const currentProject = await projectController.getProject(project_id);

      if (!currentProject) next(404, "Project could not be found");
      if (currentProject instanceof Error) next(currentProject);

      const isOwner =
        req.user._id.toString() === currentProject.owner.toString();

      if (!isOwner)
        next(
          createError(
            403,
            "Only project owners can update project name and description"
          )
        );

      const allowedUpdates = ["name", "description", "features"];

      if (!hasOne(allowedUpdates, req.body))
        next(createError(400, "Must update at lease one property"));

      const updates = fillObjectWithFromBody(
        allowedUpdates,
        req.body,
        currentProject
      );

      const updatedProject = await projectController.updateProject(
        project_id,
        updates
      );
      if (!updatedProject)
        next(createError(500, "error when updating project"));
      if (updatedProject instanceof Error) next(updatedProject);

      res.send(createResponseObject({ updatedProject }));
    } catch (err) {
      logger.error({
        message: err.message,
        request_id: req.metadata.request_id,
      });
      next(createError(err.statusCode, err.message));
    }
  });

  //deletes a project
  router.delete("/:project_id", requireAuth, async (req, res, next) => {
    try {
      logger.info({
        message: "Starting check before project deletion",
        user: req.user._id,
        request_id: req.metadata.request_id,
      });
      const { project_id } = req.params;
      const currentProject = await projectController.getProject(project_id);

      if (!currentProject) next(404, "Project could not be found");
      if (currentProject instanceof Error) next(currentProject);

      const isOwner =
        req.user._id.toString() === currentProject.owner.toString();

      if (!isOwner)
        next(createError(403, "Only project owners can delete a project"));

      const deleteMessage = await projectController.deleteProject(project_id);

      if (deleteMessage instanceof Error) next(deleteMessage);

      return res.send(createResponseObject(deleteMessage));
    } catch (err) {
      return next(createError(err.statusCode, err.message));
    }
  });

  return router;
};

module.exports = projectRoutes;
