import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export const colums =[
    {
        name: "S No",
        selector: (row) => row.sno,
        width: "70px",
    },
    {
        name: "Emp ID",
        selector: (row) => row.employeeId,
        width: "120px",
    },
    {
        name: "Name",
        selector: (row) => row.name,
        width: "120px",
    },
    {
        name: "Department",
        selector: (row) => row.department,
        width: "140px",
    },
    {
        name: "Leave Type",
        selector: (row) => row.leaveType,
        width: "140px",
    },
    {
        name: "Days",
        selector: (row) => row.days,
        width: "80px",
    },
    {
        name: "Status",
        selector: (row) => row.status,
        center: true,
    },
    {
        name: "Action",
        selector: (row) => row.action,
        center: true,
    },
];

export const LeavesButtons = ({ id }) => {
    const navigate = useNavigate();

    const handleView = () => {
        navigate(`/admin-dashboard/leaves/${id}`);
    };

    return (
        <button
            className='px-4 py-1 bg-teal-500 rounded text-white hover:bg-teal-600'
            onClick={handleView}
        >
            View
        </button>
    );
};

LeavesButtons.propTypes = {
    id: PropTypes.string.isRequired,
};