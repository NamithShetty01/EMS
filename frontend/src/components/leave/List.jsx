//import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/authContext';


const List = () => {
    const [leaves,setLeaves] = useState(null)
    let sno =1;
    const {id} = useParams ()
    const {user} = useAuth()


    const fechLeaves = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/leave/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });

            if (response.data.success) {
                setLeaves(response.data.leaves);
            }
        } catch (error) {
            alert(error.response?.data?.error || "Failed to fetch salary details.");
        }
    };

    useEffect(() => {
        fechLeaves();
    }, []);

    if (!leaves) {
        return <div className="app-card p-6">Loading</div>
    }
    return(
        <div className="p-1">
            <div className="app-page-header">
                <p className="app-page-eyebrow">Time Off</p>
                <h3 className="app-page-title">Manage Leave</h3>
            </div>
            <div className="app-card p-5">
            <div className="flex flex-col md:flex-row justify-between gap-3 md:items-center">
                <input
                    type="text"
                    placeholder="Search by status"
                    className="app-input md:max-w-sm"

                />
                {user.role === "employee" && (
                <Link
                    to="/employee-dashboard/add-leave"
                    className="app-btn-primary text-center"
                >
                    Add New Leave
                </Link>
                )}
            </div>
            <table className="w-full text-sm text-left text-gray-500 mt-6 border border-slate-200 rounded-lg overflow-hidden">
                    <thead className="text-xs text-gray-700 uppercase bg-slate-50 border border-slate-200">
                        <tr>
                            <th className="px-6 py-3">S No</th>
                            <th className="px-6 py-3">Leave type</th>
                            <th className="px-6 py-3">From</th>
                            <th className="px-6 py-3">To</th>
                            <th className="px-6 py-3">Description</th>
                            <th className="px-6 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaves.map((leave) => (
                            <tr key={leave._id} className="bg-white border-b border-slate-100 hover:bg-slate-50">
                                <td className="px-6 py-3">{sno++}</td>
                                <td className="px-6 py-3">{leave.leaveType}</td>
                                <td className="px-6 py-3">{new Date(leave.startDate).toLocaleDateString()}</td>
                                <td className="px-6 py-3">{new Date(leave.endDate).toLocaleDateString()}</td>
                                <td className="px-6 py-3">{leave.reason}</td>
                                <td className="px-6 py-3">{leave.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default List