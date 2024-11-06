const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
  relevant_contents: [
    {
      content_id: {
        ref: "Page",
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      content_type: {
        type: String,
        enum: ["page"],
        required: true,
      },
    },
    {
      content_id: {
        ref: "Component",
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      content_type: {
        type: String,
        enum: ["component"],
        required: true,
      },
    },
    // {
    //   ref: 'Bug',         // Reference to the Bug model
    //   type: mongoose.Schema.Types.ObjectId,
    // }
  ],
});

const TaskModel = mongoose.model("Task", TaskSchema);

module.exports = TaskModel;
