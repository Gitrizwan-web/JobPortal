import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./utilz/db.js";
import userroute from "./routes/user.route.js";
import companyroute from "./routes/company.route.js";
import jobroute from "./routes/job.route.js";
import applicationroute from "./routes/application.route.js";
import path from "path";

const app = express();
dotenv.config({});
const _dirname = path.resolve();
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:5173", // Fixed URL typo
  credentials: true, // Fixed typo: `Credentials` to `credentials`
};
app.use(cors(corsOptions));

// Connect to Database
connectDB();

// Routes
app.use("/api/v1/user", userroute); // Fixed missing `/` in route prefix
app.use("/api/v1/company", companyroute); // Fixed missing `/` in route prefix
app.use("/api/v1/job", jobroute); // Fixed missing `/` in route prefix
app.use("/api/v1/application", applicationroute); // Fixed missing `/` in route prefix
app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
});
// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
