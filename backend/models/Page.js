const mongoose = require("mongoose");
const Schema = mongoose.Schema;

pageSchema = new Schema({
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
  project: { type: Schema.Types.ObjectId, ref: "Project", required: true },
  features: [{ text: { type: String } }],
  components: [{ type: Schema.Types.ObjectId, ref: "Component" }],
  images: [{ title: { type: String }, url: { type: String } }],
  visibility: { type: String, enum: ["private", "public"], required: true },
});

const PageModel = mongoose.model("Page", pageSchema);

module.exports = PageModel;
