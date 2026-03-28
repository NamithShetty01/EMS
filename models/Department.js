import mongoose from 'mongoose';
import Employee from './Employee.js';
import Leave from './Leave.js';
import Salary from './Salary.js';
import User from './User.js'

const DepartmentSchema = new mongoose.Schema({
    dep_name: { type: String, required: true },
    description: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Pre-hook for cascading delete
DepartmentSchema.pre("deleteOne", { document: true, query: false }, async function (next) {
    try {
        const employees = await Employee.find({ department: this._id });
        const empIds = employees.map(emp => emp._id);

        await Employee.deleteMany({ department: this._id });
        await Leave.deleteMany({ employeeId: { $in: empIds } });
        await Salary.deleteMany({ employeeId: { $in: empIds } });
        await User.deleteMany({ employeeId: { $in: empIds } });

        next();
    } catch (error) {
        next(error);
    }
});

const Department = mongoose.model("Department", DepartmentSchema);
export default Department;
