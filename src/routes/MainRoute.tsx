import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ManagerRoute from "./ManagerRoute";
import HomePage from "../pages/home/HomePage";

const MainRoute: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Admin routes */}
                <Route element={<ManagerRoute />}>
                <Route path = "/" element={<HomePage/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default MainRoute;
