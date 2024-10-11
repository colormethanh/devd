const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define our model
const projectSchema = new Schema({
  description: { type: String, required: true },
  date_created: Number,
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  features: [{ type: Schema.Types.ObjectId, ref: "Feature" }],
  components: [{ type: Schema.Types.ObjectId, ref: "Component" }],
  pages: [{ type: Schema.Types.ObjectId, ref: "Page" }],
  tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  guests: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const ProjectModel = mongoose.model("project", projectSchema);

module.exports = {
  ProjectModel,
};
