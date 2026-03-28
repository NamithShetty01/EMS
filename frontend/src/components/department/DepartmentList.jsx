import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { columns } from "../../utils/DepartmentHelper";
import axios from "axios";
import { DepartmentButtons } from "../../utils/DepartmentHelper";

const DepartmentList = () => {
    const [departments, setDepartments] = useState([]);
    const [depLoading, setDepLoading] = useState(false);
    const [filteredDepartments, setFilteredDepartments] = useState([]);

    
    const onDepartmentDelete = (_id) => { 
        const updatedData = departments.filter(dep => dep._id !== _id);
        setDepartments(updatedData);
        setFilteredDepartments(updatedData);
    };

    useEffect(() => {
        const fetchDepartments = async () => {
            setDepLoading(true);
            try {
                const response = await axios.get("http://localhost:5000/api/department", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (response.data.success) {
                    const data = response.data.departments.map((dep, index) => ({
                        _id: dep._id,
                        sno: index + 1, 
                        dep_name: dep.dep_name,
                        action: <DepartmentButtons _id={dep._id} onDepartmentDelete={onDepartmentDelete} />,
                    }));

                    setDepartments(data);
                    setFilteredDepartments(data);
                } else {
                    alert("Failed to fetch departments.");
                }
            } catch (error) {
                console.error("❌ Fetch Error:", error.response?.data || error.message);
                alert(error.response?.data?.error || "Error fetching departments.");
            } finally {
                setDepLoading(false);
            }
        };

        fetchDepartments();
    }, []);

    const filterDepartments = (e) => {
        const searchText = e.target.value.toLowerCase();
        const records = departments.filter((dep) => dep.dep_name.toLowerCase().includes(searchText));
        setFilteredDepartments(records);
    };

    return (
        <>
            {depLoading ? (
                <div className="app-card p-6 text-center text-lg font-semibold">Loading...</div>
            ) : (
                <div className="p-1">
                    <div className="app-page-header">
                        <p className="app-page-eyebrow">Organization</p>
                        <h3 className="app-page-title">Manage Departments</h3>
                    </div>
                    <div className="app-card p-5">
                    <div className="flex flex-col md:flex-row justify-between gap-3 md:items-center mt-1">
                        <input
                            type="text"
                            placeholder="Search by department name..."
                            className="app-input md:max-w-sm"
                            onChange={filterDepartments}
                        />
                        <Link
                            to="/admin-dashboard/add-department"
                            className="app-btn-primary text-center"
                        >
                            + Add New Department
                        </Link>
                    </div>
                    <div className="mt-5">
                        <DataTable
                            columns={columns(onDepartmentDelete)}
                            data={filteredDepartments}
                            pagination
                            highlightOnHover
                        />
                    </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default DepartmentList;
