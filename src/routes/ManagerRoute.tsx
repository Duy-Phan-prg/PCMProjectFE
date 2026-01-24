import ManagerLayout from "../layouts/MangerLayout";
import { Outlet } from "react-router-dom";
import React from 'react';

const ManagerRoute: React.FC = () => {
    return(
        <ManagerLayout>
            <Outlet />
        </ManagerLayout>
    )
}

ManagerRoute.propTypes = {}
export default ManagerRoute;