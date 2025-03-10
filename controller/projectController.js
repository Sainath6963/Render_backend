import { catchAsyncError } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../middleware/error.js";
import { Project } from "../models/projectSchema.js";
import { v2 as cloudinary } from "cloudinary";

// ✅ Add New Project
export const addNewProject = catchAsyncError(async (req, res, next) => {
  if (!req.files || !req.files.projectBanner) {
    return next(new ErrorHandler("Project Banner Image Required", 400));
  }

  const { projectBanner } = req.files;
  const {
    title,
    description,
    gitRepoLink,
    projectLink,
    technologies,
    stack,
    deployed,
  } = req.body;

  if (
    !title ||
    !description ||
    !gitRepoLink ||
    !projectLink ||
    !technologies ||
    !stack
  ) {
    return next(new ErrorHandler("Please Provide All Required Details!", 400));
  }

  // ✅ Convert `deployed` to Boolean
  const isDeployed =
    deployed === "Yes" || deployed === "true" || deployed === true;

  // ✅ Upload Image to Cloudinary
  const cloudinaryResponse = await cloudinary.uploader.upload(
    projectBanner.tempFilePath,
    {
      folder: "PORTFOLIO PROJECT IMAGES",
    }
  );

  if (!cloudinaryResponse.secure_url) {
    return next(new ErrorHandler("Failed to upload banner to Cloudinary", 500));
  }

  // ✅ Create Project
  const project = await Project.create({
    title,
    description,
    gitRepoLink,
    projectLink,
    technologies,
    stack,
    deployed: isDeployed, // ✅ Boolean Fix
    projectBanner: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });

  res.status(201).json({
    success: true,
    message: "New Project Added!",
    project,
  });
});

// ✅ Update Project
export const updateProject = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  let project = await Project.findById(id);
  if (!project) {
    return next(new ErrorHandler("Project Not Found!", 404));
  }

  const updatedData = {
    title: req.body.title,
    description: req.body.description,
    gitRepoLink: req.body.gitRepoLink,
    projectLink: req.body.projectLink,
    technologies: req.body.technologies,
    stack: req.body.stack,
    deployed:
      req.body.deployed === "Yes" ||
      req.body.deployed === "true" ||
      req.body.deployed === true, // ✅ Boolean Fix
  };

  if (req.files && req.files.projectBanner) {
    const { projectBanner } = req.files;

    // ✅ Delete old image from Cloudinary
    if (project.projectBanner?.public_id) {
      await cloudinary.uploader.destroy(project.projectBanner.public_id);
    }

    // ✅ Upload new image
    const newProjectImage = await cloudinary.uploader.upload(
      projectBanner.tempFilePath,
      {
        folder: "PORTFOLIO PROJECT IMAGES",
      }
    );

    updatedData.projectBanner = {
      public_id: newProjectImage.public_id,
      url: newProjectImage.secure_url,
    };
  }

  // ✅ Update in DB
  project = await Project.findByIdAndUpdate(id, updatedData, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    message: "Project Updated!",
    project,
  });
});

// ✅ Delete Project
export const deleteProject = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const project = await Project.findById(id);

  if (!project) {
    return next(new ErrorHandler("Project Not Found!", 404));
  }

  // ✅ Delete image from Cloudinary
  if (project.projectBanner?.public_id) {
    await cloudinary.uploader.destroy(project.projectBanner.public_id);
  }

  await project.deleteOne();

  res.status(200).json({
    success: true,
    message: "Project Deleted!",
  });
});

// ✅ Get All Projects
export const getAllProjects = catchAsyncError(async (req, res) => {
  const projects = await Project.find();
  res.status(200).json({
    success: true,
    projects,
  });
});

// ✅ Get Single Project
export const getSingleProject = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const project = await Project.findById(id);

  if (!project) {
    return next(new ErrorHandler("Project Not Found!", 404));
  }

  res.status(200).json({
    success: true,
    project,
  });
});
