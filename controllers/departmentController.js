import Department from "../models/Department.js";
const getDepartments = async (req, res) => {
    try {
        const departments = await Department.find();
        return res.status(200).json({ success: true, departments });
    } catch (error) {
        console.error("Get Departments Error:", error);
        return res.status(500).json({ success: false, error: "Failed to fetch departments" });
    }
};
const addDepartment = async (req, res) => {
    try {
        console.log("📥 Request Body:", req.body);

        const { dep_name, description } = req.body;

        if (!dep_name || !description) {
            return res.status(400).json({ success: false, error: "All fields are required" });
        }

        const newDep = new Department({ dep_name, description });
        await newDep.save();

        return res.status(201).json({ success: true, department: newDep });
    } catch (error) {
        console.error("Add Department Error:", error);
        return res.status(500).json({ success: false, error: "Failed to add department" });
    }
};

const getDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const department = await Department.findById(id);

        if (!department) {
            return res.status(404).json({ success: false, error: "Department not found" });
        }

        return res.status(200).json({ success: true, department });
    } catch (error) {
        console.error("Get Department Error:", error);
        return res.status(500).json({ success: false, error: "Failed to fetch department" });
    }
};

const updateDepartment = async (req, res) => {
    try {
        const { id } = req.params; 
        const { dep_name, description } = req.body;

        const updatedDep = await Department.findByIdAndUpdate(
            id,
            { dep_name, description },
            { new: true }
        );

        if (!updatedDep) {
            return res.status(404).json({ success: false, error: "Department not found" });
        }

        return res.status(200).json({ success: true, department: updatedDep });
    } catch (error) {
        console.error("Update Department Error:", error);
        return res.status(500).json({ success: false, error: "Failed to update department" });
    }
};

const deleteDepartment = async (req, res) => {
    try {
        const { id } = req.params;

        const department = await Department.findById(id);

        if (!department) {
            return res.status(404).json({ success: false, error: "Department not found" });
        }

        await department.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Department deleted successfully",
            deletedDepartment: department
        });
    } catch (error) {
        console.error("Delete Department Error:", error);
        return res.status(500).json({ success: false, error: "Failed to delete department" });
    }
};


export { addDepartment, getDepartments, getDepartment, updateDepartment, deleteDepartment };
