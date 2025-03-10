import express from "express";
import { sendMessage } from "../controller/messageController.js";
import {
  getAllMessages,
  deleteMessage,
} from "../controller/messageController.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/send", sendMessage);
router.get("/getall", isAuthenticated, getAllMessages);
router.delete("/delete/:id", isAuthenticated, deleteMessage);

export default router;
