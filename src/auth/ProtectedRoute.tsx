import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
    role: string[];
}

const ProctedRouted: React.FC<ProtectedRouteProps> = ({ role }) => {
    // TODO: Implement real authentication check
    const isAuthenticated = true; // Tạm thời để true để test
    const userRole = "admin"; // Tạm thời để admin để test

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (!role.includes(userRole)) {
        return <Navigate to="/home" replace />;
    }

    return <Outlet />;
};

export default ProctedRouted;