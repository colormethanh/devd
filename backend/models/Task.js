const mongoose = require("mongoose");
const ProjectModel = require("./Project");
const Schema = mongoose.Schema;
const logger = require("../utils/logging/logger");

const relevantContentSchema = new mongoose.Schema({
  content_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "relevant_contents.content_type",
  },
  content_type: {
    type: String,
    required: true,
    enum: ["Page", "Component"],
  },
  content_name: {
    type: String,
  },
});

const TaskSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date_created: {
    type: String,
    required: true,
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  status: {
    type: String,
    enum: ["backlog", "inProgress", "done"],
    required: true,
  },
  relevant_contents: [relevantContentSchema],
});

TaskSchema.pre("findOneAndDelete", async function (next) {
  try {
    logger.info("initiating task schema pre-middleware for findOneAndDelete");
    const taskId = this.getQuery()._id;

    const task = await mongoose.model("Task").findOne({ _id: taskId });
    if (!task) throw Error();

    const project = await ProjectModel.findById(task.project);

    // Delete task from Parent Project's tasks list
    const projectUpdate = await ProjectModel.findByIdAndUpdate(task.project, {
      $pull: { tasks: task._id },
    });
    console.log(projectUpdate);
  } catch (err) {
    logger.error(`error in task schema pre-middleware for findOneAndDelete`);
    next(err);
  }
});

const TaskModel = mongoose.model("Task", TaskSchema);

module.exports = TaskModel;
