const ProjectModel = require("../models/Project");
const UserModel = require("../models/User");

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
      throw Error("Name, description, and userId was not provided");

    const user = await UserModel.findById(userId);
    if (!user) throw Error("user does not exist");

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
    if (!projectId) throw Error("Project Id is required");

    const project = await ProjectModel.findById(projectId);

    return project;
  } catch (err) {
    throw Error(err);
  }
};
