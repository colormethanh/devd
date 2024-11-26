const ProjectModel = require("../models/Project");
const UserModel = require("../models/User");
const { createError } = require("../utils/errorHelpers");
const logger = require("../utils/logging/logger");

exports.getAllProjects = async () => {
  try {
    const projects = await ProjectModel.find({});
    return projects;
  } catch (err) {
    return createError(err.statusCode, err.message);
  }
};

exports.postNewProject = async (name, description, userId) => {
  try {
    if (!name || !description || !userId)
      return createError(400, "Name, Description, and userId are required");

    const user = await UserModel.findById(userId);
    if (!user) return createError(404, "Could not find user");

    let newProject = new ProjectModel({
      name,
      description,
      owner: userId,
      date_created: Date.now(),
      url: "",
    });
    newProject = await newProject.save();

    user.projects.push({ project_id: newProject._id, role: "admin" });

    user.save();
    return newProject;
  } catch (err) {
    return createError(err.statusCode, err.message);
  }
};

exports.getProject = async (projectId) => {
  try {
    if (!projectId) return createError("Project Id is required", 400);

    const project = await ProjectModel.findById(projectId).populate(
      "tasks components pages",
      "name _id status"
    );

    return project;
  } catch (err) {
    return createError(err.statusCode, err.message);
  }
};

exports.getProjectForShowcase = async (projectName) => {
  try {
    if (!projectName) return createError("Project Id is required", 400);

    const project = await ProjectModel.findOne({ name: projectName })
      .populate({
        path: "components",
        select: "name _id description images",
        match: { visibility: "public" },
      })
      .populate({
        path: "pages",
        select: "name _id description features components images",
        match: { visibility: "public" },
      })
      .populate({
        path: "owner",
        select: "username _id projects",
      })
      .populate({
        path: "tasks",
        select: "name _id",
      });
    return project;
  } catch (err) {
    return createError(err.statusCode, err.message);
  }
};

exports.updateProject = async (projectId, updates) => {
  try {
    const updatedProject = await ProjectModel.findByIdAndUpdate(
      projectId,
      { $set: updates },
      { new: true, runValidators: true }
    );

    return updatedProject;
  } catch (err) {
    return createError(err.statusCode, err.message);
  }
};

exports.deleteProject = async (projectId) => {
  try {
    logger.info(`Initiating deletion of project ${projectId}`);
    await ProjectModel.findByIdAndDelete(projectId);
    const successMessage = `successfully deleted project ${projectId}`;
    logger.info(successMessage);
    return successMessage;
  } catch (err) {
    return createError(err.statusCode, err.message);
  }
};
