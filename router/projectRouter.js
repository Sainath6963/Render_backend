import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import {
  addNewProject,
  updateProject,
  deleteProject,
  getAllProjects,
  getSingleProject,
} from "../controller/projectController.js";

const router = express.Router();

router.post("/add", isAuthenticated, addNewProject);
router.delete("/delete/:id", isAuthenticated, deleteProject);
router.put("/update/:id", isAuthenticated, updateProject);
router.get("/getAll", getAllProjects);
router.get("/getSingle/:id", getSingleProject);

export default router;
