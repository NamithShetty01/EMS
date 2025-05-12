import Attendance from "../models/Attendance.js";
import Employee from "../models/Employee.js";
import Department from "../models/Department.js";  
import User from "../models/User.js";              

const getAttendance = async (req, res) => {
    try {
        const date = new Date().toISOString().split("T")[0];

        const attendance = await Attendance.find({ date, employeeId: { $ne: null } }).populate({
            path: "employeeId",
            populate: [
                { path: "department", model: "Department", select: "dep_name" }, 
                { path: "userId", model: "User", select: "name" }              
            ]
        });


        res.status(200).json({ success: true, attendance });
    } catch (error) {
        console.error("❌ ERROR in getAttendance:", error.stack || error.message || error);
        res.status(500).json({
            success: false,
            error: error.message || "Unknown server error"
        });
    }
};

const updateAttendance = async (req, res) => {
    try {
        const { employeeId } = req.params;
        const { status } = req.body;
        const date = new Date().toISOString().split("T")[0];

        const employee = await Employee.findOne({ employeeId });

        if (!employee) {
            return res.status(404).json({ success: false, message: "Employee not found" });
        }

        const attendance = await Attendance.findOneAndUpdate(
            { employeeId: employee._id, date },
            { status },
            { new: true }
        );

        if (!attendance) {
            return res.status(404).json({ success: false, message: "Attendance record not found" });
        }

        res.status(200).json({ success: true, attendance });
    } catch (error) {
        console.error("❌ Error while updating attendance:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const attendanceReport = async (req, res) => {
    try {
        const { date, limit = 5, skip = 0 } = req.query;
        const query = {};

        if (date) {
            query.date = date;  
        }

        
        const attendanceData = await Attendance.find(query).populate({
            path: "employeeId",
            populate: [
                { path: "department", model: "Department", select: "dep_name" },  
                { path: "userId", model: "User", select: "name" }              
            ]
        }).sort({ date: -1 }).limit(parseInt(limit)).skip(parseInt(skip));

        const groupData = attendanceData.reduce((result, record) => {
            if (!result[record.date]) {
                result[record.date] = [];
            }

            result[record.date].push({
                employeeId: record.employeeId?.employeeId || "N/A",
                employeeName: record.employeeId?.userId?.name || "Unknown",
                departmentName: record.employeeId?.department?.dep_name || "N/A",
                status: record.status || "Not Marked"
            });

            return result;
        }, {});

        return res.status(200).json({ success: true, groupData });
    } catch (error) {
        console.error("❌ Error while fetching attendance report:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export { getAttendance, updateAttendance, attendanceReport };
