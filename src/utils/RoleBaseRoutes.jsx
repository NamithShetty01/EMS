import PropTypes from "prop-types";
import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";

const RoleBaseRoutes = ({ children, requiredRole }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (!Array.isArray(requiredRole) || !requiredRole.includes(user.role)) {
        return <Navigate to="/unauthorized" />;
    }

    return children;
};

RoleBaseRoutes.propTypes = {
    children: PropTypes.node.isRequired,
    requiredRole: PropTypes.arrayOf(PropTypes.string),
};

RoleBaseRoutes.defaultProps = {
    requiredRole: [],
};

export default RoleBaseRoutes;
