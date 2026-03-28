import { useEffect, useState } from "react";
import SummaryCard from "./dashboard/SummaryCard";
import {
  FaBuilding,
  FaCheckCircle,
  FaFileAlt,
  FaHourglassHalf,
  FaMoneyBillWave,
  FaTimesCircle,
  FaUsers,
} from "react-icons/fa";
import axios from "axios";

const AdminSummary = () => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/dashboard/summary", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setSummary(response.data);
      } catch (error) {
        if (error.response) {
          alert(error.response.data.error);
        }
        console.log(error.message);
      }
    };
    fetchSummary();
  }, []);

  if (!summary) {
    return <div className="app-card p-6">Loading..</div>;
  }

  return (
    <div>
      <div className="app-page-header">
        <p className="app-page-eyebrow">Overview</p>
        <h3 className="app-page-title">Dashboard Snapshot</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <SummaryCard icon={<FaUsers />} text="Total Employees" number={summary.totalEmployees} color="bg-teal-600" />
        <SummaryCard icon={<FaBuilding />} text="Total Department" number={summary.totalDepartments} color="bg-sky-600" />
        <SummaryCard icon={<FaMoneyBillWave />} text="Monthly Salary" number={summary.totalSalary} color="bg-rose-600" />
      </div>

      <div className="mt-12">
        <h3 className="text-xl font-extrabold text-slate-900">Leave Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <SummaryCard icon={<FaFileAlt />} text="Leave Applied" number={summary.leaveSummary.appliedFor} color="bg-teal-600" />
          <SummaryCard icon={<FaCheckCircle />} text="Leave Approved" number={summary.leaveSummary.approved} color="bg-green-600" />
          <SummaryCard icon={<FaHourglassHalf />} text="Leave Pending" number={summary.leaveSummary.pending} color="bg-amber-600" />
          <SummaryCard icon={<FaTimesCircle />} text="Leave Rejected" number={summary.leaveSummary.rejected} color="bg-red-600" />
        </div>
      </div>
    </div>
  );
};

export default AdminSummary;
