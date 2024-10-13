const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  description: { type: String, required: true },
  date_created: { type: Number, required: true },
  name: { type: String, required: true, unique: true },
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  features: [{ type: Schema.Types.ObjectId, ref: "Feature" }],
  components: [{ type: Schema.Types.ObjectId, ref: "Component" }],
  pages: [{ type: Schema.Types.ObjectId, ref: "Page" }],
  tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  guests: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const ProjectModel = mongoose.model("project", projectSchema);

module.exports = ProjectModel;
