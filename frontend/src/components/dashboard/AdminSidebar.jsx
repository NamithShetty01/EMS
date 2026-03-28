import { NavLink } from "react-router-dom";
import {  FaTachometerAlt, FaUsers, FaBuilding, FaCalendarAlt, FaMoneyBillWave, FaCogs, FaRegCalendarAlt } from "react-icons/fa";
//import {AiOutlineFileText} from 'react-icons/ai'

const AdminSidebar = () => {
    return (
        <div className="bg-slate-950/95 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64 border-r border-slate-800">
            <div className="h-16 flex items-center justify-center border-b border-slate-800 bg-slate-900">
            <h3 className="text-xl font-extrabold tracking-wide">Employee MS</h3>
            </div>

            <div className="px-3 py-2 space-y-1">
                <NavLink to="/admin-dashboard"
                 className={({isActive}) => 
                 `${isActive ?"bg-teal-600 text-white":"text-slate-200 hover:bg-slate-800"} flex items-center space-x-3 py-2.5 px-3 rounded-lg transition-colors`}
                 end >
                    <FaTachometerAlt />
                    <span>Dashboard</span>
                </NavLink>

                <NavLink to="/admin-dashboard/employees"
                   className={({isActive}) => 
                   `${isActive ?"bg-teal-600 text-white":"text-slate-200 hover:bg-slate-800"} flex items-center space-x-3 py-2.5 px-3 rounded-lg transition-colors`}
                   end >
                    <FaUsers/>
                    <span>Employees</span>
                </NavLink>

                <NavLink to="/admin-dashboard/department" 
                   className={({isActive}) => 
                   `${isActive ?"bg-teal-600 text-white":"text-slate-200 hover:bg-slate-800"} flex items-center space-x-3 py-2.5 px-3 rounded-lg transition-colors`}
                   end>
                    <FaBuilding/>
                    <span>Department</span>
                </NavLink>

                <NavLink to="/admin-dashboard/leaves" 
                    className={({isActive}) => 
                    `${isActive ?"bg-teal-600 text-white":"text-slate-200 hover:bg-slate-800"} flex items-center space-x-3 py-2.5 px-3 rounded-lg transition-colors`}
                    end >
                    <FaCalendarAlt />
                    <span>Leave</span>
                </NavLink>

                <NavLink to="/admin-dashboard/salary/add" 
                    className={({isActive}) => 
                    `${isActive ?"bg-teal-600 text-white":"text-slate-200 hover:bg-slate-800"} flex items-center space-x-3 py-2.5 px-3 rounded-lg transition-colors`}
                    end>
                    <FaMoneyBillWave />
                    <span>Salary</span>
                </NavLink>

                {/* <NavLink to="/admin-dashboard/attendence/"
                    className={({isActive}) => 
                    `${isActive ?"bg-teal-500":" "} flex items-center space-x-4 py-2.5 px-4 rounded`}
                    end>
                    <FaRegCalendarAlt />
                    <span>Attendence</span>
                </NavLink> */}

                {/* <NavLink to="/admin-dashboard/attendence-report/"
                    className={({isActive}) => 
                    `${isActive ?"bg-teal-500":" "} flex items-center space-x-4 py-2.5 px-4 rounded`}
                    end>
                    <AiOutlineFileText />
                    <span>Attendence Report</span>
                </NavLink> */}

                <NavLink to="/admin-dashboard/setting"
                    className={({isActive}) => `${isActive ?"bg-teal-600 text-white":"text-slate-200 hover:bg-slate-800"} flex items-center space-x-3 py-2.5 px-3 rounded-lg transition-colors`}
                    end>
                    <FaCogs />
                     <span>Settings</span>
                </NavLink>
            </div>
        </div>
    );
};

export default AdminSidebar;
