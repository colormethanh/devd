const express = require("express");
const { requireAuth, requireProjectRole } = require("./authMiddleware");
const { createError } = require("../utils/errorHelpers");
const { createResponseObject } = require("../utils/responseHelpers");
const { extractRole } = require("../utils/middlewares");

const componentRoutes = function (componentController, pageController) {
  const router = express.Router();

  router.get("/public", extractRole, async (req, res, next) => {
    if (!req.project_id) return createError(400, "project_id is required");

    try {
      let components = await componentController.getComponentsFromProject(
        req.project_id
      );

      components = components.filter(
        (component) => component.visibility === "public"
      );

      return res.send(
        createResponseObject(
          { components },
          "successfully retrieved public components"
        )
      );
    } catch (err) {
      return next(err);
    }
  });

  router.get("/", requireAuth, extractRole, async (req, res, next) => {
    if (!req.project_id) return createError(400, "project_id is required");

    const isOwnerOrGuest = req.role === "admin" || req.role === "guest";

    try {
      let components = await componentController.getComponentsFromProject(
        req.project_id
      );

      if (!isOwnerOrGuest) {
        components = components.filter(
          (component) => component.visibility === "public"
        );
      }

      return res.send(
        createResponseObject(
          { components },
          "successfully retrieved components"
        )
      );
    } catch (err) {
      return next(err);
    }
  });

  router.get("/:component_id/public", extractRole, async (req, res, next) => {
    if (!req.project_id) return createError(400, "project_id is required");

    const { component_id } = req.params;
    if (!component_id)
      return next(createError(400, "component_id is required"));

    try {
      const component = await componentController.getComponent(component_id);

      if (component instanceof Error) return next(component);

      if (!component) return next(createError(404));

      if (component.visibility === "private") return next(createError(401));

      return res.send(
        createResponseObject({ component }, "successfully retrieved component")
      );
    } catch (err) {
      return next(createError(err.statusCode, err.message));
    }
  });

  router.get(
    "/:component_id",
    requireAuth,
    extractRole,
    async (req, res, next) => {
      if (!req.project_id) return createError(400, "project_id is required");

      const isOwnerOrGuest = req.role === "admin" || req.role === "guest";

      const { component_id } = req.params;
      if (!component_id)
        return next(createError(400, "component_id is required"));

      try {
        let component = await componentController.getComponent(component_id);

        if (component instanceof Error) return next(component);

        if (!component)
          return next(createError(404, "component could not be found"));

        if (!isOwnerOrGuest && component.visibility === "private")
          return next(createError(403));

        return res.send(
          createResponseObject(
            { component },
            "successfully retrieved component"
          )
        );
      } catch (err) {
        return next(createError(err.statusCode, err.message));
      }
    }
  );

  // Gets public components in a page given page id
  router.get("/page/:page_id/public", extractRole, async (req, res, next) => {
    const { page_id } = req.params;
    try {
      const page = await pageController.getPage(page_id);

      if (!page) return next(createError(400, "Invalid page_id"));

      if (page.visibility === "private") return next(createError(401));

      return res.send(
        createResponseObject(
          { components: page.components },
          "successfully retrieved component"
        )
      );
    } catch (err) {
      return next(createError(err.statusCode, err.message));
    }
  });

  // Gets all components in a page given page id
  router.get(
    "/page/:page_id",
    requireAuth,
    extractRole,
    async (req, res, next) => {
      try {
        const user = req.user;
        if (!user) return next(createError(401));

        const project_id = req.project_id;
        if (!project_id)
          return next(createError(400, "project_id is required"));

        const { page_id } = req.params;

        const isOwnerOrGuest = req.role === "admin" || req.role === "guest";

        const page = await componentController.getComponentsFromPage(page_id);

        if (isOwnerOrGuest) {
          return res.send(
            createResponseObject(
              page.components,
              "successfully retrieved component"
            )
          );
        } else {
          if (page.visibility === "private") return next(createError(403));

          const components = page.filter(
            (component) => component.visibility === "public"
          );

          return res.send(createResponseObject(components));
        }
      } catch (err) {
        return next(createError(err.statusCode, err.message));
      }
    }
  );

  router.post("/", requireAuth, extractRole, async (req, res, next) => {
    if (!req.project_id)
      return next(createError(400, "project_id is required"));

    if (req.role !== "admin")
      return next(
        createError(403, "Only project owners are allowed to make changes")
      );

    const { name, description, snippet, pages } = req.body;
    if (!name || !description || !snippet || !pages)
      return next(
        createError(400, "Name, description, snipper, and pages are required")
      );

    try {
      const newComponent = await componentController.postComponent(
        name,
        description,
        snippet,
        pages,
        req.project_id
      );

      if (newComponent instanceof Error) return next(newComponent);
      if (!newComponent)
        return next(createError(500, "Error creating component"));

      return res.send(
        createResponseObject(
          { component_id: newComponent._id },
          "successfully posted component"
        )
      );
    } catch (err) {
      next(createError(err.statusCode, err.message));
    }
  });

  return router;
};

module.exports = componentRoutes;
