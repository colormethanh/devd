const express = require("express");
const { requireAuth } = require("./authMiddleware");
const { createError } = require("../utils/errorHelpers");
const { createResponseObject } = require("../utils/responseHelpers");
const logger = require("../utils/logging/logger");
const { hasOne, fillObjectWithFromBody } = require("../utils/requestHelpers");
const { extractRole } = require("../utils/middlewares");

const taskRoutes = function (taskController) {
  router = express.Router();

  router.get("/", requireAuth, async (req, res, next) => {
    try {
      logger.info({
        message: `attempting to search DB for all task for project ${req.project_id}`,
        request_id: req.metadata.request_id,
      });
      const tasks = await taskController.getTasksFromProject(req.project_id);
      return res.send(createResponseObject(tasks));
    } catch (err) {
      return next(createError(err.statusCode, err.message));
    }
  });

  router.get("/:task_id", requireAuth, extractRole, async (req, res, next) => {
    try {
      const task_id = req.params.task_id;

      logger.info({
        message: `searching DB for task ${task_id}`,
        request_id: req.metadata.request_id,
      });

      // todo: Add require Auth

      const isOwnerOrGuest = req.role === "admin" || req.role === "guest";

      if (!isOwnerOrGuest)
        return next(createError(403, "Must be guest or owner to view tasks"));

      const task = await taskController.getTask(task_id);

      if (task instanceof Error) return next(task);

      if (!task) return next(createError(404, "Task could not be found"));

      return res.send(
        createResponseObject({ task }, "successfully retrieved task")
      );
    } catch (err) {
      return next(createError(err.statusCode, err.message));
    }
  });

  router.put("/:task_id", requireAuth, extractRole, async (req, res, next) => {
    try {
      const { task_id } = req.params;
      const project = req.project;

      logger.info({
        message: `Initiating task update for task ${task_id}`,
        request_id: req.metadata.request_id,
      });

      const projectContainsTask = await project.tasks.find(
        (task) => task._id.toString() === task_id
      );
      if (!projectContainsTask)
        return next(
          createError(400, `Project does not contain task ${task_id}`)
        );

      // Todo: add require auth to this route

      const isAdmin = req.role === "admin";
      if (!isAdmin)
        return next(
          createError(403, "Only admin may make changes to project pages")
        );

      // check to see if task exists
      const originalTask = await taskController.getTask(task_id);
      if (!originalTask) next(createError(404, "Task could not be found"));
      if (originalTask instanceof Error) next(originalTask);

      const allowedUpdates = [
        "name",
        "description",
        "status",
        "relevant_contents",
      ];

      if (!hasOne(allowedUpdates, req.body))
        next(createError(400, "Must update at least one property"));

      const updates = fillObjectWithFromBody(
        allowedUpdates,
        req.body,
        originalTask
      );

      const updatedTask = await taskController.updateTask(task_id, updates);
      if (!updatedTask) next(createError(500, "error when updating"));
      if (updatedTask instanceof Error) next(updatedTask);

      return res.send(createResponseObject({ updatedTask }));
    } catch (err) {
      next(createError(err.statusCode, err.message));
    }
  });

  router.post("/", requireAuth, extractRole, async (req, res, next) => {
    try {
      const project_id = req.project_id;
      if (!project_id) return next(createError(400, "project_id is required"));

      const user = req.user;
      if (!user) return next(createError(401));

      console.log(req.body);
      const { name, description } = req.body;

      // todo: Add require auth
      const isOwner = req.role === "admin";

      if (!isOwner)
        return next(createError(403, "admin rights required to make changes"));

      logger.info({
        message: "attempting to post new page to DB",
        request_id: req.metadata.request_id,
      });

      const newTask = await taskController.postNewTask(
        name,
        description,
        project_id
      );

      if (newTask instanceof Error) return next(newTask);

      return res.send(
        createResponseObject(
          { task_id: newTask._id },
          "successfully posted task"
        )
      );
    } catch (err) {
      return next(err);
    }
  });

  return router;
};

module.exports = taskRoutes;
