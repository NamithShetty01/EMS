import { useState, useEffect } from "react";
import axios from "axios";
import { columns, EmployeeButtons } from "../../utils/EmployeeHelper";
import DataTable from "react-data-table-component";

const List = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/employee', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (response.data.success) {
                    setEmployees(response.data.employees);
                } else {
                    console.error("Failed to fetch employees.");
                }
            } catch (error) {
                console.error("Error fetching employees:", error.response?.data?.error || error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchEmployees();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-6">Employee List</h2>
            <DataTable
                title="Employees"
                columns={columns}
                data={employees}
                pagination
                highlightOnHover
            />
        </div>
    );
};

export default List;
