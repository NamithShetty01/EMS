import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditDepartment = () => {
    const { id } = useParams();
    const [department, setDepartment] = useState({});  // Use an object, not an array
    const [depLoading, setDepLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDepartment = async () => {
            setDepLoading(true);
            try {
                const response = await axios.get(`http://localhost:5000/api/department/${id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                });

                if (response.data.success) {
                    setDepartment(response.data.department);
                }
            } catch (error) {
                alert(error.response?.data?.error || "Failed to fetch department.");
            } finally {
                setDepLoading(false);
            }
        };

        fetchDepartment();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDepartment((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `http://localhost:5000/api/department/${id}`,
                department,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.data.success) {
                navigate("/admin-dashboard/department"); // Ensure correct path
            }
        } catch (error) {
            alert(error.response?.data?.error || "Error updating department.");
        }
    };

    return (
        <>
            {depLoading ? (
                <div className="app-card p-6">Loading...</div>
            ) : (
                <div className="max-w-3xl mx-auto mt-5 app-card p-8 w-full">
                    <h2 className="text-2xl font-extrabold mb-1">Edit Department</h2>
                    <p className="text-sm text-slate-500 mb-6">Update department name and description.</p>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="dep_name" className="app-label">
                                Department Name
                            </label>
                            <input
                                type="text"
                                name="dep_name"
                                value={department.dep_name || ""}
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
                                value={department.description || ""}
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
                            Edit Department
                        </button>
                    </form>
                </div>
            )}
        </>
    );
};

export default EditDepartment;
