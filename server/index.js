import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import authRouter from "./routes/auth.js";
import departmentRouter from "./routes/department.js";
import connectToDatabase from "./db/db.js";
import employeeRouter from "./routes/employee.js";
import salaryRouter from "./routes/salary.js";
import leaveRouter from "./routes/leave.js";
import settingRouter from "./routes/setting.js";
import dashboardRouter from "./routes/dashboard.js";
import attendenceRouter from "./routes/attendence.js";

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsPath = path.join(__dirname, "public", "uploads");

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(uploadsPath));
app.use(express.static(uploadsPath));

connectToDatabase();

app.use("/api/auth", authRouter);
app.use("/api/department", departmentRouter);
app.use("/api/employee", employeeRouter);
app.use("/api/salary", salaryRouter);
app.use("/api/leave", leaveRouter);
app.use("/api/setting", settingRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/attendence", attendenceRouter);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "EMS Backend API is running",
    });
});

app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "EMS API is healthy",
    });
});

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "production") {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

export default app;