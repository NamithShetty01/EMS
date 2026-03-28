//import React from "react";
import AdminSidebar from "../components/dashboard/AdminSidebar";
import { useAuth } from "../context/authContext";
import Navbar from '../components/dashboard/Navbar'
import { Outlet } from "react-router-dom";

const AdminDashboard =() => {
    const {user} = useAuth()

    
    return (
        <div className='flex app-shell'>
            <AdminSidebar />
            <div className='app-main'>
                <Navbar />
                <div className='app-top-gap'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard