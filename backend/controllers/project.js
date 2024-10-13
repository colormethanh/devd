const ProjectModel = require("../models/Project");
const UserModel = require("../models/User");
const { createError } = require("../utils/errorHelpers");

exports.getAllProjects = async () => {
  try {
    const projects = await ProjectModel.find({});
    return projects;
  } catch (err) {
    throw Error(err);
  }
};

exports.postNewProject = async (name, description, userId) => {
  try {
    if (!name || !description || !userId)
      return createError("Name, Description, and userId are required", 400);

    const user = await UserModel.findById(userId);
    if (!user) return createError("Could not find user", 404);

    // todo: If project saves but user does not save? We should delete the project
    let newProject = new ProjectModel({
      name,
      description,
      owner: user,
      date_created: Date.now(),
    });
    newProject = await newProject.save();

    user.projects.push({ project_id: newProject._id, role: "admin" });

    user.save();
    return newProject;
  } catch (err) {
    throw Error(err);
  }
};

exports.getProject = async (projectId) => {
  try {
    if (!projectId) return createError("Project Id is required", 400);

    const project = await ProjectModel.findById(projectId);

    return project;
  } catch (err) {
    throw Error(err);
  }
};
