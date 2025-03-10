import express from "express";
import {
  postTimeline,
  getAllTimeline,
  deleteTimeline,
} from "../controller/timelineController.js";

import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/add", isAuthenticated, postTimeline);
router.delete("/deleteTimeline/:id", isAuthenticated, deleteTimeline);
router.get("/getall", getAllTimeline);

export default router;
