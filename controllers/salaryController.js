import Salary from "../models/Salary.js";
import Employee from "../models/Employee.js";

const addSalary = async (req, res) => {
    try {
        console.log("Incoming Salary Data:", req.body); 
        const { employeeId, basicSalary, allowances, deduction, payDate } = req.body;

        if (!employeeId || basicSalary == null || allowances == null || deduction == null || !payDate) {
            return res.status(400).json({ success: false, error: "Missing required fields" });
        }

        const totalSalary =
            parseFloat(basicSalary) + parseFloat(allowances) - parseFloat(deduction);

        const newSalary = new Salary({
            employeeId,
            basicSalary,
            allowances,
            deduction,
            netSalary: totalSalary,
            payDate,
        });

        await newSalary.save();

        return res.status(200).json({ success: true });
    } catch (error) {
        return res.status(500).json({ success: false, error: "salary add server error" });
    }
};

const getSalary = async (req, res) => {
    try {
        const { id } = req.params;

        let salary = await Salary.find({ employeeId: id }).populate(
            "employeeId",
            "employeeId"
        );

        if (!salary || salary.length < 1) {
            const employee = await Employee.findOne({ userId: id });
            if (!employee) {
                return res
                    .status(404)
                    .json({ success: false, error: "Employee not found" });
            }

            salary = await Salary.find({ employeeId: employee._id }).populate(
                "employeeId",
                "employeeId"
            );
        }

        return res.status(200).json({ success: true, salary });
    } catch (error) {
        console.error("Get Salary Error:", error);
        return res.status(500).json({ success: false, error: "salary get server error" });
    }
};

export { addSalary, getSalary };
