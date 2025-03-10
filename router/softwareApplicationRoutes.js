import express from "express";
import {
  addNewApplication,
  deleteApplication,
  getAllApplications,
} from "../controller/softwareApplicationController.js";

import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/addApplications", isAuthenticated, addNewApplication);
router.delete("/deleteApplications/:id", isAuthenticated, deleteApplication);
router.get("/getallApplications", getAllApplications);

export default router;
