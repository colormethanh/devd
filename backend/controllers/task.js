const TaskModel = require("../models/Task");
const ProjectModel = require("../models/Project");

const { createError } = require("../utils/errorHelpers");
const logger = require("../utils/logging/logger");

exports.getTasksFromProject = async (project_id) => {
  try {
    const tasks = await TaskModel.find({ project: project_id });
    return tasks;
  } catch (err) {
    return createError(err.statusCode, err.message);
  }
};

exports.getTask = async (task_id) => {
  try {
    const task = await TaskModel.findById(task_id);
    return task;
  } catch (err) {
    return createError(err.statusCode, err.message);
  }
};

exports.postNewTask = async (name, description, project_id) => {
  try {
    if (!name || !description || !project_id)
      return createError(400, "Name, Description, and project_id are required");

    const project = await ProjectModel.findById(project_id);
    if (!project) return createError(404, "could not find project");

    let newTask = new TaskModel({
      name,
      description,
      date_created: Date.now(),
      project: project_id,
      status: "backlog",
    });

    newTask = await newTask.save();

    project.tasks.push(newTask._id);
    await project.save();

    return newTask;
  } catch (err) {
    return createError(err.statusCode, err.message);
  }
};

exports.updateTask = async (task_id, updates) => {
  try {
    const updatedTask = await TaskModel.findByIdAndUpdate(
      task_id,
      { $set: updates },
      { new: true, runValidators: true }
    );
    return updatedTask;
  } catch (err) {
    return createError(err.statusCode, err.message);
  }
};
