const express = require("express");
const { requireAuth, requireProjectRole } = require("./authMiddleware");
const { createError } = require("../utils/errorHelpers");
const { createResponseObject } = require("../utils/responseHelpers");
const { extractRole } = require("../utils/middlewares");
const logger = require("../utils/logging/logger");
const { hasOne, fillObjectWithFromBody } = require("../utils/requestHelpers");
const upload = require("../services/cloudinary");

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

  router.put(
    "/:component_id",
    requireAuth,
    extractRole,
    async (req, res, next) => {
      try {
        logger.info({
          message: "initiating check for component update",
          user: req.user._id,
          request_id: req.metadata.request_id,
        });

        const { component_id } = req.params;

        // checks user's role
        const isAdmin = req.role === "admin";
        if (!isAdmin) next(createError(403, "Only admins may delete pages"));

        // check to see if component exists
        const componentToUpdate = await componentController.getComponent(
          component_id
        );
        if (componentToUpdate instanceof Error) next(componentToUpdate);
        if (!componentToUpdate) next(404, "component does not exist");

        // check to see if project contains component
        const projectContainsComponent = await req.project.components.find(
          (component) => component._id.toString() === component_id
        );
        if (!projectContainsComponent)
          next(
            createError(
              400,
              `Project does not contain component ${component_id}`
            )
          );

        // check the request body
        const allowedUpdates = [
          "name",
          "description",
          "snippet",
          "children",
          "parents",
          "status",
          "images",
          "visibility",
        ];
        if (!hasOne(allowedUpdates, req.body))
          next(createError(400, "Must update at least one property"));

        const updates = fillObjectWithFromBody(
          allowedUpdates,
          req.body,
          componentToUpdate
        );

        const updatedComponent = await componentController.updateComponent(
          component_id,
          updates
        );

        if (!updatedComponent) next(createError(500, "error when updating"));
        if (updatedComponent instanceof Error) next(updatedComponent);

        return res.send(createResponseObject({ updatedComponent }));
      } catch (err) {
        next(createError(err.statusCode, err.message));
      }
    }
  );

  router.put(
    "/:component_id/image",
    requireAuth,
    extractRole,
    upload.single("image"),
    async (req, res, next) => {
      try {
        logger.info({
          message: "initiating check for component update",
          user: req.user._id,
          request_id: req.metadata.request_id,
        });

        const { component_id } = req.params;

        // checks user's role
        const isAdmin = req.role === "admin";
        if (!isAdmin) next(createError(403, "Only admins may delete pages"));

        // check to see if component exists
        const componentToUpdate = await componentController.getComponent(
          component_id
        );
        if (componentToUpdate instanceof Error) next(componentToUpdate);
        if (!componentToUpdate) next(404, "component does not exist");

        // check to see if project contains component
        const projectContainsComponent = await req.project.components.find(
          (component) => component._id.toString() === component_id
        );
        if (!projectContainsComponent)
          next(
            createError(
              400,
              `Project does not contain component ${component_id}`
            )
          );

        // check that there is an image in req.file.path
        const image_url = req.file.path;
        if (!image_url)
          next(createError(500, "there was an error uploading the image"));

        // check if there is an image title
        const image_title = req.body.title;
        if (!image_title) next(createError(400, "Must provide image title"));

        const updatedImageArray = [
          ...componentToUpdate.images,
          { title: image_title, url: image_url },
        ];

        const updates = { images: updatedImageArray };

        // update and return pag
        const updatedComponent = await componentController.updateComponent(
          component_id,
          updates
        );

        if (!updatedComponent) next(createError(500, "error when updating"));
        if (updatedComponent instanceof Error) next(updatedComponent);

        return res.send(createResponseObject({ updatedComponent }));
      } catch (err) {
        next(createError(err.statusCode, err.message));
      }
    }
  );

  router.delete(
    "/:component_id",
    requireAuth,
    extractRole,
    async (req, res, next) => {
      try {
        logger.info({
          message: "Starting checks before component deletion",
          user: req.user._id,
          request_id: req.metadata.request_id,
        });

        const { component_id } = req.params;

        // check if admin
        const isAdmin = req.role === "admin";
        if (!isAdmin) next(createError(403, "Only admins way delete pages"));

        // check if exists
        const componentToDelete = await componentController.getComponent(
          component_id
        );

        if (componentToDelete instanceof Error) next(componentToDelete);
        if (!componentToDelete)
          next(createError(404, "component could not be found"));

        // check if component is part of project
        const projectContainsComponent = await req.project.components.find(
          (component) => component.toString() === component_id
        );
        if (!projectContainsComponent)
          next(
            createError(
              400,
              `Project does not contain component ${component_id}`
            )
          );

        const deleteMessage = await componentController.deleteComponent(
          component_id
        );
        res.send(createResponseObject(deleteMessage));
      } catch (err) {
        next(createError(err.statusCode, err.message));
      }
    }
  );

  return router;
};

module.exports = componentRoutes;
