import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import axios from "axios";

const Edit = () => {
    const [employee, setEmployee] = useState({
        name: '',
        maritalStatus: '',
        designation: '',
        salary: 0,
        department: ''
    });

    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const getDepartments = async () => {
            const departments = await fetchDepartments();
            setDepartments(departments);
        };
        getDepartments();
    }, []);

    useEffect(() => {
        const fetchEmployee = async () => {
            console.log("Fetching employee with ID:", id);
            try {
                const response = await axios.get(`http://localhost:5000/api/employee/${id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                });

                if (response.data.success) {
                    const emp = response.data.employee;
                    setEmployee({
                        name: emp.userId.name,
                        maritalStatus: emp.maritalStatus,
                        designation: emp.designation,
                        salary: emp.salary,
                        department: emp.department?._id || ''
                    });
                } else {
                    console.error("Employee not found!");
                }
            } catch (error) {
                console.error("Error fetching employee:", error.response?.data?.error || error);
                alert("Failed to fetch employee details.");
            } finally {
                setLoading(false);
            }
        };
        fetchEmployee();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedEmployee = {
            name: employee.name,
            maritalStatus: employee.maritalStatus,
            designation: employee.designation,
            salary: employee.salary,
            department: employee.department
        };

        console.log("Updating employee:", updatedEmployee);

        try {
            const response = await axios.put(
                `http://localhost:5000/api/employee/${id}`,
                updatedEmployee,
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json"
                    },
                }
            );

            if (response.data.success) {
                navigate("/admin-dashboard/employees");
            }
        } catch (error) {
            console.error("Update error:", error.response?.data?.error || error);
            alert("An error occurred while updating the employee.");
        }
    };

    if (loading) return <div className="app-card p-6">Loading...</div>;

    return (
        <div className="max-w-5xl mx-auto mt-5 app-card p-8">
            <h2 className="text-2xl font-extrabold mb-1">Edit Employee</h2>
            <p className="text-sm text-slate-500 mb-6">Update profile, salary, and department assignments.</p>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="app-label">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={employee.name}
                            placeholder="Insert Name"
                            className="app-input"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label className="app-label">Marital Status</label>
                        <select
                            name="maritalStatus"
                            className="app-select"
                            onChange={handleChange}
                            value={employee.maritalStatus}
                            required
                        >
                            <option value="">Select Status</option>
                            <option value="single">Single</option>
                            <option value="married">Married</option>
                        </select>
                    </div>

                    <div>
                        <label className="app-label">Designation</label>
                        <input
                            type="text"
                            name="designation"
                            placeholder="Designation"
                            value={employee.designation}
                            className="app-input"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label className="app-label">Salary</label>
                        <input
                            type="number"
                            name="salary"
                            placeholder="Salary"
                            value={employee.salary}
                            className="app-input"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="col-span-2">
                        <label className="app-label">Department</label>
                        <select
                            name="department"
                            className="app-select"
                            onChange={handleChange}
                            value={employee.department}
                            required
                        >
                            <option value="">Select Department</option>
                            {departments.map((dep) => (
                                <option key={dep._id} value={dep._id}>
                                    {dep.dep_name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full mt-6 app-btn-primary"
                >
                    Update Employee
                </button>
            </form>
        </div>
    );
};

export default Edit;
