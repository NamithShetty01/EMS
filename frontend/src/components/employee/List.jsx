import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { columns, EmployeeButtons } from "../../utils/EmployeeHelper";
import DataTable from "react-data-table-component";

const tableCustomStyles = {
    table: {
        style: {
            borderRadius: "12px",
            overflow: "hidden",
            border: "1px solid #e5e7eb",
        },
    },
    headRow: {
        style: {
            backgroundColor: "#f8fafc",
            borderBottom: "1px solid #e5e7eb",
            minHeight: "52px",
            fontSize: "13px",
            fontWeight: 700,
            color: "#0f172a",
            textTransform: "uppercase",
        },
    },
    rows: {
        style: {
            minHeight: "60px",
            fontSize: "14px",
            color: "#1f2937",
            borderBottom: "1px solid #f1f5f9",
        },
        highlightOnHoverStyle: {
            backgroundColor: "#f8fafc",
            transitionDuration: "0.15s",
        },
    },
    pagination: {
        style: {
            minHeight: "56px",
            borderTop: "1px solid #e5e7eb",
            color: "#475569",
        },
    },
};

const resolveProfileImageUrl = (profileImage) => {
    if (!profileImage) {
        return "https://via.placeholder.com/40";
    }

    const normalizedPath = String(profileImage).replace(/\\/g, "/").trim();

    if (normalizedPath.startsWith("http://") || normalizedPath.startsWith("https://")) {
        return normalizedPath;
    }

    const cleanPath = normalizedPath.startsWith("/") ? normalizedPath.slice(1) : normalizedPath;

    if (cleanPath.startsWith("uploads/")) {
        return `http://localhost:5000/${cleanPath}`;
    }

    return `http://localhost:5000/uploads/${cleanPath}`;
};

const List = () => {
    const [employees, setEmployees] = useState([]);
    const [empLoading, setEmpLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredEmployee, setFilteredEmployee] = useState([]); // Fixed: should be an array

    useEffect(() => {
        const fetchEmployees = async () => {
            setEmpLoading(true);
            try {
                const response = await axios.get("http://localhost:5000/api/employee", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (response.data.success) {
                    const data = response.data.employees.map((emp, index) => ({
                        _id: emp._id,
                        sno: index + 1,
                        dep_name: emp.department?.dep_name || "N/A",
                        name: emp.userId?.name || "Unknown", // Ensure correct property
                        dob: emp.dob ? new Date(emp.dob).toLocaleDateString() : "N/A",
                        profileImage: (
                            <img
                                width={42}
                                height={42}
                                className="rounded-full object-cover border border-slate-200 shadow-sm"
                                src={resolveProfileImageUrl(emp.userId?.profileImage)}
                                alt="Profile"
                            />
                        ),
                        action: <EmployeeButtons empId={emp._id} />,
                    }));

                    setEmployees(data);
                    setFilteredEmployee(data);
                } else {
                    alert("Failed to fetch employees.");
                }
            } catch (error) {
                console.error("❌ Fetch Error:", error.response?.data || error.message);
                alert(error.response?.data?.error || "Error fetching employees.");
            } finally {
                setEmpLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    const handleFilter = (e) => {
        const searchValue = e.target.value.toLowerCase();
        setSearchTerm(searchValue);

        const records = employees.filter((emp) =>
            emp.name.toLowerCase().includes(searchValue)
        );
        setFilteredEmployee(records);
    };

    return (
        <div className="p-4 md:p-6 lg:p-8 bg-slate-100 min-h-screen">
            <div className="mb-5 md:mb-6">
                <p className="text-xs md:text-sm font-medium text-slate-500 uppercase tracking-wide">Workforce</p>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900">Employee Directory</h3>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 md:p-5">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2 text-slate-700">
                        <span className="text-sm md:text-base font-semibold">Manage Employees</span>
                        <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full">{(filteredEmployee.length ? filteredEmployee : employees).length} records</span>
                    </div>
                    <Link
                        to="/admin-dashboard/add-employee"
                        className="inline-flex justify-center items-center px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-colors"
                    >
                        Add New Employee
                    </Link>
                </div>

                <input
                    type="text"
                    placeholder="Search by Employee Name"
                    className="w-full md:max-w-sm px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-slate-700"
                    value={searchTerm}
                    onChange={handleFilter}
                />

                <div className="mt-5">
                    <DataTable
                        columns={columns}
                        data={filteredEmployee.length ? filteredEmployee : employees}
                        progressPending={empLoading}
                        pagination
                        highlightOnHover
                        pointerOnHover
                        customStyles={tableCustomStyles}
                        persistTableHead
                        noDataComponent={<div className="py-6 text-slate-500">No employees found.</div>}
                    />
                </div>
            </div>
        </div>
    );
};

export default List;
