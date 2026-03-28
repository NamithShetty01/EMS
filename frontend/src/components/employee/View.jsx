import { useParams } from "react-router-dom";
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

const View = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/employee/${id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                });

                if (response.data.success) {
                    setEmployee(response.data.employee);
                }
            } catch (error) {
                alert(error.response?.data?.error || "Failed to fetch employee details.");
            }
        };

        fetchEmployee();
    }, [id]);

    if (!employee) {
        return <div className="app-card p-6 text-center text-lg">Loading...</div>;
    }

    return (
        <div className='max-w-5xl mx-auto mt-5 app-card p-8'>
            <h2 className='text-2xl font-extrabold mb-1'>Employee Details</h2>
            <p className='text-sm text-slate-500 mb-8'>Comprehensive employee profile and personal information.</p>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                <div className="flex justify-center md:justify-start">
                    <img 
                        src={resolveProfileImageUrl(employee?.userId?.profileImage)}
                        alt="Profile" 
                        className='rounded-2xl border border-slate-200 w-72 h-72 object-cover shadow-sm' 
                    />
                </div>
                <div>
                    <div className='flex space-x-3 mb-5'>
                        <p className='text-sm font-bold text-slate-500 w-32'>Name</p>
                        <p className='font-semibold text-slate-900'>{employee?.userId?.name}</p>
                    </div>
                    <div className='flex space-x-3 mb-5'>
                        <p className='text-sm font-bold text-slate-500 w-32'>Employee ID</p>
                        <p className='font-semibold text-slate-900'>{employee?.employeeId}</p>
                    </div>
                    <div className='flex space-x-3 mb-5'>
                        <p className='text-sm font-bold text-slate-500 w-32'>Date of Birth</p>
                        <p className='font-semibold text-slate-900'>{new Date(employee?.dob).toLocaleDateString()}</p>
                    </div>
                    <div className='flex space-x-3 mb-5'>
                        <p className='text-sm font-bold text-slate-500 w-32'>Gender</p>
                        <p className='font-semibold text-slate-900 capitalize'>{employee?.gender}</p>
                    </div>
                    <div className='flex space-x-3 mb-5'>
                        <p className='text-sm font-bold text-slate-500 w-32'>Department</p>
                        <p className='font-semibold text-slate-900'>{employee?.department?.dep_name}</p>
                    </div>
                    <div className='flex space-x-3 mb-5'>
                        <p className='text-sm font-bold text-slate-500 w-32'>Marital Status</p>
                        <p className='font-semibold text-slate-900 capitalize'>{employee?.maritalStatus}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default View;
