import axios from "axios";
import React, { useEffect, useState } from "react";

const AttendanceReport = () => {
    const [report, setReport] = useState([]);
    const [limit] = useState(5);
    const [skip, setSkip] = useState(0);
    const [dataFilter, setDataFilter] = useState();
    const [loading, setLoading] = useState(false);
    const [noMoreData, setNoMoreData] = useState(false);

    const fetchReport = async () => {
        try {
            setLoading(true);
            const query = new URLSearchParams({ limit, skip });
            if (dataFilter) query.append("date", dataFilter);

            const response = await axios.get(`http://localhost:5000/api/attendance/report?${query.toString()}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (response.data.success) {
                const formatted = Object.entries(response.data.groupData).map(([date, records]) => ({
                    date,
                    records,
                }));

                if (skip === 0) {
                    setReport(formatted);
                } else {
                    setReport((prev) => [...prev, ...formatted]);
                }

                if (formatted.length < limit) {
                    setNoMoreData(true);
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
            setSkip((prev) => prev + limit);
        }
    };

    return (
        <div className='min-h-screen p-10 bg-white flex flex-col items-center'>
            <h2 className='text-2xl font-bold mb-6'>Attendance Report</h2>

            <div className='w-full max-w-4xl'>
                <div className='mb-4'>
                    <h3 className='text-xl font-semibold mb-2'>Filter by Date</h3>
                    <input
                        type="date"
                        className='border bg-gray-100 p-2 rounded'
                        onChange={(e) => {
                            setDataFilter(e.target.value);
                            setSkip(0);
                            setNoMoreData(false);
                        }}
                    />
                </div>

                {loading ? (
                    <div>Loading...</div>
                ) : report && report.length > 0 ? (
                    report.map(({ date, records }) => (
                        <div className='mt-6 border-b pb-4' key={date}>
                            <h4 className='text-lg font-semibold mb-2'>{date}</h4>
                            <table className='w-full border border-gray-300 text-left text-sm'>
                                <thead className='bg-gray-100'>
                                    <tr>
                                        <th className='p-2'>S No</th>
                                        <th className='p-2'>Date</th>
                                        <th className='p-2'>Employee ID</th>
                                        <th className='p-2'>Name</th>
                                        <th className='p-2'>Department</th>
                                        <th className='p-2'>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {records.map((data, i) => (
                                        <tr key={data.employeeId + i} className='border-t'>
                                            <td className='p-2'>{i + 1}</td>
                                            <td className='p-2'>{date}</td>
                                            <td className='p-2'>{data.employeeId}</td>
                                            <td className='p-2'>{data.employeeName}</td>
                                            <td className='p-2'>{data.departmentName || "Not Available"}</td>
                                            <td className='p-2'>{data.status || "Not Marked"}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ))
                ) : (
                    <div>No data available for the selected filter.</div>
                )}

                {!noMoreData && (
                    <button
                        className='mt-6 px-6 py-2 border bg-gray-100 hover:bg-gray-200 rounded text-lg font-semibold'
                        onClick={handleLoadMore}
                        disabled={loading}
                    >
                        {loading ? 'Loading more...' : 'Load More'}
                    </button>
                )}
            </div>
        </div>
    );
};

export default AttendanceReport;
