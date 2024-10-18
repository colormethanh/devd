const express = require("express");
const { requireAuth } = require("./authMiddleware");
const { createError } = require("../utils/errorHelpers");
const { createResponseObject } = require("../utils/responseHelpers");

const pageRoutes = function (pageController) {
  const router = express.Router();

  router.get("/", async (req, res, next) => {
    try {
      if (!req.project_id)
        return next(createError(400, "project_id is required"));
      const pages = await pageController.getPages(req.project_id);

      if (pages instanceof Error) return next(pages);

      return res.send(createResponseObject(pages));
    } catch (err) {
      return next(err);
    }
  });

  router.post("/", requireAuth, async (req, res, next) => {
    try {
      const { name, description } = req.body;

      if (!name || !description)
        return next(createError(400, "Name and Description required"));

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

  router.get("/:page_id", async (req, res, next) => {
    const { page_id } = req.params;

    if (!page_id) return next(createError(400, "page_id is required"));

    try {
      const page = await pageController.getPage(page_id);
      if (page instanceof Error) return next(page);
      if (!page) return next(createError(404));

      return res.send(createResponseObject({ page }));
    } catch (err) {
      next(createError(err.statusCode, err.message));
    }
  });

  return router;
};

module.exports = pageRoutes;
