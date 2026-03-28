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
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-b-md shadow-md w-96">
            <h2 className="text-2xl font-bold mb-6">Add New Department</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="dep_name" className="text-sm font-medium text-gray-700">
                        Department Name
                    </label>
                    <input
                        type="text"
                        name="dep_name"
                        value={department.dep_name} 
                        onChange={handleChange}
                        placeholder="Department Name"
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div className="mt-3">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        name="description"
                        value={department.description}                        
                        onChange={handleChange}
                        placeholder="Description"
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                        rows="4"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
                >
                    Add Department
                </button>
            </form>
        </div>
    );
};

export default AddDepartment;
