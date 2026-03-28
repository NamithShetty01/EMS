import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const View = () => {
    const [salaries, setSalaries] = useState([]);
    const [filteredSalaries, setFilteredSalaries] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    let sno = 1;
    

    const fetchSalaries = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:5000/api/salary/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });

            if (response.data.success) {
                setSalaries(response.data.salary);
                setFilteredSalaries(response.data.salary);
            }
        } catch (error) {
            alert(error.response?.data?.error || "Failed to fetch salary details.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSalaries();
    }, [id]);

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = salaries.filter((salary) =>
            salary.employeeId?.employeeId?.toLowerCase().includes(query)
        );
        setFilteredSalaries(filtered);
    };

    return (
        <div className="overflow-x-auto p-6 app-card">
            <div className="mb-4">
                <h2 className="text-2xl font-extrabold text-slate-900">Salary History</h2>
                <p className="text-sm text-slate-500">Track payment records and compensation breakdown.</p>
            </div>

            <div className="flex justify-end mb-4">
                <input
                    type="text"
                    placeholder="Search by Emp ID"
                    className="app-input max-w-xs"
                    onChange={handleSearch}
                />
            </div>

            {loading ? (
                <div className="text-center text-gray-500">Loading salary records...</div>
            ) : filteredSalaries.length > 0 ? (
                <table className="w-full text-sm text-left text-gray-600 border border-slate-200 rounded-lg overflow-hidden">
                    <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                        <tr>
                            <th className="px-6 py-3">S No</th>
                            <th className="px-6 py-3">Emp ID</th>
                            <th className="px-6 py-3">Salary</th>
                            <th className="px-6 py-3">Allowances</th>
                            <th className="px-6 py-3">Deduction</th>
                            <th className="px-6 py-3">Total</th>
                            <th className="px-6 py-3">Pay Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSalaries.map((salary) => (
                            <tr key={salary._id} className="bg-white border-b border-slate-100 hover:bg-slate-50">
                                <td className="px-6 py-3">{sno++}</td>
                                <td className="px-6 py-3">{salary.employeeId?.employeeId || 'N/A'}</td>
                                <td className="px-6 py-3">{salary.basicSalary}</td>
                                <td className="px-6 py-3">{salary.allowances}</td>
                                <td className="px-6 py-3">{salary.deduction}</td>
                                <td className="px-6 py-3">{salary.netSalary}</td>
                                <td className="px-6 py-3">{new Date(salary.payDate).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="text-center text-gray-600 mt-4">No records found.</div>
            )}
        </div>
    );
};

export default View;
