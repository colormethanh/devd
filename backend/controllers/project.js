const { ProjectModel } = require("../models/project");

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

    if (!name || !description)
      return res.status(400).send("Name and Descriptions are required");

    let newProject = new ProjectModel({ name, description });
    newProject = await newProject.save();
    res.send(newProject);
    // todo: Assign owner of project and add to user object
  } catch (err) {
    next(err);
  }
};
