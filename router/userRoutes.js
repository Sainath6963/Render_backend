import express, { Router } from "express";
import {
  forgotPassword,
  getUser,
  logout,
  register,
  resetPassword,
  updatePassword,
  updatePorfile,
} from "../controller/userController.js";
import { login } from "../controller/userController.js";
import { isAuthenticated } from "../middleware/auth.js";
import { getUserForPortfolio } from "../controller/userController.js";

const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.get("/me", isAuthenticated, getUser);
router.put("/update/me", isAuthenticated, updatePorfile);
router.put("/update/password", isAuthenticated, updatePassword);
router.get("/me/portfolio", getUserForPortfolio);
router.post("/forgotPassword", forgotPassword);
router.put("/password/reset/:token", resetPassword);

export default router;
