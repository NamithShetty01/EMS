import { NavLink } from "react-router-dom";
import {  FaTachometerAlt, FaUsers, FaBuilding, FaCalendarAlt, FaMoneyBillWave, FaCogs, FaRegCalendarAlt } from "react-icons/fa";
import {AiOutlineFileText} from 'react-icons/ai'

const AdminSidebar = () => {
    return (
        <div className="bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64">
            <div className="bg-teal-600 h-12 flex item -center justify-center">
            <h3 className="text-2xl">Employee MS</h3>
            </div>

            <div className="px-4">
                <NavLink to="/admin-dashboard"
                 className={({isActive}) => 
                 `${isActive ?"bg-teal-500":" "} flex items-center space-x-4 py-2.5 px-4 rounded`}
                 end >
                    <FaTachometerAlt />
                    <span>Dashboard</span>
                </NavLink>

                <NavLink to="/admin-dashboard/employees"
                   className={({isActive}) => 
                   `${isActive ?"bg-teal-500":" "} flex items-center space-x-4 py-2.5 px-4 rounded`}
                   end >
                    <FaUsers/>
                    <span>Employees</span>
                </NavLink>

                <NavLink to="/admin-dashboard/department" 
                   className={({isActive}) => 
                   `${isActive ?"bg-teal-500":" "} flex items-center space-x-4 py-2.5 px-4 rounded`}
                   end>
                    <FaBuilding/>
                    <span>Department</span>
                </NavLink>

                <NavLink to="/admin-dashboard/leaves" 
                    className={({isActive}) => 
                    `${isActive ?"bg-teal-500":" "} flex items-center space-x-4 py-2.5 px-4 rounded`}
                    end >
                    <FaCalendarAlt />
                    <span>Leave</span>
                </NavLink>

                <NavLink to="/admin-dashboard/salary/add" 
                    className={({isActive}) => 
                    `${isActive ?"bg-teal-500":" "} flex items-center space-x-4 py-2.5 px-4 rounded`}
                    end>
                    <FaMoneyBillWave />
                    <span>Salary</span>
                </NavLink>

                 <NavLink to="/admin-dashboard/attendance/"
                    className={({isActive}) => 
                    `${isActive ?"bg-teal-500":" "} flex items-center space-x-4 py-2.5 px-4 rounded`}
                    end>
                    <FaRegCalendarAlt />
                    <span>Attendence</span>
                </NavLink>

                 <NavLink to="/admin-dashboard/attendance-report/"
                    className={({isActive}) => 
                    `${isActive ?"bg-teal-500":" "} flex items-center space-x-4 py-2.5 px-4 rounded`}
                    end>
                    <AiOutlineFileText />
                    <span>Attendence Report</span>
                </NavLink>

                <NavLink to="/admin-dashboard/setting"
                    className={({isActive}) => `${isActive ?"bg-teal-500":" "} flex items-center space-x-4 py-2.5 px-4 rounded`}
                    end>
                    <FaCogs />
                     <span>Settings</span>
                </NavLink>
            </div>
        </div>
    );
};

export default AdminSidebar;
