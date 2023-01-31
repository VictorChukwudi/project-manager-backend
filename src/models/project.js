const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    desc: {
      type: String,
      required: true,
      trim: true,
    },
    url: {
      type: String,
      trim: true,
    },
    githubLink: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const Project = mongoose.model("project", projectSchema);
module.exports = Project;
