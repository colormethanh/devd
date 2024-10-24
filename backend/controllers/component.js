const ComponentModel = require("../models/Components");
const ProjectModel = require("../models/Project");
const PageModel = require("../models/Page");
const { createError } = require("../utils/errorHelpers");

exports.getComponentsFromProject = async (project_id) => {
  try {
    const project = await ProjectModel.findById(project_id)
      .select("components")
      .populate("components");

    return project.components;
  } catch (err) {
    return createError(err.statusCode, err.message);
  }
};

exports.getComponentsFromPage = async (page_id) => {
  try {
    const page = await PageModel.findById(page_id).populate("components");

    return page;
  } catch (err) {
    return createError(err.statusCode, err.message);
  }
};

exports.getComponent = async (component_id) => {
  try {
    let component;

    component = await ComponentModel.findById(component_id);

    if (!component) return createError(404);

    return component;
  } catch (err) {
    return createError(err.statusCode || 400, err.message);
  }
};

exports.postComponent = async (
  name,
  description,
  snippet,
  pages,
  project_id
) => {
  try {
    const newComponent = new ComponentModel({
      name,
      description,
      date_created: Date.now(),
      snippet: snippet,
      children: [],
      parents: [],
      images: [],
      project: project_id,
    });

    await newComponent.save();

    await Promise.all(
      pages.map(async (page_id) => {
        const page = await PageModel.findById(page_id);
        page.components.push(newComponent._id);
        return page.save();
      })
    );

    return newComponent;
  } catch (err) {
    return createError(err.statusCode, err.message);
  }
};
