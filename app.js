import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./middleware/error.js";
import messageRouter from "./router/messageRouter.js";
import userRouter from "./router/userRoutes.js";
import timelineRouter from "./router/timelineRouter.js";
import softwareApplicationRoutes from "./router/softwareApplicationRoutes.js";
import skillRoute from "./router/skillRoute.js";
import projecRoute from "./router/projectRouter.js";

dotenv.config({ path: "./config/config.env" });
console.log("COOKIE", process.env.COOKIE_EXPIRES);
console.log("KEY:", process.env.JWT_SECRET_KEY);
console.log("NODE ENV:", process.env.NODE_ENV);

const app = express();
app.use((req, res, next) => {
  const allowedOrigins = [
    "https://portfolio-mern-peach.vercel.app",
    "https://sainathdashboard09.netlify.app",
  ];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/timeline", timelineRouter);
app.use("/api/v1/softwareApplications", softwareApplicationRoutes);
app.use("/api/v1/Skill", skillRoute);
app.use("/api/v1/projects", projecRoute);

dbConnection();

app.use(errorMiddleware);

export default app;
