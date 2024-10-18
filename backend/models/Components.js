const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// Define the schema
const ComponentSchema = new Schema({
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
  snippet: {
    type: String,
    required: true,
  },
  children: [
    {
      type: Schema.Types.ObjectId,
      ref: "Component",
    },
  ],
  parents: [
    {
      type: Schema.Types.ObjectId,
      ref: "Component",
      required: true,
    },
  ],
  status: {
    type: String,
    enum: ["backlog", "inProgress", "done"],
    default: "backlog",
  },
  images: [
    {
      type: String, // Image URLs as strings
    },
  ],
  project: {
    type: Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  visibility: {
    type: String,
    enum: ["private", "public"],
    default: "private",
  },
});

// Create the model
const ComponentModel = model("component", ComponentSchema);

module.exports = ComponentModel;
