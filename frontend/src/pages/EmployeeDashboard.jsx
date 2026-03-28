//import React from "react";
import Sidebar from "../components/EmployeeDashboard/Sidebar"
import { Outlet } from "react-router-dom"
import Navbar from "../components/dashboard/Navbar"

const EmployeeDashboard =() => {
    return(
        <div className='flex app-shell'>
        <Sidebar />
        <div className='app-main'>
            <Navbar />
            <div className='app-top-gap'>
                <Outlet />
            </div>
        </div>
    </div>
    )
}

export default EmployeeDashboard