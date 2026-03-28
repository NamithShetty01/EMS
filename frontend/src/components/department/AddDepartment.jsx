//import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddDepartment = () => {
    const [department, SetDepartment] = useState({
        dep_name: "",
        description: "",
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        SetDepartment({ ...department, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("📤 Sending Request:", department);

        try {
            const response = await axios.post(
                "http://localhost:5000/api/department/add",
                department,
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("✅ Response Received:", response.data);

            if (response.data.success) {
                navigate("/admin-dashboard/department");
            }
        } catch (error) {
            console.error("❌ Request Failed:", error.response?.data || error.message); // Log error details
            if (error.response) {
                alert(error.response.data.error || "An error occurred.");
            } else {
                alert("Server not responding. Check console for details.");
            }
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-5 app-card p-8 w-full">
            <h2 className="text-2xl font-extrabold mb-1">Add New Department</h2>
            <p className="text-sm text-slate-500 mb-6">Create a department and include a short description.</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="dep_name" className="app-label">
                        Department Name
                    </label>
                    <input
                        type="text"
                        name="dep_name"
                        value={department.dep_name} 
                        onChange={handleChange}
                        placeholder="Department Name"
                        className="app-input"
                        required
                    />
                </div>
                <div className="mt-3">
                    <label htmlFor="description" className="app-label">
                        Description
                    </label>
                    <textarea
                        name="description"
                        value={department.description}                        
                        onChange={handleChange}
                        placeholder="Description"
                        className="app-textarea"
                        rows="4"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full mt-6 app-btn-primary"
                >
                    Add Department
                </button>
            </form>
        </div>
    );
};

export default AddDepartment;
