import { Outlet } from "react-router-dom"
import AdminLayout from "../layouts/AdminLayout";


const AdminRoute: React.FC = () => {
    return (
        <AdminLayout>
            <Outlet />
        </AdminLayout>
    );
};

export default AdminRoute;