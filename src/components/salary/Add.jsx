import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchDepartments, getEmployees } from "../../utils/EmployeeHelper";
import axios from "axios";

const Add = () => {
    const [salary, setSalary] = useState({
        employeeId: "",
        basicSalary: "",
        allowance: "",
        deduction: "",
        payDate: "",
        department: "",
    });

    const [departments, setDepartments] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const getDepartments = async () => {
            try {
                const departments = await fetchDepartments();
                setDepartments(departments || []);
            } catch (error) {
                console.error("Error fetching departments:", error);
            }
        };
        getDepartments();
    }, []);

    const handleDepartment = async (e) => {
        const departmentId = e.target.value;
        setSalary((prev) => ({ ...prev, department: departmentId, employeeId: "" }));
        setEmployees([]);

        if (departmentId) {
            try {
                const emps = await getEmployees(departmentId);
                setEmployees(emps || []);
            } catch (error) {
                console.error("Error fetching employees:", error);
            }
        }
    };

    useEffect(() => {
        if (!id) {
            setLoading(false);
            return;
        }

        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/employee/${id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                });

                if (response.data.success) {
                    const emp = response.data.employee;
                    setSalary({
                        employeeId: emp._id,
                        department: emp.department?._id || "",
                        basicSalary: emp.salary || 0,
                        allowance: 0,
                        deduction: 0,
                        payDate: "",
                    });
                }
            } catch (error) {
                console.error("Error fetching employee:", error);
                alert("Failed to fetch employee details.");
            } finally {
                setLoading(false);
            }
        };

        fetchEmployee();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSalary((prevData) => ({
            ...prevData,
            [name]: ["basicSalary", "allowances", "deduction"].includes(name) ? parseFloat(value) || 0 : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/salary/add", salary, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.data.success) {
                navigate("/admin-dashboard/employees");
            }
        } catch (error) {
            console.error("Add error:", error);
            alert("An error occurred while adding the salary.");
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-6">Add Salary</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Department</label>
                    <select
                        name="department"
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                        onChange={handleDepartment}
                        value={salary.department}
                        required
                    >
                        <option value="">Select Department</option>
                        {departments.map((dep) => (
                            <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                        ))}
                    </select>
                </div>

                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Employee</label>
                    <select
                        name="employeeId"
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                        onChange={handleChange}
                        value={salary.employeeId}
                        required
                    >
                        <option value="">Select Employee</option>
                        {employees.map((emp) => (
                            <option key={emp._id} value={emp._id}>{emp.employeeId}</option>
                        ))}
                    </select>
                </div>

                {['basicSalary', 'allowances', 'deduction'].map((field) => (
                    <div key={field} className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">
                            {field.replace(/([A-Z])/g, " $1").trim()}
                        </label>
                        <input
                            type="number"
                            name={field}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            onChange={handleChange}
                            value={salary[field]}
                            required
                        />
                    </div>
                ))}

                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Pay Date</label>
                    <input
                        type="date"
                        name="payDate"
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                        onChange={handleChange}
                        value={salary.payDate}
                        required
                    />
                </div>

                <button type="submit" className="w-full mt-6 bg-teal-700 text-white font-bold py-2 px-4 rounded-md">
                    Add Salary
                </button>
            </form>
        </div>
    );
};

export default Add;
