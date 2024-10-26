const PageModel = require("../models/Page");
const ProjectModel = require("../models/Project");
const { createError } = require("../utils/errorHelpers");

exports.getPages = async (project_id) => {
  try {
    const Project = await ProjectModel.findById(project_id)
      .select("-_id pages")
      .populate("pages");

    return Project.pages;
  } catch (err) {
    return createError(err.statusCode, err.message);
  }
};

exports.getPage = async (page_id) => {
  try {
    const page = await PageModel.findById(page_id);
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

exports.updatePage = async (pageId, updates) => {
  try {
    const updatedPage = await PageModel.findByIdAndUpdate(
      pageId,
      { $set: updates },
      { new: true, runValidators: true }
    );

    return updatedPage;
  } catch (err) {
    return createError(err.statusCode, err.message);
  }
};
