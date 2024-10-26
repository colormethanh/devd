const express = require("express");
const { requireAuth } = require("./authMiddleware");
const { createError } = require("../utils/errorHelpers");
const { createResponseObject } = require("../utils/responseHelpers");
const { extractRole } = require("../utils/middlewares");
const logger = require("../utils/logging/logger");
const { hasOne, fillObjectWithFromBody } = require("../utils/requestHelpers");

const pageRoutes = function (pageController) {
  const router = express.Router();

  // Get public pages from project
  router.get("/public", extractRole, async (req, res, next) => {
    try {
      const project_id = req.project_id;
      if (!project_id) return next(createError(400, "project_id is required"));

      logger.info({
        message: `searching DB for pages in project ${project_id}`,
        request_id: req.metadata.request_id,
      });
      let pages = await pageController.getPages(req.project_id);
      if (pages instanceof Error) return next(pages);

      pages = pages.filter((page) => page.visibility === "public");

      return res.send(
        createResponseObject(
          { pages },
          "Successfully retrieved public projects"
        )
      );
    } catch (err) {
      return next(err);
    }
  });

  // get all pages from a project
  router.get("/", requireAuth, extractRole, async (req, res, next) => {
    try {
      const project_id = req.project_id;
      if (!project_id) return next(createError(400, "project_id is required"));

      const user = req.user;
      if (!user) return next(createError(401, "Unauthorized or expired token"));

      let pages = await pageController.getPages(req.project_id);

      if (pages instanceof Error) return next(pages);

      const isAdminOrGuest = req.role === "admin" || req.role === "guest";

      if (!isAdminOrGuest)
        pages = pages.filter((page) => page.visibility === "public");

      return res.send(
        createResponseObject(
          { pages },
          "successfully retrieved pages for project"
        )
      );
    } catch (err) {
      return next(err);
    }
  });

  // get a public page by it's page id
  router.get("/:page_id/public", extractRole, async (req, res, next) => {
    const { page_id } = req.params;

    if (!page_id) return next(createError(400, "page_id is required"));

    try {
      logger.info({
        message: `attempting to search DB for page ${page_id}, request_id: request.metadata.request_id,`,
      });
      const page = await pageController.getPage(page_id);
      if (page instanceof Error) return next(page);
      if (!page) return next(createError(404, "page could not be found"));

      if (page.visibility === "private")
        return next(
          createError(403, "Must be guest or owner to view private pages")
        );

      return res.send(
        createResponseObject({ page }, "successfully retrieved page")
      );
    } catch (err) {
      next(createError(err.statusCode, err.message));
    }
  });

  // get a page by it's page id
  router.get("/:page_id", requireAuth, extractRole, async (req, res, next) => {
    const { page_id } = req.params;

    if (!page_id) return next(createError(400, "page_id is required"));

    try {
      const page = await pageController.getPage(page_id);

      if (page instanceof Error) return next(page);

      if (!page) return next(createError(404, "page could not be found"));

      const isOwnerOrGuest = req.role === "admin" || req.role === "guest";

      if (!isOwnerOrGuest && page.visibility === "private")
        return next(
          createError(403, "Must be guest or owner to view private pages")
        );

      return res.send(
        createResponseObject({ page }, "successfully retrieved page")
      );
    } catch (err) {
      next(createError(err.statusCode, err.message));
    }
  });

  // post a new page
  router.post("/", requireAuth, extractRole, async (req, res, next) => {
    try {
      const project_id = req.project_id;
      if (!project_id) return next(createError(400, "project_id is required"));

      const user = req.user;
      if (!user) return next(createError(401));

      const { name, description } = req.body;

      if (!name || !description)
        return next(createError(400, "Name and Description required"));

      const isOwner = req.role === "admin";

      if (!isOwner)
        return next(createError(403, "admin rights required to make changes"));

      logger.info({
        message: "attempting to post new page to DB",
        request_id: req.metadata.request_id,
      });
      const newPage = await pageController.postPage(
        name,
        description,
        req.project_id
      );

      if (newPage instanceof Error) return next(newPage);

      return res.send(
        createResponseObject(
          { page_id: newPage._id },
          "successfully posted page"
        )
      );
    } catch (err) {
      return next(err);
    }
  });

  // update a page
  // *user should only update name, description, features, visibility
  router.put("/:page_id", requireAuth, extractRole, async (req, res, next) => {
    try {
      logger.info({
        message: "initiating check for page update",
        request_id: req.metadata.request_id,
      });
      const { page_id } = req.params;
      const project = req.project;

      // check to see if page exists
      const originalPage = await pageController.getPage(page_id);
      if (!originalPage) next(createError(404, "page could not be found"));
      if (originalPage instanceof Error) next(originalPage);

      // check to see if project contains page id
      const projectContainsPage = await project.pages.find(
        (page) => page.toString() === page_id
      );
      if (!projectContainsPage)
        next(createError(400, `Project does not contain page ${page_id}`));

      // check to see if user is authorized to modify page
      const isAdmin = req.role === "admin";
      if (!isAdmin)
        return next(
          createError(403, "Only admin may make changes to project pages")
        );

      // checking the request body

      const allowedUpdates = ["name", "description", "features", "visibility"];

      if (!hasOne(allowedUpdates, req.body))
        next(createError(400, "Must update at least one property"));

      const updates = fillObjectWithFromBody(
        allowedUpdates,
        req.body,
        originalPage
      );

      const updatedPage = pageController.updatePage(page_id, updates);

      if (!updatedPage) next(createError(500, "error when updating"));
      if (updatedPage instanceof Error) next(updatedPage);

      return res.send(createResponseObject({ updatedPage }));
    } catch (err) {
      next(createError(err.statusCode, err.message));
    }
  });

  return router;
};

module.exports = pageRoutes;
