import Employee from '../models/Attendence.js';
import Attendence from '../models/Attendence.js';
const   defaultAttendence = async (req, res, next) =>{
    
    try {
        const  data = new Date().toISOString().split('T')[0];
        const existingAttendence = await AttendenceReport.findOne({date});

        if (!existingAttendence) {
            const employees =await Employee.find({});
            const attendence =employees.map(employee => 
                ({date, employeeId: employees._id,status: null}));
            

            await Attendence.insertMany(attendence);
        }
        next();

    } catch (error) {
        res.status(500).json({success: false, error: error})
    }
}
export default defaultAttendence;