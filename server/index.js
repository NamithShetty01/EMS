import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import authRouter from './routes/auth.js'
import departmentRouter from './routes/department.js'
import connectToDatabase from './db/db.js'
import employeeRouter from './routes/employee.js'
import salaryRouter from './routes/salary.js'
import leaveRouter from './routes/leave.js'
import settingRouter from './routes/setting.js'
import dashboardRouter from './routes/dashboard.js'
import attendenceRouter from './routes/attendence.js'

connectToDatabase()
const app = express()
app.use(cors())
app.use(express.json());

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const uploadsPath = path.join(__dirname, 'public', 'uploads')

// Serve uploaded files at /uploads and keep root static for backward compatibility.
app.use('/uploads', express.static(uploadsPath))
app.use(express.static(uploadsPath))

dotenv.config();
app.use('/api/auth',authRouter)
app.use('/api/department', departmentRouter)
app.use('/api/employee', employeeRouter)
app.use('/api/salary', salaryRouter)
app.use('/api/leave', leaveRouter)
app.use('/api/setting', settingRouter)
app.use('/api/dashboard', dashboardRouter)
app.use('/api/attendence', attendenceRouter)


const PORT =process.env.PORT ||5000;
app.listen(PORT, () =>{
    console.log(`Server is Running on port ${process.env.PORT}`)
})
