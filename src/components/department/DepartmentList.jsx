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
                <div className="text-center text-lg font-semibold">Loading...</div>
            ) : (
                <div className="p-5">
                    <div className="text-center">
                        <h3 className="text-2xl font-bold">Manage Departments</h3>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <input
                            type="text"
                            placeholder="Search by department name..."
                            className="px-4 py-2 border border-gray-300 rounded-md"
                            onChange={filterDepartments}
                        />
                        <Link
                            to="/admin-dashboard/add-department"
                            className="px-4 py-2 bg-teal-600 hover:bg-teal-700 transition duration-300 rounded text-white"
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
            )}
        </>
    );
};

export default DepartmentList;
