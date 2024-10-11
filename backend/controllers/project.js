const { ProjectModel } = require("../models/ModelsStore");

exports.getAllProducts = async (req, res, next) => {
  try {
    res.send([{ name: "test project 1" }, { name: "test project 2" }]);
  } catch (err) {
    next(err);
  }
};

exports.postNewProduct = async (req, res, next) => {
  try {
    res.status(200).send("Post request retrieved");
  } catch (err) {
    next(err);
  }
};
