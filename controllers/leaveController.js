import Employee from "../models/Employee.js"
import Leave from "../models/Leave.js"

const addLeave = async (req, res) => {
    try {
        const {userId, leaveType, startDate, endDate, reason, status} = req.body
        const employee =await Employee.findOne({userId})

        const newLeave = new Leave ({
            employeeId :employee._id, 
            leaveType, 
            startDate, 
            endDate, 
            reason,
            status
        })

        await newLeave.save()

        return res.status(200).json({success: true})

    } catch (error) {
        return res.status(500).json({success: false, error: "Leave add server error"})
    }
}

const getLeave =async (req, res) => {
    try {
        const {id} =req.params;
        let leaves = await Leave.find({employeeId:id})
        if (!leaves || leaves.length ===0 ) {
            const employee = await Employee.findOne({userId: id})
            leaves = await Leave.find({employeeId:employee._id})
        }

        return res.status(200).json({success: true,leaves})
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({success: false, error: "Leave add server error"})
    }
}

const getLeaves =async (req, res) => {
    try {
        const leaves =await Leave.find().populate({
            path: "employeeId",
            populate: [
                {
                    path: 'department',
                    select: 'dep_name'
                },
                {
                    path: 'userId',
                    select: 'name'
                },
            ]
        })

        return res.status(200).json({success: true, leaves})
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({success: false, error: "Leave add server error"})
    }
}

const getLeaveDetail = async (req, res) => {
    try {
        const { id } = req.params; // ✅ GET id from URL
        const leave = await Leave.findById(id).populate({
            path: "employeeId",
            populate: [
                {
                    path: 'department',
                    select: 'dep_name',
                },
                {
                    path: 'userId',
                    select: 'name profileImage',
                },
            ],
        });

        if (!leave) {
            return res.status(404).json({ success: false, error: "Leave not found" });
        }

        return res.status(200).json({ success: true, leave });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, error: "Server error fetching leave details" });
    }
};

const updateLeave = async (req, res) => {
    try {
        const {id} = req.params;
        const leave = await Leave.findByIdAndUpdate({_id: id}, {status: req.body.status})
        if(!leave){
            return res.status(404).json({success: false, error: "Leave not found"})
        }
        return res.status(200).json({ success: true});
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({success: false, error: "Leave add server error"})
    }
}

export {addLeave, getLeave, getLeaves, getLeaveDetail, updateLeave }