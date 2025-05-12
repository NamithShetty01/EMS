import React from "react";
import PropTypes from "prop-types";
import axios from "axios";

export const columns = [
    {
        name: "S No",
        selector: row => row.sno,
        width: "70px",
    },
    {
        name: "Name",
        selector: row => row.name,
        sortable: true,
        width: "100px",
    },
    {
        name: "Emp Id",
        selector: row => row.employeeId,
        sortable: true,
        width: "100px",
    },
    {
        name: "Department",
        selector: row => row.departmentName,
        sortable: true,
        width: "120px",
    },
    {
        name: "Action",
        cell: row => row.action,
        center: true,
    },
];

export const AttendanceHelper = ({ status, employeeId, statusChanges }) => {
    const markEmployee = async (status, employeeId) => {
        try {
            const response = await axios.put(
                `http://localhost:5000/api/attendance/update/${employeeId}`,
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
                        className="px-3 py-1 bg-green-500 text-white rounded"
                        onClick={() => markEmployee("present", employeeId)}
                    >
                        Present
                    </button>
                    <button
                        className="px-3 py-1 bg-red-500 text-white rounded"
                        onClick={() => markEmployee("absent", employeeId)}
                    >
                        Absent
                    </button>
                    <button
                        className="px-3 py-1 bg-gray-600 text-white rounded"
                        onClick={() => markEmployee("sick", employeeId)}
                    >
                        Sick
                    </button>
                    <button
                        className="px-3 py-1 bg-yellow-500 text-white rounded"
                        onClick={() => markEmployee("leave", employeeId)}
                    >
                        Leave
                    </button>
                </div>
            ) : (
                <p className="bg-gray-100 px-3 py-1 rounded text-center capitalize w-24">
                    {status}
                </p>
            )}
        </div>
    );
};

AttendanceHelper.propTypes = {
    status: PropTypes.string,
    employeeId: PropTypes.string.isRequired,
    statusChanges: PropTypes.func.isRequired,
};

export default AttendanceHelper;
