import Department from "../models/Department.js";
import Employee from "../models/Employee.js";
import Leave from "../models/Leave.js";

const getSummary = async (req, res) => {
    try {
        const [totalEmployees, totalDepartments, totalSalaries, employeeAppliedForLeave, leaveStatus] = await Promise.all([
            Employee.countDocuments(),
            Department.countDocuments(),
            Employee.aggregate([
                { $group: { _id: null, totalSalary: { $sum: "$salary" } } }
            ]),
            Leave.distinct("employeeId"),
            Leave.aggregate([
                { $group: { _id: "$status", count: { $sum: 1 } } }
            ]),
        ]);

        const leaveSummary = {
            appliedFor: employeeAppliedForLeave.length,
            approved: leaveStatus.find(item => item._id === "Approved")?.count || 0,
            rejected: leaveStatus.find(item => item._id === "Rejected")?.count || 0,
            pending: leaveStatus.find(item => item._id === "Pending")?.count || 0,
        };

        res.status(200).json({
            success: true,
            totalEmployees,
            totalDepartments,
            totalSalary: totalSalaries[0]?.totalSalary || 0,
            leaveSummary,
        });

    } catch (error) {
        console.error("❌ Dashboard Summary Error:", error);
        res.status(500).json({ success: false, error: "dashboard summary error" });
    }
};

export { getSummary };
