import axios from 'axios';
import { useState } from 'react';
import { useAuth } from "../../context/authContext";
import { useNavigate } from 'react-router-dom';

const Add = () => {
    const { user } = useAuth();

    const today = new Date().toISOString().split("T")[0];

    const [leave, setLeave] = useState({
        userId: user._id,
        leaveType: "",
        startDate: today,
        endDate: today,
        reason: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLeave((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `http://localhost:5000/api/leave/add`,
                leave,
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                }
            );

            if (response.data.success) {
                navigate(`/employee-dashboard/leaves/${user._id}`);
            }
        } catch (error) {
            alert(error.response?.data?.error || "Failed to submit leave request.");
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-5 app-card p-8">
            <h2 className="text-2xl font-extrabold mb-1">Request for Leave</h2>
            <p className="text-sm text-slate-500 mb-6">Submit a leave request with dates and reason.</p>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col space-y-4">
                    {/* Leave Type */}
                    <div>
                        <label className="app-label">
                            Leave Type
                        </label>
                        <select
                            name="leaveType"
                            value={leave.leaveType}
                            onChange={handleChange}
                            className="app-select"
                            required
                        >
                            <option value="">Select Leave</option>
                            <option value="Sick Leave">Sick Leave</option>
                            <option value="Casual Leave">Casual Leave</option>
                            <option value="Annual Leave">Annual Leave</option>
                        </select>
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="app-label">
                                From Date
                            </label>
                            <input
                                type="date"
                                name="startDate"
                                value={leave.startDate}
                                onChange={handleChange}
                                className="app-input"
                                required
                            />
                        </div>

                        <div>
                            <label className="app-label">
                                To Date
                            </label>
                            <input
                                type="date"
                                name="endDate"
                                value={leave.endDate}
                                onChange={handleChange}
                                className="app-input"
                                required
                            />
                        </div>
                    </div>

                    {/* Reason */}
                    <div>
                        <label className="app-label">
                            Description
                        </label>
                        <input
                            type="text"
                            name="reason"
                            value={leave.reason}
                            onChange={handleChange}
                            className="app-input"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full mt-6 app-btn-primary"
                    >
                        Add Leave
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Add;
