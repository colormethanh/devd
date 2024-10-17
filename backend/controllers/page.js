const PageModel = require("../models/Page");
const ProjectModel = require("../models/Project");
const { createError } = require("../utils/errorHelpers");

exports.getPages = async (project_id) => {
  try {
    const Pages = await ProjectModel.findById(project_id).select("-_id pages");

    return Pages;
  } catch (err) {
    return createError(err.statusCode, err.message);
  }
};

exports.getPage = async (page_id) => {
  try {
    const page = PageModel.findById(page_id);
    return page;
  } catch (err) {
    return createError(err.statusCode, err.message);
  }
};

exports.postPage = async (name, description, project) => {
  try {
    const newPage = new PageModel({
      name,
      description,
      project,
      visibility: "private",
      date_created: Date.now(),
    });

    await newPage.save();

    const parentProject = await ProjectModel.findById(project);
    parentProject.pages.push(newPage._id);

    await parentProject.save();

    return newPage;
  } catch (err) {
    return createError(err.statusCode, err.message);
  }
};
