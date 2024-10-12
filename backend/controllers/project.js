const { ProjectModel } = require("../models/project");

exports.getAllProducts = async (req, res, next) => {
  try {
    res.send([{ name: "test project 1" }, { name: "test project 2" }]);
  } catch (err) {
    next(err);
  }
};

exports.postNewProduct = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    if (!name || !description)
      return res.status(400).send("Name and Descriptions are required");

    let newProject = new ProjectModel({ name, description });
    newProject = await newProject.save();
    res.send(newProject);
  } catch (err) {
    next(err);
  }
};
