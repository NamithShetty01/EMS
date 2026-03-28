import React from "react";
import PropTypes from "prop-types";
import axios from "axios";

export const columns = [
    {
        name: "S No",
        selector: (row) => row.sno,
        width: "70px",
    },
    {
        name: "Name",
        selector: (row) => row.name,
        sortable: true,
        minWidth: "180px",
    },
    {
        name: "Emp Id",
        selector: (row) => row.employeeId,
        sortable: true,
        minWidth: "130px",
    },
    {
        name: "Department",
        selector: (row) => row.department,
        sortable: true,
        minWidth: "150px",
    },
    {
        name: "Action",
        cell: (row) => row.action,
        center: true,
    },
];

export const AttendenceHelper = ({ status, employeeId, statusChanges }) => {
    const markEmployee = async (status, employeeId) => {
        try {
            const response = await axios.put(
                `http://localhost:5000/api/attendence/update/${employeeId}`,
                { status },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            if (response.data.success) {
                statusChanges();
            } else {
                alert("Failed to update status.");
            }
        } catch (error) {
            console.error("Error updating status:", error.message);
            alert("Error updating attendance status.");
        }
    };

    return (
        <div>
            {status === null ? (
                <div className="flex flex-wrap gap-2">
                    <button
                        className="px-3 py-1.5 rounded-md text-xs font-semibold bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                        onClick={() => markEmployee("present", employeeId)}
                    >
                        Present
                    </button>
                    <button
                        className="px-3 py-1.5 rounded-md text-xs font-semibold bg-rose-100 text-rose-800 hover:bg-rose-200"
                        onClick={() => markEmployee("absent", employeeId)}
                    >
                        Absent
                    </button>
                    <button
                        className="px-3 py-1.5 rounded-md text-xs font-semibold bg-slate-200 text-slate-800 hover:bg-slate-300"
                        onClick={() => markEmployee("sick", employeeId)}
                    >
                        Sick
                    </button>
                    <button
                        className="px-3 py-1.5 rounded-md text-xs font-semibold bg-amber-100 text-amber-800 hover:bg-amber-200"
                        onClick={() => markEmployee("leave", employeeId)}
                    >
                        Leave
                    </button>
                </div>
            ) : (
                <p className="bg-slate-100 text-slate-700 px-3 py-1.5 rounded-md text-center text-xs font-semibold capitalize w-24">
                    {status}
                </p>
            )}
        </div>
    );
};

AttendenceHelper.propTypes = {
    status: PropTypes.string,
    employeeId: PropTypes.string.isRequired,
    statusChanges: PropTypes.func.isRequired,
};

export default AttendenceHelper;
