import mongoose from 'mongoose';

const AttendenceSchema = new mongoose.Schema({
    date: { type: String, required: true },
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    status: {
        type: String,
        enum: ["Present", "Absent", "Sick", "Leave"],
        default: "Absent", // Set a default value that matches one of the enum values
    },
});

const Attendence = mongoose.model("Attendence", AttendenceSchema);
export default Attendence;
