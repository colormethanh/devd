const express = require("express");
const { requireAuth } = require("./authMiddleware");

const projectRoutes = function (projectController) {
  const router = express.Router();

  router.get("/", async (req, res, next) => {
    try {
      const projects = await projectController.getAllProjects();
      return res.send(projects);
    } catch (err) {
      next(err);
    }
  });

  router.get("/:projectId", async (req, res, next) => {
    try {
      const projectId = req.params.projectId;

      const project = await projectController.getProject(projectId);

      if (project instanceof Error)
        return res.status(project.statusCode).send(project.message);

      return res.send(project);
    } catch (err) {
      next(err);
    }
  });

  router.post("/", requireAuth, async (req, res, next) => {
    try {
      const { name, description } = req.body;
      if (!name || !description || !req.user._id)
        return res.status(400).send("Name and Description are required");

      const newProject = await projectController.postNewProject(
        name,
        description,
        req.user._id
      );

      if (newProject instanceof Error)
        return res.status(newProject.statusCode).send(newProject.message);

      return res.send({
        message: "New project successfully created",
        project_id: newProject._id,
      });
    } catch (err) {
      next(err);
    }
  });

  // todo: Put project
  // todo: Delete project

  return router;
};

module.exports = projectRoutes;
