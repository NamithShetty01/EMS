import axios from "axios";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export const columns = [
    {
        name: "S No",
        selector: (row) => row.sno,
        width: "80px"
    },
    {
        name: "Name",
        selector: (row) => row.name,
        sortable: true,
        minWidth: "180px"
    },
    {
        name: "Image",
        cell: (row) => row.profileImage,
        width:"100px"
    },
    {
        name: "Department",
        selector: (row) => row.dep_name,
        sortable: true,
        minWidth: "170px"
    },
    {
        name: "DOB",
        selector: (row) => row.dob,
        sortable: true,
        minWidth: "140px"
    },
    {
        name: "Action",
        cell: (row) => <EmployeeButtons _id={row._id} />,
        center: true
    },
];

// Fetch departments
export const fetchDepartments = async () => {
    try {
        const response = await axios.get(`http://localhost:5000/api/department`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        return response.data.success ? response.data.departments : [];
    } catch (error) {
        console.error("❌ Fetch Error:", error.response?.data || error.message);
        alert(error.response?.data?.error || "Error fetching departments.");
        return [];
    }
};

// Fetch employees by department
export const getEmployees = async (id) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/employee/department/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        return response.data.success ? response.data.employees : [];
    } catch (error) {
        console.error("❌ Fetch Error:", error.response?.data || error.message);
        alert(error.response?.data?.error || "Error fetching employees.");
        return [];
    }
};

export const EmployeeButtons = ({ _id }) => {
    const navigate = useNavigate();

    if (!_id) {
        console.error("Error: Missing `_id` in EmployeeButtons", _id);
        alert("Invalid employee ID. Please refresh the page.");
        return null;
    }

    return (
        <div className="flex flex-wrap items-center gap-2">
            <button 
                className="px-3 py-1.5 bg-sky-100 text-sky-800 hover:bg-sky-200 rounded-md text-xs font-semibold transition-colors"
                onClick={() => navigate(`/admin-dashboard/employees/${_id}`)}
            >
                View
            </button>
            <button 
                className="px-3 py-1.5 bg-indigo-100 text-indigo-800 hover:bg-indigo-200 rounded-md text-xs font-semibold transition-colors"
                onClick={() => navigate(`/admin-dashboard/employees/edit/${_id}`)}
            >
                Edit
            </button>
            <button 
                className="px-3 py-1.5 bg-amber-100 text-amber-800 hover:bg-amber-200 rounded-md text-xs font-semibold transition-colors"
                onClick={() => navigate(`/admin-dashboard/employees/salary/${_id}`)}
            >
                Salary
            </button>
            <button 
                className="px-3 py-1.5 bg-rose-100 text-rose-800 hover:bg-rose-200 rounded-md text-xs font-semibold transition-colors"
                onClick={() => navigate(`/admin-dashboard/employees/leaves/${_id}`)}
            >
                Leave
            </button>
        </div>
    );
};

EmployeeButtons.propTypes = {
    _id: PropTypes.string.isRequired,
};
