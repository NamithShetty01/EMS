import multer from "multer";
import Employee from "../models/Employee.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import path from "path";
import Department from "../models/Department.js";

// Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

// Add Employee Function
const addEmployee = async (req, res) => {
    try {
        const {
            name,
            email,
            employeeId,
            dob,
            gender,
            maritalStatus,
            designation,
            department,
            salary,
            password,
            role,
        } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, error: "User already registered." });
        }

        // Hash Password
        const hashPassword = await bcrypt.hash(password, 10);

        // Create New User
        const newUser = new User({
            name,
            email,
            password: hashPassword,
            role,
            profileImage: req.file ? req.file.filename : "",
        });

        const savedUser = await newUser.save();

        // Create New Employee
        const newEmployee = new Employee({
            userId: savedUser._id,
            employeeId,
            dob,
            gender,
            maritalStatus,
            designation,
            department,
            salary,
        });

        await newEmployee.save();

        return res.status(200).json({ success: true, message: "Employee created successfully!" });

    } catch (error) {
        console.error("❌ Server Error:", error);
        return res.status(500).json({ success: false, error: "Server error in adding employee" });
    }
};

// Get All Employees
const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find()
            .populate("userId", { password: 0 })
            .populate("department");
        return res.status(200).json({ success: true, employees });
    } catch (error) {
        console.error("Get Employee Error:", error);
        return res.status(500).json({ success: false, error: "Failed to fetch employees" });
    }
};

// Get Employee by ID
const getEmployee = async (req, res) => {
    const { id } = req.params;
    try {
        let employee;
         employee = await Employee.findById(id)
            .populate("userId", { password: 0 })
            .populate("department");

        if (!employee) {
           employee= await Employee.findOne({userId: id})
            .populate("userId", { password: 0 })
            .populate("department");
        }

        return res.status(200).json({ success: true, employee });
    } catch (error) {
        console.error("Get Employee Error:", error);
        return res.status(500).json({ success: false, error: "Failed to fetch employee" });
    }
};

// Update Employee
const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, maritalStatus, designation, department, salary } = req.body;

        // Find employee
        const employee = await Employee.findById(id);
        if (!employee) {
            return res.status(404).json({ success: false, error: "Employee not found" });
        }

        // Find associated user
        const user = await User.findById(employee.userId);
        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }

        // Update User's Name
        await User.findByIdAndUpdate(user._id, { name });

        // Update Employee Details
        const updatedEmployee = await Employee.findByIdAndUpdate(
            id,
            { maritalStatus, designation, salary, department },
            { new: true }
        );

        if (!updatedEmployee) {
            return res.status(500).json({ success: false, error: "Failed to update employee" });
        }

        return res.status(200).json({ success: true, message: "Employee updated successfully!" });

    } catch (error) {
        console.error("Update Employee Error:", error);
        return res.status(500).json({ success: false, error: "Failed to update employee" });
    }
};

// Fetch Employees by Department ID
const fetchEmployeesByDepId = async (req, res) => {
    const { id } = req.params;
    try {
        const employees = await Employee.find({ department: id }).populate("userId", { password: 0 });

        if (!employees.length) {
            return res.status(404).json({ success: false, error: "No employees found in this department" });
        }

        return res.status(200).json({ success: true, employees });
    } catch (error) {
        console.error("Fetch Employees By Department Error:", error);
        return res.status(500).json({ success: false, error: "Failed to fetch employees" });
    }
};

export { addEmployee, upload, getEmployees, getEmployee, updateEmployee, fetchEmployeesByDepId };
