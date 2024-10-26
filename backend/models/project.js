const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const componentsModel = require("./Components");
const pageModel = require("./Page");
const logger = require("../utils/logging/logger");

const projectSchema = new Schema({
  description: { type: String, required: true },
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

    await componentsModel.deleteMany({ project: projectId });
    await pageModel.deleteMany({ project: projectId });
  } catch (err) {
    logger.error(
      `error in project schema pre-middleware for findOneAndDelete ${err.message}`
    );
    next(err);
  }
});

const ProjectModel = mongoose.model("Project", projectSchema);

module.exports = ProjectModel;
