import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";

import PrivateRoutes from "./utils/PrivateRoutes";
import RoleBaseRoutes from "./utils/RoleBaseRoutes";

import AdminSummary from "./components/AdminSummary";

import DepartmentList from "./components/department/DepartmentList";
import AddDepartment from "./components/department/AddDepartment";
import EditDepartment from "./components/department/EditDepartment";

import List from "./components/employee/List";
import Add from "./components/employee/Add";
import View from "./components/employee/View";
import Edit from "./components/employee/Edit";

import AddSalary from "./components/salary/Add";
import ViewSalary from "./components/salary/View";

import UnauthorizedPage from "./pages/unauthorizedPage";

import Summary from "./components/EmployeeDashboard/Summary";
import Setting from "./components/EmployeeDashboard/Setting";

import LeaveList from "./components/leave/List";
import AddLeave from "./components/leave/Add";
import Table from "./components/leave/Table";
import Detail from "./components/leave/Detail";

import { useAuth } from "./context/authContext";

import Attendence from "./components/attendence/Attendence";
import AttendenceReport from "./components/attendence/AttendenceReport";


const App = () => {
  const { loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>

        {/* ==================== DEFAULT ROUTE ==================== */}
        <Route
          path="/"
          element={<Navigate to="/admin-dashboard" replace />}
        />


        {/* ==================== PUBLIC ROUTE ==================== */}
        <Route
          path="/login"
          element={<Login />}
        />


        {/* ==================== UNAUTHORIZED ==================== */}
        <Route
          path="/unauthorized"
          element={<UnauthorizedPage />}
        />


        {/* ====================================================== */}
        {/*                     ADMIN DASHBOARD                    */}
        {/* ====================================================== */}

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

          {/* Admin Dashboard Home */}
          <Route
            index
            element={<AdminSummary />}
          />

          {/* ==================== DEPARTMENT ==================== */}

          <Route
            path="department"
            element={<DepartmentList />}
          />

          <Route
            path="add-department"
            element={<AddDepartment />}
          />

          <Route
            path="department/:id"
            element={<EditDepartment />}
          />


          {/* ==================== EMPLOYEES ==================== */}

          <Route
            path="employees"
            element={<List />}
          />

          <Route
            path="add-employee"
            element={<Add />}
          />

          <Route
            path="employees/:id"
            element={<View />}
          />

          <Route
            path="employees/edit/:id"
            element={<Edit />}
          />

          <Route
            path="employees/salary/:id"
            element={<ViewSalary />}
          />


          {/* ==================== SALARY ==================== */}

          <Route
            path="salary/add"
            element={<AddSalary />}
          />


          {/* ==================== LEAVE ==================== */}

          <Route
            path="leaves"
            element={<Table />}
          />

          <Route
            path="leaves/:id"
            element={<Detail />}
          />

          <Route
            path="employees/leaves/:id"
            element={<LeaveList />}
          />


          {/* ==================== SETTINGS ==================== */}

          <Route
            path="setting"
            element={<Setting />}
          />


          {/* ==================== ATTENDANCE ==================== */}

          <Route
            path="attendence"
            element={<Attendence />}
          />

          <Route
            path="attendence-report"
            element={<AttendenceReport />}
          />

        </Route>


        {/* ====================================================== */}
        {/*                   EMPLOYEE DASHBOARD                   */}
        {/* ====================================================== */}

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

          {/* Employee Dashboard Home */}
          <Route
            index
            element={<Summary />}
          />


          {/* ==================== PROFILE ==================== */}

          <Route
            path="profile/:id"
            element={<View />}
          />


          {/* ==================== LEAVE ==================== */}

          <Route
            path="leaves/:id"
            element={<LeaveList />}
          />

          <Route
            path="add-leave"
            element={<AddLeave />}
          />


          {/* ==================== SALARY ==================== */}

          <Route
            path="salary/:id"
            element={<ViewSalary />}
          />


          {/* ==================== SETTINGS ==================== */}

          <Route
            path="setting"
            element={<Setting />}
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
};


export default App;