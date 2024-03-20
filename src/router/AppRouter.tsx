import React from "react";
import {MainLayout} from "../components/common/Layout/MainLayout";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {PrivateRoute} from "./PrivateRoute";
import {HomePage} from "../pages/HomePage/HomePage";
import {LoginPage} from "../pages/LoginPage/LoginPage";
import {routes} from "../constants/routes";
import {AxiosInterceptor} from "../utils/axiosApi";
import {LevelPage} from "../pages/LevelPage/LevelPage";
import {TopicPage} from "../pages/TopicPage/TopicPage";
import {AddTopicPage} from "../pages/AddTopicPage/AddTopicPage";
import {TopicExercisesPage} from "../pages/TopicExercisesPage";
import {UserRole} from "../utils/enums/auth/UserRole";

export const AppRouter = () => (
    <BrowserRouter>
        <AxiosInterceptor>
            <Routes>
                <Route element={<MainLayout />} >
                    <Route element={<PrivateRoute />} >
                        <Route path={routes.home} element={ <HomePage /> } />
                        <Route path={routes.levels.view.path} element={ <LevelPage /> } />
                        <Route path={routes.topics.view.path} element={ <TopicPage /> } />
                        <Route path={routes.topics.new.path} element={ <AddTopicPage /> } />
                    </Route>
                    <Route element={<PrivateRoute allowedRoles={ [UserRole.Admin, UserRole.Teacher] }/>} >
                        <Route path={routes.exercises.list.path} element={ <TopicExercisesPage /> } />
                    </Route>
                </Route>
                <Route path={routes.login} element={<LoginPage />} />
                <Route path={routes.undefined} element={<Navigate to="/" replace />} />
            </Routes>
        </AxiosInterceptor>
    </BrowserRouter>
);