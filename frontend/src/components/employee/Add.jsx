import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import axios from "axios";

const Add = () => {
    const [departments, setDepartments] = useState([]);
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const getDepartments = async () => {
            const departments = await fetchDepartments();
            setDepartments(departments);
        };
        getDepartments();
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: files ? files[0] : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Fixed typo

        const formDataObj = new FormData();
        Object.keys(formData).forEach((key) => {
            formDataObj.append(key, formData[key]);
        });

        try {
            const response = await axios.post(
                "http://localhost:5000/api/employee/add",
                formDataObj,
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            console.log("✅ Response Received:", response.data);

            if (response.data.success) {
                navigate("/admin-dashboard/employees");
            }
        } catch (error) {
            console.error("❌ Request Failed:", error.response?.data || error.message);
            alert(error.response?.data?.error || "An error occurred.");
        }
    };

    return (
        <div className="max-w-5xl mx-auto mt-5 app-card p-8">
            <h2 className="text-2xl font-extrabold mb-1">Add New Employee</h2>
            <p className="text-sm text-slate-500 mb-6">Capture employee details and create account access.</p>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                        <label className="app-label">Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Insert Name"
                            className="app-input"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="app-label">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Insert Email"
                            className="app-input"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Employee ID */}
                    <div>
                        <label className="app-label">Employee ID</label>
                        <input
                            type="text"
                            name="employeeId"
                            placeholder="Employee ID"
                            className="app-input"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Date of Birth */}
                    <div>
                        <label className="app-label">Date of Birth</label>
                        <input
                            type="date"
                            name="dob"
                            className="app-input"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Gender */}
                    <div>
                        <label className="app-label">Gender</label>
                        <select
                            name="gender"
                            className="app-select"
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    {/* Marital Status */}
                    <div>
                        <label className="app-label">Marital Status</label>
                        <select
                            name="maritalStatus"
                            className="app-select"
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Status</option>
                            <option value="single">Single</option>
                            <option value="married">Married</option>
                        </select>
                    </div>

                    {/* Designation */}
                    <div>
                        <label className="app-label">Designation</label>
                        <input
                            type="text"
                            name="designation"
                            placeholder="Designation"
                            className="app-input"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Department */}
                    <div>
                        <label className="app-label">Department</label>
                        <select
                            name="department"
                            className="app-select"
                            onChange={handleChange}
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

                    {/* Salary */}
                    <div>
                        <label className="app-label">Salary</label>
                        <input
                            type="text"
                            name="salary"
                            placeholder="Salary"
                            className="app-input"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="app-label">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="*******"
                            className="app-input"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Role */}
                    <div>
                        <label className="app-label">Role</label>
                        <select
                            name="role"
                            className="app-select"
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Role</option>
                            <option value="admin">Admin</option>
                            <option value="employee">Employee</option>
                        </select>
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="app-label">Upload Image</label>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            className="app-input"
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full mt-6 app-btn-primary"
                >
                    Add Employee
                </button>
            </form>
        </div>
    );
};

export default Add;
