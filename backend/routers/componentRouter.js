const express = require("express");
const { requireAuth } = require("./authMiddleware");
const { createError } = require("../utils/errorHelpers");
const { createResponseObject } = require("../utils/responseHelpers");

const componentRoutes = function (componentController) {
  const router = express.Router();

  router.get("/", async (req, res, next) => {
    if (!req.project_id) return createError(400, "project_id is required");

    try {
      const components = await componentController.getComponentsFromProject(
        req.project_id
      );
      return res.send(createResponseObject(components));
    } catch (err) {
      return next(err);
    }
  });

  router.get("/:component_id", async (req, res, next) => {
    const { component_id } = req.params;
    if (!component_id)
      return next(createError(400, "component_id is required"));

    try {
      const component = await componentController.getComponent(component_id);

      if (component instanceof Error) return next(component);

      if (!component) return next(createError(404));

      return res.send(createResponseObject({ component }));
    } catch (err) {
      return next(createError(err.statusCode, err.message));
    }
  });

  router.post("/", requireAuth, async (req, res, next) => {
    if (!req.project_id) return createError(400, "project_id is required");

    const { name, description, snippet, pages } = req.body;
    if (!name || !description || !snippet || !pages)
      return createError(
        400,
        "Name, description, snipper, and pages are required"
      );

    try {
      const newComponent = await componentController.postComponent(
        name,
        description,
        snippet,
        pages,
        req.project_id
      );

      if (newComponent instanceof Error) return next(err);
      if (!newComponent) return next(500, "Error creating component");

      return res.send(createResponseObject({ component_id: newComponent._id }));
    } catch (err) {
      next(createError(err.statusCode, err.message));
    }
  });

  return router;
};

module.exports = componentRoutes;
