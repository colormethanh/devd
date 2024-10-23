const express = require("express");
const { requireAuth } = require("./authMiddleware");
const { createError } = require("../utils/errorHelpers");
const { createResponseObject } = require("../utils/responseHelpers");
const { checkIsOwnerOrGuest, checkIsOwner } = require("../utils/authHelpers");
const { extractRole } = require("../utils/middlewares");

const pageRoutes = function (pageController) {
  const router = express.Router();

  // Get public pages from project
  router.get("/public", extractRole, async (req, res, next) => {
    try {
      const project_id = req.project_id;
      if (!project_id) return next(createError(400, "project_id is required"));

      let pages = await pageController.getPages(req.project_id);
      if (pages instanceof Error) return next(pages);

      pages = pages.filter((page) => page.visibility === "public");

      return res.send(createResponseObject({ pages }));
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
      if (!user) return next(createError(401));

      let pages = await pageController.getPages(req.project_id);

      if (pages instanceof Error) return next(pages);

      const isAdminOrGuest = await checkIsOwnerOrGuest(user, project_id);

      if (!isAdminOrGuest)
        pages = pages.filter((page) => page.visibility === "public");

      return res.send(createResponseObject({ pages }));
    } catch (err) {
      return next(err);
    }
  });

  router.get("/:page_id/public", extractRole, async (req, res, next) => {
    const { page_id } = req.params;

    if (!page_id) return next(createError(400, "page_id is required"));

    try {
      const page = await pageController.getPage(page_id);
      if (page instanceof Error) return next(page);
      if (!page) return next(createError(404));

      if (page.visibility === "private")
        return next(
          createError(403, "Must be guest or owner to view private pages")
        );

      return res.send(createResponseObject({ page }));
    } catch (err) {
      next(createError(err.statusCode, err.message));
    }
  });

  router.get("/:page_id", requireAuth, extractRole, async (req, res, next) => {
    const { page_id } = req.params;

    if (!page_id) return next(createError(400, "page_id is required"));

    try {
      const page = await pageController.getPage(page_id);
      if (page instanceof Error) return next(page);
      if (!page) return next(createError(404));

      const isOwnerOrGuest = req.role === "admin" || req.role === "guest";

      if (!isOwnerOrGuest && page.visibility === "private")
        return next(
          createError(403, "Must be guest or owner to view private pages")
        );

      return res.send(createResponseObject({ page }));
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

      const { name, description } = req.body;

      if (!name || !description)
        return next(createError(400, "Name and Description required"));

      const isOwner = req.role === "admin" ? true : false;

      if (!isOwner)
        return next(
          createError(403, "Only admin rights required to make changes")
        );

      const newPage = await pageController.postPage(
        name,
        description,
        req.project_id
      );

      if (newPage instanceof Error) return next(newPage);

      return res.send(createResponseObject({ page_id: newPage._id }));
    } catch (err) {
      return next(err);
    }
  });

  return router;
};

module.exports = pageRoutes;
