import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
      deployed: { type: Boolean, required: true }, // ✅ Now required
    },
    description: {
      type: String,
      required: [true, "Project description is required"], // ✅ Now required
    },
    gitRepoLink: {
      type: String,
      required: [true, "GitHub repository link is required"],
      match: [
        /^(https?:\/\/)?(www\.)?github\.com\/[A-Za-z0-9_.-]+\/?[A-Za-z0-9_.-]*$/,
        "Please enter a valid GitHub repository URL",
      ], // ✅ URL validation
    },
    projectLink: {
      type: String,
      match: [
        /^(https?:\/\/)[A-Za-z0-9-._~:/?#[\]@!$&'()*+,;=%]+$/,
        "Please enter a valid project URL",
      ], // ✅ URL validation
    },
    technologies: {
      type: [String], // ✅ Array to store multiple technologies
      required: [true, "Technologies are required"],
    },
    stack: {
      type: [String], // ✅ Array for stack details
      required: [true, "Stack information is required"],
    },
    deployed: {
      type: Boolean,
      required: true,
      default: false, // ✅ Default to false
    },
    projectBanner: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true } // ✅ Added timestamps
);

export const Project = mongoose.model("Project", projectSchema);
