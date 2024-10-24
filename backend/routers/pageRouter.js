const express = require("express");
const { requireAuth } = require("./authMiddleware");
const { createError } = require("../utils/errorHelpers");
const { createResponseObject } = require("../utils/responseHelpers");
const { extractRole } = require("../utils/middlewares");
const logger = require("../utils/logging/logger");

const pageRoutes = function (pageController) {
  const router = express.Router();

  // Get public pages from project
  router.get("/public", extractRole, async (req, res, next) => {
    try {
      const project_id = req.project_id;
      if (!project_id) return next(createError(400, "project_id is required"));

      logger.info(`searching DB for pages in project ${project_id}`);
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
      logger.info(`attempting to search DB for page ${page_id}`);
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

      logger.info("attempting to post new page to DB");
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

  return router;
};

module.exports = pageRoutes;
