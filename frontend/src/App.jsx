import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import PrivateRoutes from "./utils/PrivateRoutes";
import RoleBaseRoutes from "./utils/RoleBaseRoutes";
import AdminSummary from "./components/AdminSummary";
import DepartmentList from "./components/department/DepartmentList";
import AddDepartment from "./components/department/AddDepartment";
import EditDepartment from "./components/department/EditDepartment"; // ✅ fixed typo
import List from "./components/employee/List";
import Add from "./components/employee/Add";
import View from "./components/employee/View";
import Edit from "./components/employee/Edit";
import AddSalary from "./components/salary/Add";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import Summary from "./components/EmployeeDashboard/Summary"; 
import LeaveList from "./components/leave/List";
import AddLeave from "./components/leave/Add";
import ViewSalary from "./components/salary/View";
import Setting from "./components/EmployeeDashboard/Setting";
import Table from "./components/leave/Table";
import Detail from "./components/leave/Detail";
import { useAuth } from "./context/authContext";
import Attendence from "./components/attendence/Attendence";
import AttendenceReport from "./components/attendence/AttendenceReport";

const App = () => {
  const { loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Show spinner or loading screen
  }
  return (
    <BrowserRouter>
      <Routes>

        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/admin-dashboard" />} />

        {/* Public route */}
        <Route path="/login" element={<Login />} />

        {/* Unauthorized page */}
        <Route path="/unauthorized" element={<UnauthorizedPage />} />

        {/* Admin dashboard + protected subroutes */}
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoutes>
              <RoleBaseRoutes requiredRole={["admin"]}>
                <AdminDashboard />
              </RoleBaseRoutes>
            </PrivateRoutes>
          }
        >
          <Route index element={<AdminSummary />} />
          <Route path="department" element={<DepartmentList />} />
          <Route path="add-department" element={<AddDepartment />} />
          <Route path="department/:id" element={<EditDepartment />} />

          <Route path="employees" element={<List />} />
          <Route path="add-employee" element={<Add />} />
          <Route path="employees/:id" element={<View />} />
          <Route path="employees/edit/:id" element={<Edit />} />
          <Route path="employees/salary/:id" element={<ViewSalary />} />
          <Route path="salary/add" element={<AddSalary />} />
          <Route path="leaves" element={<Table />} />
          <Route path="/admin-dashboard/leaves/:id" element={<Detail />} />
          <Route path="/admin-dashboard/employees/leaves/:id" element={<LeaveList />} />
          <Route path="/admin-dashboard/setting" element={<Setting />}/>
          <Route path="/admin-dashboard/attendence" element={<Attendence />}/>
          <Route path="/admin-dashboard/attendence-report" element={<AttendenceReport />}/>


        </Route>

        {/* Employee dashboard */}
        <Route
          path="/employee-dashboard"
          element={
            <PrivateRoutes>
              <RoleBaseRoutes requiredRole={["admin", "employee"]}>
                <EmployeeDashboard />
              </RoleBaseRoutes>
            </PrivateRoutes>
          }
        >
           <Route index element={<Summary />}></Route>

           <Route path="/employee-dashboard/profile/:id" element={<View />}></Route>
           <Route path="/employee-dashboard/leaves/:id" element={<LeaveList />}></Route>
           <Route path="/employee-dashboard/add-leave" element={<AddLeave />}></Route>
           <Route path="/employee-dashboard/salary/:id" element={<ViewSalary />}></Route>
           <Route path="/employee-dashboard/setting" element={<Setting />}></Route>




          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
