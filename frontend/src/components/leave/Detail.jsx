import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const resolveProfileImageUrl = (profileImage) => {
    if (!profileImage) {
        return "https://via.placeholder.com/300x300?text=Profile";
    }

    const normalizedPath = String(profileImage).replace(/\\/g, "/").trim();
    const cleanPath = normalizedPath.startsWith("/") ? normalizedPath.slice(1) : normalizedPath;

    if (cleanPath.startsWith("http://") || cleanPath.startsWith("https://")) {
        return cleanPath;
    }

    if (cleanPath.startsWith("uploads/")) {
        return `http://localhost:5000/${cleanPath}`;
    }

    return `http://localhost:5000/uploads/${cleanPath}`;
};

const Detail = () => {
    const { id } = useParams();
    const [leave, setLeave] = useState(null);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchLeave = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/leave/detail/${id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                });
        
                if (response.data.success) {
                    setLeave(response.data.leave);
                }
            } catch (error) {
                alert(error.response?.data?.error || "Failed to fetch employee details.");
            }
        };
        

        fetchLeave();
    }, [id]);

    const changeStatus = async (id, status) =>{
        try {
            const response = await axios.put(`http://localhost:5000/api/leave/${id}`, {status},{
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
    
            if (response.data.success) {
                navigate('/admin-dashboard/leaves')
            }
        } catch (error) {
            alert(error.response?.data?.error || "Failed to fetch employee details.");
        }
    }
    if (!leave) {
        return <div className="app-card p-6 text-center text-lg">Loading...</div>;
    }

    return (
        <div className='max-w-5xl mx-auto mt-5 app-card p-8'>
            <h2 className='text-2xl font-extrabold mb-1'>Leave Details</h2>
            <p className='text-sm text-slate-500 mb-8'>Review leave request information and status action.</p>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                <div className="flex justify-center md:justify-start">
                    <img 
                        src={resolveProfileImageUrl(leave?.employeeId?.userId?.profileImage)}
                        alt="Profile" 
                        className='rounded-2xl border border-slate-200 w-72 h-72 object-cover shadow-sm' 
                    />
                </div>
                <div>
                    <div className='flex space-x-3 mb-5'>
                        <p className='text-sm font-bold text-slate-500 w-32'>Name</p>
                        <p className='font-semibold text-slate-900'>{leave?.employeeId?.userId?.name}</p>
                    </div>
                    <div className='flex space-x-3 mb-5'>
                        <p className='text-sm font-bold text-slate-500 w-32'>Employee ID</p>
                        <p className='font-semibold text-slate-900'>{leave?.employeeId?.employeeId}</p>
                    </div>
                    <div className='flex space-x-3 mb-5'>
                        <p className='text-sm font-bold text-slate-500 w-32'>Leave Type</p>
                        <p className='font-semibold text-slate-900'>{leave?.leaveType}</p>
                    </div>
                    <div className='flex space-x-3 mb-5'>
                        <p className='text-sm font-bold text-slate-500 w-32'>Reason</p>
                        <p className='font-semibold text-slate-900'>{leave?.reason}</p>
                    </div>
                    <div className='flex space-x-3 mb-5'>
                        <p className='text-sm font-bold text-slate-500 w-32'>Department</p>
                        <p className='font-semibold text-slate-900'>{leave?.employeeId?.department?.dep_name}</p>
                    </div>
                    <div className='flex space-x-3 mb-5'>
                        <p className='text-sm font-bold text-slate-500 w-32'>Start Date</p>
                        <p className='font-semibold text-slate-900'>{new Date(leave?.startDate).toLocaleDateString()}</p>
                    </div>
                    <div className='flex space-x-3 mb-5'>
                        <p className='text-sm font-bold text-slate-500 w-32'>End Date</p>
                        <p className='font-semibold text-slate-900'>{new Date(leave?.endDate).toLocaleDateString()}</p>
                    </div>
                    <div className='flex space-x-3 mb-5'>
                        <p className='text-sm font-bold text-slate-500 w-32'>
                        {leave.status === "Pending" ? "Action:" : "Status:"}
                        </p>
                            {leave.status === "Pending" ?(
                                <div className='flex space-x-2'>
                                    <button className='px-3 py-1.5 rounded-md text-xs font-semibold bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                   onClick={() => changeStatus(leave._id, "Approved")}>Approve</button>
                                    <button className='px-3 py-1.5 rounded-md text-xs font-semibold bg-rose-100 text-rose-800 hover:bg-rose-200'
                                     onClick={() => changeStatus(leave._id, "Rejected")}>Reject</button>
                                </div>
                            ):
                        <p className='font-semibold text-slate-900'>{leave?.status}</p>
                         }
                    </div>
                </div>
            </div>
         </div>    
    );
};

export default Detail;
