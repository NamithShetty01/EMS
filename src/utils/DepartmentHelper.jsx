import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";

export const columns = (onDepartmentDelete) => [
    {
        name: "S No",
        selector: (row) => row.sno,
    },
    {
        name: "Department Name",
        selector: (row) => row.dep_name,
        sortable: true
    },
    {
        name: "Action",
        cell: (row) => <DepartmentButtons _id={row._id} onDepartmentDelete={onDepartmentDelete} />
    }
];


export const DepartmentButtons = ({ _id, onDepartmentDelete }) => { 
    const navigate = useNavigate();

    if (!_id) {
        console.error("Error: Missing `_id` in DepartmentButtons", _id);
        alert("Invalid department ID. Please refresh the page.");
        return null;
    }


    const handleDelete = async () => {
        const confirm = window.confirm("Do you want to delete?");
        if (!confirm) return;

        try {
            console.log(`Deleting department with ID: ${_id}`);

            const response = await axios.delete(`http://localhost:5000/api/department/${_id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (response.data.success) {
                console.log(`Department ${_id} deleted successfully`);
                onDepartmentDelete?.(_id); // Call function only if it exists
            } else {
                alert("Failed to delete department.");
            }
        } catch (error) {
            console.error("Delete Error:", error.response?.data || error.message);
            alert(error.response?.data?.error || "Error deleting department.");
        }
    };

    return (
        <div className="flex space-x-3">
            <button 
                className="px-3 py-1 bg-teal-600 text-white"
                onClick={() => navigate(`/admin-dashboard/department/${_id}`)}
            >
                Edit
            </button>
            <button className="px-3 py-1 bg-red-600 text-white" onClick={handleDelete}>
                Delete
            </button>
        </div>
    );
};

DepartmentButtons.propTypes = {
    _id: PropTypes.string.isRequired,
    onDepartmentDelete: PropTypes.func.isRequired,  
};
