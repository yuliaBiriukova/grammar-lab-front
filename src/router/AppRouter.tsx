import React from "react";
import {MainLayout} from "../components/common/layout/MainLayout";
import {Navigate, Route, BrowserRouter, Routes} from "react-router-dom";
import {PrivateRoute} from "./PrivateRoute";
import {HomePage} from "../pages/HomePage/HomePage";
import {LoginPage} from "../pages/LoginPage/LoginPage";
import {routes} from "../constants/routes";
import {AxiosInterceptor} from "../utils/axiosApi";
import {LevelPage} from "../pages/LevelPage/LevelPage";

export const AppRouter = () => (
    <BrowserRouter>
        <AxiosInterceptor>
            <Routes>
                <Route element={<MainLayout />} >
                    <Route element={<PrivateRoute />} >
                        <Route path={routes.home} element={ <HomePage /> } />
                        <Route path={routes.levels.view.path} element={ <LevelPage /> } />
                    </Route>
                </Route>
                <Route path={routes.login} element={<LoginPage />} />
                <Route path={routes.undefined} element={<Navigate to="/" replace />} />
            </Routes>
        </AxiosInterceptor>
    </BrowserRouter>
);
