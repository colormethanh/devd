const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const componentsModel = require("./Components");
const pageModel = require("./Page");
const userModel = require("./User");
const logger = require("../utils/logging/logger");

const projectSchema = new Schema({
  description: { type: String, required: true },
  url: { type: String },
  date_created: { type: Number, required: true },
  name: { type: String, required: true, unique: true },
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  features: [{ type: String }],
  components: [{ type: Schema.Types.ObjectId, ref: "Component" }],
  pages: [{ type: Schema.Types.ObjectId, ref: "Page" }],
  tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  guests: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

projectSchema.pre("findOneAndDelete", async function (next) {
  try {
    logger.info(
      "initiating project schema pre-middleware for findOneAndDelete"
    );
    const projectId = this.getQuery()._id;

    const project = await mongoose.model("Project").findOne({ _id: projectId });
    const owner = project.owner;

    await componentsModel.deleteMany({ project: projectId });
    await pageModel.deleteMany({ project: projectId });
    await userModel.findOne({ _id: owner });
    const updates = await userModel.updateOne(
      { _id: owner },
      { $pull: { projects: { project_id: projectId } } }
    );
  } catch (err) {
    logger.error(
      `error in project schema pre-middleware for findOneAndDelete ${err.message}`
    );
    next(err);
  }
});

const ProjectModel = mongoose.model("Project", projectSchema);

module.exports = ProjectModel;
