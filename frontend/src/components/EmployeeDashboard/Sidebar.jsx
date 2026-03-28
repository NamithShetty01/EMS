//import { useState } from "react";
import { NavLink } from "react-router-dom";
import {  FaTachometerAlt, FaUsers, FaBuilding, FaMoneyBillWave, FaCogs } from "react-icons/fa";
import { useAuth } from "../../context/authContext";

const Sidebar = () => {
    const {user} = useAuth()
    return (
        <div className="bg-slate-950/95 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64 border-r border-slate-800">
            <div className="h-16 flex items-center justify-center border-b border-slate-800 bg-slate-900">
            <h3 className="text-xl font-extrabold tracking-wide">Employee MS</h3>
            </div>

            <div className="px-3 py-2 space-y-1">
                <NavLink to="/employee-dashboard"
                 className={({isActive}) => 
                 `${isActive ?"bg-teal-600 text-white":"text-slate-200 hover:bg-slate-800"} flex items-center space-x-3 py-2.5 px-3 rounded-lg transition-colors`}
                 end >
                    <FaTachometerAlt />
                    <span>Dashboard</span>
                </NavLink>

                <NavLink to={`/employee-dashboard/profile/${user._id}`}
                   className={({isActive}) => 
                   `${isActive ?"bg-teal-600 text-white":"text-slate-200 hover:bg-slate-800"} flex items-center space-x-3 py-2.5 px-3 rounded-lg transition-colors`}
                   end >
                    <FaUsers/>
                    <span>My Profile</span>
                </NavLink>

                <NavLink to={`/employee-dashboard/leaves/${user._id}`} 
                   className={({isActive}) => 
                   `${isActive ?"bg-teal-600 text-white":"text-slate-200 hover:bg-slate-800"} flex items-center space-x-3 py-2.5 px-3 rounded-lg transition-colors`}
                   end>
                    <FaBuilding/>
                    <span>Leave</span>
                </NavLink>

                <NavLink to={`/employee-dashboard/salary/${user._id}`}
                    className={({isActive}) => 
                    `${isActive ?"bg-teal-600 text-white":"text-slate-200 hover:bg-slate-800"} flex items-center space-x-3 py-2.5 px-3 rounded-lg transition-colors`}
                    end>
                    <FaMoneyBillWave />
                    <span>Salary</span>
                </NavLink>

                <NavLink to="/employee-dashboard/setting"
                    className={({isActive}) => `${isActive ?"bg-teal-600 text-white":"text-slate-200 hover:bg-slate-800"} flex items-center space-x-3 py-2.5 px-3 rounded-lg transition-colors`}
                    end>
                    <FaCogs />
                     <span>Settings</span>
                </NavLink>
            </div>
            
        </div>
    );
};

export default Sidebar;
