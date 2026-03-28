import Attendence from "../models/Attendence.js";
import Employee from '../models/Employee.js';const getAttendence = async (req, res) => {
    try {
        const date = new Date().toISOString().split('T')[0];
        console.log("📅 Requested date:", date);

        const rawData = await Attendence.find({ date });
        console.log("📦 Raw Attendence found:", rawData.length);

        // Check if the employeeId exists for all records
        rawData.forEach(att => {
            console.log("🚨 Raw Employee ID:", att.employeeId);
        });

        const attendence = await Attendence.find({ date, employeeId: { $ne: null } }).populate({
            path: "employeeId",
            populate: [
                { path: "department", model: "Department" },
                { path: "userId", model: "User" }
            ]
        });

        console.log("✅ Populated Attendence sample:", JSON.stringify(attendence[0], null, 2));
        return res.status(200).json({ success: true, attendence });

    } catch (error) {
        console.error("❌ ERROR in getAttendence:", error.stack || error.message || error);
        return res.status(500).json({
            success: false,
            error: error.message || "Unknown server error"
        });
    }
};

const updateAttendence = async (req, res) => {
    try {
        const { employeeId } = req.params;
        const { status } = req.body;
        const date = new Date().toISOString().split('T')[0];
        const employee = await Employee.findOne({ employeeId });

        if (!employee) {
            return res.status(404).json({ success: false, message: "Employee not found" });
        }

        const attendence = await Attendence.findOneAndUpdate(
            { employeeId: employee._id, date },
            { status },
            { new: true }
        );

        if (!attendence) {
            return res.status(404).json({ success: false, message: "Attendance record not found" });
        }

        return res.status(200).json({ success: true, attendence });
    } catch (error) {
        console.error("Error while updating attendance:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

const attendenceReport = async (req, res) => {
    try {
        const { date, limit = 5, skip = 0 } = req.query;
        const query = {};

        if (date) {
            query.date = date;
        }

        const attendenceData = await Attendence.find(query).populate({
            path: "employeeId",
            populate: [
                "department",
                "userId"
            ]
        }).sort({ date: -1 }).limit(parseInt(limit)).skip(parseInt(skip));

        const groupData = attendenceData.reduce((result, record) => {
            if (!result[record.date]) {
                result[record.date] = [];
            }
            result[record.date].push({
                employeeId: record.employeeId.employeeId,
                employeeName: record.employeeId.userId.name,
                departmentName: record.employeeId.department.dep_name,
                status: record.status || "Not Marked"
            });
            return result;
        }, {});

        return res.status(200).json({ success: true, groupData });
    } catch (error) {
        console.error("Error while fetching attendance report:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

export { getAttendence, updateAttendence, attendenceReport };
