import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserRoute from "./UserRoute";
import AdminRoute from "./AdminRoute";
import HomePage from "../pages/home/HomePage";
import CategoryPage from "../pages/admin/CategoryPage";
import ProductPage from "../pages/admin/ProductPage";
import ProctedRouted from "../auth/ProtectedRoute";
import LoginPage from "../pages/LoginPage";

const MainRoute: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Login route */}
                <Route path="/login" element={<LoginPage />} />

                {/* Redirect root to admin category */}
                <Route path="/" element={<Navigate to="/admin/category" replace />} />

                {/* User routes */}
                <Route element={<UserRoute />}>
                    <Route path="/home" element={<HomePage />} />
                </Route>

                {/* Admin routes */}
                <Route element={<ProctedRouted role={["admin"]} />}>
                    <Route path="/admin" element={<AdminRoute />}>
                        <Route index element={<Navigate to="/admin/category" replace />} />
                        <Route path="category" element={<CategoryPage />} />
                        <Route path="product" element={<ProductPage />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default MainRoute;
