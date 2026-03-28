import axios from "axios";
import React, { useEffect, useState } from "react";

const AttendenceReport = () => {
    const [report, setReport] = useState();
    const [limit, setLimit] = useState(5);
    const [skip, setSkip] = useState(0);
    const [dataFilter, setDataFilter] = useState();
    const [loading, setLoading] = useState(false);
    const [noMoreData, setNoMoreData] = useState(false); // To track if there is more data

    const fetchReport = async () => {
        try {
            setLoading(true);
            const query = new URLSearchParams({ limit, skip });
            if (dataFilter) {
                query.append("date", dataFilter); // Use "date" instead of "data" for filtering
            }

            const response = await axios.get(`http://localhost:5000/api/attendence/report?${query.toString()}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (response.data.success) {
                const groupedData = response.data.groupData || {};

                if (skip === 0) {
                    setReport(groupedData);
                } else {
                    setReport((prevData) => ({ ...prevData, ...groupedData }));
                }

                const loadedRows = Object.values(groupedData).reduce(
                    (total, records) => total + records.length,
                    0
                );

                if (loadedRows < limit) {
                    setNoMoreData(true);
                } else {
                    setNoMoreData(false);
                }
            }
        } catch (error) {
            alert("Error fetching report: " + (error.message || "Unexpected error"));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReport();
    }, [skip, dataFilter]);

    const handleLoadMore = () => {
        if (!noMoreData) {
            setSkip((prevSkip) => prevSkip + limit);
        }
    };

    return (
        <div className='p-1'>
            <div className="app-page-header">
                <p className="app-page-eyebrow">Attendance</p>
                <h2 className='app-page-title'>Attendance Report</h2>
            </div>
            <div className="app-card p-5 mb-4">
                <h2 className='text-sm font-bold text-slate-500 mb-2'>Filter by Date</h2>
                <input
                    type="date"
                    className='app-input max-w-xs'
                    onChange={(e) => {
                        setDataFilter(e.target.value);
                        setSkip(0);
                    }}
                />
            </div>

            {loading ? (
                <div className="app-card p-6">Loading...</div>
            ) : report && Object.keys(report).length > 0 ? (
                Object.entries(report).map(([date, records]) => (
                    <div className='app-card p-5 mt-4' key={date}>
                        <h2 className='text-lg font-bold text-slate-900 mb-3'>{date}</h2>
                        <table className='w-full text-sm text-left text-slate-700 border border-slate-200 rounded-lg overflow-hidden'>
                            <thead className="bg-slate-50 text-xs uppercase text-slate-600">
                                <tr>
                                    <th className="px-4 py-3">S No</th>
                                    <th className="px-4 py-3">Date</th>
                                    <th className="px-4 py-3">Employee ID</th>
                                    <th className="px-4 py-3">Name</th>
                                    <th className="px-4 py-3">Department</th>
                                    <th className="px-4 py-3">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {records.map((data, i) => (
                                    <tr key={`${data.employeeId}-${i}`} className="border-t border-slate-100 hover:bg-slate-50">
                                        <td className="px-4 py-3">{i + 1}</td>
                                        <td className="px-4 py-3">{date}</td>
                                        <td className="px-4 py-3">{data.employeeId}</td>
                                        <td className="px-4 py-3">{data.employeeName}</td>
                                        <td className="px-4 py-3">{data.departmentName}</td>
                                        <td className="px-4 py-3">{data.status || "Not Marked"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))
            ) : (
                <div className="app-card p-6 text-slate-600">No data available for the selected filter.</div>
            )}

            {!noMoreData && (
                <button
                    className='mt-4 app-btn-secondary'
                    onClick={handleLoadMore}
                    disabled={loading}
                >
                    {loading ? 'Loading more...' : 'Load More'}
                </button>
            )}
        </div>
    );
};

export default AttendenceReport;
