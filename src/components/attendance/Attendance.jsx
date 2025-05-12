import { Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import AttendanceHelper from "../../utils/AttendanceHelper";
import DataTable from "react-data-table-component";

const Attendance = () => {
    const [attendance, setAttendance] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredAttendance, setFilteredAttendance] = useState([]);

    const fetchAttendance = async () => {
        setLoading(true);
        const token = localStorage.getItem("token");

        try {
            const response = await axios.get("http://localhost:5000/api/attendance", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data.success) {
                const data = response.data.attendance.map((att, index) => {
                 return {
                        _id: att._id,
                        sno: index + 1,
                        employeeId: att.employeeId?.employeeId || "N/A",
                        departmentName: att.employeeId?.department?.dep_name || "Unknown",
                        name: att.employeeId?.userId?.name || "Unknown",
                        status: att.status,
                    };
                });

                setAttendance(data);
                setFilteredAttendance(data);
            } else {
                alert("Failed to fetch attendance.");
            }
        } catch (error) {
            console.error("❌ Fetch Error:", error);
            alert(error?.response?.data?.message || "Error fetching attendance");
        } finally {
            setLoading(false);
        }
    };

    const statusChanges = useCallback(() => {
        fetchAttendance();
    }, []);

    useEffect(() => {
        fetchAttendance();
    }, []);

    const handleFilter = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);
        if (!value) {
            setFilteredAttendance(attendance);
        } else {
            setFilteredAttendance(
                attendance.filter((emp) =>
                    emp.name.toLowerCase().includes(value)
                )
            );
        }
    };

    const columns = [
    {
        name: "S.No.",
        selector: row => row.sno,
        sortable: true,
        width: "80px",
    },
    {
        name: "Employee ID",
        selector: row => row.employeeId,
        sortable: true,
    },
    {
        name: "Name",
        selector: row => row.name,
        sortable: true,
    },
    {
        name: "Department",
        selector: row => row.departmentName,
        sortable: true,
    },
    {
        name: "Action",
        cell: row => (
            <AttendanceHelper
                status={row.status}
                employeeId={row.employeeId}
                statusChanges={statusChanges}
            />
        ),
    },
];


    return (
        <div className="p-6">
            <div className="text-center">
                <h3 className="text-2xl font-bold">Manage Attendance</h3>
            </div>

            <div className="flex justify-between items-center mt-4 flex-wrap gap-4">
                <input
                    type="text"
                    placeholder="Search by Employee Name"
                    className="px-4 py-0.5 border rounded"
                    value={searchTerm}
                    onChange={handleFilter}
                />
                <p className="text-xl">
                    Mark Employees for{" "}
                    <span className="font-bold underline">
                        {new Date().toISOString().split("T")[0]}
                    </span>
                </p>
                <Link
                    to="/admin-dashboard/attendance-report"
                    className="px-4 py-1 bg-teal-600 rounded text-white"
                >
                    Attendance Report
                </Link>
            </div>

            <div className="mt-6">
                {loading ? (
                    <div className="text-center">Loading...</div>
                ) : (
                    <DataTable
                        columns={columns}
                        data={filteredAttendance}
                        pagination
                        noDataComponent="No matching records found."
                        paginationResetDefaultPage
                        key={searchTerm}
                    />
                )}
            </div>
        </div>
    );
};

export default Attendance;
