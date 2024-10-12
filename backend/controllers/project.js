const { ProjectModel } = require("../models/Project");
const { UserModel } = require("../models/User");

exports.getAllProjects = async (req, res, next) => {
  try {
    const projects = await ProjectModel.find({});
    res.send(projects);
  } catch (err) {
    next(err);
  }
};

exports.postNewProjects = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    const user = await UserModel.findOne({ _id: req.user._id });

    if (!name || !description)
      return res.status(400).send("Name and Descriptions are required");

    let newProject = new ProjectModel({ name, description, owner: user });
    newProject = await newProject.save();

    user.projects.push({ project_id: newProject._id, role: "admin" });
    user.save();
    res.send(newProject);
  } catch (err) {
    next(err);
  }
};
