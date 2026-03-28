import Employee from '../models/Employee.js';
import Attendance from '../models/Attendance.js';

const defaultAttendance = async (req, res, next) => {
    try {
        const date = new Date().toISOString().split('T')[0];

        const existingAttendance = await Attendance.findOne({ date });

        if (!existingAttendance) {
            const employees = await Employee.find({});

            const attendance = employees.map(employee => ({
                date,
                employeeId: employee._id,
                status: null
            }));

            await Attendance.insertMany(attendance);
        }

        next();
    } catch (error) {
        console.error("❌ Error in defaultAttendance:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export default defaultAttendance;
