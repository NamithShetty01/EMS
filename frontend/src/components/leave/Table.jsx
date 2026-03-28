import axios from "axios";
import React, { useEffect, useState } from "react";
import { colums, LeavesButtons } from "../../utils/LeaveHelper";
import DataTable from "react-data-table-component";

const Table = () => {
    const [leaves, setLeaves] = useState([]);
    const [filteredLeaves, setFilteredLeaves] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchLeaves = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/leave", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (response.data.success) {
                const data = response.data.leaves.map((leave, index) => ({
                    _id: leave._id,
                    sno: index + 1,
                    employeeId: leave.employeeId.employeeId,
                    name: leave.employeeId.userId?.name,
                    leaveType: leave.leaveType,
                    department: leave.employeeId.department.dep_name,
                    days:
                        (new Date(leave.endDate) - new Date(leave.startDate)) /
                        (1000 * 60 * 60 * 24) + 1, // Correct day calculation
                    status: leave.status,
                    action: <LeavesButtons id={leave._id} />,
                }));

                setLeaves(data);
                setFilteredLeaves(data);
            } else {
                alert("Failed to fetch leaves.");
            }
        } catch (error) {
            console.error("❌ Fetch Error:", error.response?.data || error.message);
            alert(error.response?.data?.error || "Error fetching leaves.");
        }
    };

    useEffect(() => {
        fetchLeaves();
    }, []);

    const filterByInput = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        const filtered = leaves.filter((leave) =>
            leave.employeeId.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredLeaves(filtered);
    };

    const filterByButton = (status) => {
        const filtered = leaves.filter(
            (leave) => leave.status.toLowerCase() === status.toLowerCase()
        );
        setFilteredLeaves(filtered);
    };

    return (
        <>
            {filteredLeaves.length > 0 ? (
                <div className="p-1">
                    <div className="app-page-header">
                        <p className="app-page-eyebrow">People Operations</p>
                        <h3 className="app-page-title">Manage Leave</h3>
                    </div>
                    <div className="app-card p-5">
                    <div className="flex flex-col lg:flex-row justify-between gap-3 lg:items-center mt-1">
                        <input
                            type="text"
                            placeholder="Search by Emp Id"
                            className="app-input lg:max-w-sm"
                            onChange={filterByInput}
                            value={searchTerm}
                        />
                        <div className="flex flex-wrap gap-2">
                            <button
                                className="px-3 py-1.5 rounded-md text-xs font-semibold bg-amber-100 text-amber-800 hover:bg-amber-200"
                                onClick={() => filterByButton("Pending")}
                            >
                                Pending
                            </button>
                            <button
                                className="px-3 py-1.5 rounded-md text-xs font-semibold bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                                onClick={() => filterByButton("Approved")}
                            >
                                Approved
                            </button>
                            <button
                                className="px-3 py-1.5 rounded-md text-xs font-semibold bg-rose-100 text-rose-800 hover:bg-rose-200"
                                onClick={() => filterByButton("Rejected")}
                            >
                                Rejected
                            </button>
                        </div>
                    </div>
                    <div className="mt-3">
                        <DataTable columns={colums} data={filteredLeaves} pagination />
                    </div>
                    </div>
                </div>
            ) : (
                <div className="app-card p-6 text-center text-gray-500">No matching records found.</div>
            )}
        </>
    );
};

export default Table;
