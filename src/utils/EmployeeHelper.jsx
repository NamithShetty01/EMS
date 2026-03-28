import axios from "axios";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export const columns = [
    {
        name: "S No",
        selector: (row) => row.sno,
        width: "70px"
    },
    {
        name: "Name",
        selector: (row) => row.name,
        sortable: true,
        width: "100px"
    },
    {
        name: "Image",
        selector: (row) => {
            console.log(row.profileImage);
            return<img 
            src={`http://localhost:5000/uploads/${row.profileImage}`} 
            alt="Profile" 
            className="w-10 h-10 rounded-full object-cover"
          />
          
        },
        width:"90px"
    },
    {
        name: "Department",
        selector: (row) => row.dep_name,
        sortable: true,
        width: "120px"
    },
    {
        name: "DOB",
        selector: (row) => row.dob,
        sortable: true,
        width: "130px"
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
        <div className="flex items-center space-x-2">
            <button 
                className="px-3 py-1 bg-teal-600 text-white rounded"
                onClick={() => navigate(`/admin-dashboard/employees/${_id}`)}
            >
                View
            </button>
            <button 
                className="px-3 py-1 bg-blue-600 text-white rounded"
                onClick={() => navigate(`/admin-dashboard/employees/edit/${_id}`)}
            >
                Edit
            </button>
            <button 
                className="px-3 py-1 bg-yellow-600 text-white rounded"
                onClick={() => navigate(`/admin-dashboard/employees/salary/${_id}`)}
            >
                Salary
            </button>
            <button 
                className="px-3 py-1 bg-red-600 text-white rounded"
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
