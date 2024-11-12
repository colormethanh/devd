const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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

const TaskModel = mongoose.model("Task", TaskSchema);

module.exports = TaskModel;
