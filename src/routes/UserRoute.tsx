import { Outlet } from "react-router-dom";
import ManagerLayout from "../layouts/MangerLayout";

const UserRoute: React.FC = () => {
    return (
        <ManagerLayout>
            <Outlet />
        </ManagerLayout>
    );
};

export default UserRoute;