import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { columns, AttendenceHelper } from "../../utils/AttendenceHelper";
import DataTable from "react-data-table-component";

const Attendance = () => {
    const [attendence, setAttendance] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredAttendance, setFilteredAttendance] = useState([]);

    const statusChanges = () => {
        fetchAttendance();
    };

    const fetchAttendance = async () => {
        setLoading(true);
    
        const token = localStorage.getItem("token");
        console.log("🔑 Token being sent:", token); // <-- Check what token is stored
    
        try {
            const response = await axios.get("http://localhost:5000/api/attendence", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            if (response.data.success) {
                const rows = response.data.attendence || response.data.attendance || [];
                const data = rows.map((att, index) => ({
                    employeeId: att.employeeId?.employeeId || "N/A",
                    sno: index + 1,
                    department: att.employeeId?.department?.dep_name || "N/A",
                    name: att.employeeId?.userId?.name || "Unknown",
                    action: (
                        <AttendenceHelper
                            status={att.status}
                            employeeId={att.employeeId?.employeeId}
                            statusChanges={statusChanges}
                        />
                    ),
                }));
    
                setAttendance(data);
                setFilteredAttendance(data);
            } else {
                alert("Failed to fetch employees.");
            }
        } catch (error) {
            console.error("❌ Fetch Error:", error);
    
            if (error.response) {
                console.error("📡 Server responded with:", error.response.status, error.response.data);
                alert(
                    error.response.data?.error?.message ||
                    error.response.data?.message ||
                    `Server error: ${error.response.status}`
                );
            } else if (error.request) {
                console.error("🚫 No response received from server:", error.request);
                alert("No response from server. Is it running?");
            } else {
                console.error("⚙️ Error setting up request:", error.message);
                alert("Unexpected setup error: " + error.message);
            }
        } finally {
            setLoading(false);
        }
    };
    

    useEffect(() => {
        fetchAttendance();
    }, []);

    const handleFilter = (e) => {
        const searchValue = e.target.value.toLowerCase();
        setSearchTerm(searchValue);

        const records = attendence.filter((emp) =>
            emp.name.toLowerCase().includes(searchValue)
        );
        setFilteredAttendance(records);
    };

    return (
        <div className="p-1">
            <div className="app-page-header">
                <p className="app-page-eyebrow">Attendance</p>
                <h3 className="app-page-title">Manage Attendance</h3>
            </div>
            <div className="app-card p-5">
            <div className="flex flex-col xl:flex-row justify-between xl:items-center mt-1 gap-3">
                <input
                    type="text"
                    placeholder="Search by Employee Name"
                    className="app-input xl:max-w-sm"
                    value={searchTerm}
                    onChange={handleFilter}
                />
                <p className='text-sm md:text-base text-slate-700 font-semibold'>
                    Mark Employees for <span className='font-bold underline'>{new Date().toISOString().split("T")[0]}</span>
                </p>
                <Link
                    to="/admin-dashboard/attendence-report"
                    className="app-btn-primary text-center"
                >
                    Attendance Report
                </Link>
            </div>
            <div className='mt-6'>
                {loading ? (
                    <div className="text-slate-600">Loading...</div>
                ) : (
                    <DataTable
                        columns={columns}
                        data={filteredAttendance.length ? filteredAttendance : attendence}
                        progressPending={loading}
                        pagination
                        highlightOnHover
                        noDataComponent="No matching records found."
                    />
                )}
            </div>
            </div>
        </div>
    );
};

export default Attendance;
