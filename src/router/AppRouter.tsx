import React from "react";
import {MainLayout} from "../components/common/Layout/MainLayout/MainLayout";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {PrivateRoute} from "./PrivateRoute";
import {HomePage} from "../pages/HomePage/HomePage";
import {LoginPage} from "../pages/LoginPage/LoginPage";
import {routes} from "../constants/routes";
import {AxiosInterceptor} from "../utils/axiosApi";
import {LevelPage} from "../pages/Level/LevelPage/LevelPage";
import {TopicPage} from "../pages/Topic/TopicPage/TopicPage";
import {AddTopicPage} from "../pages/Topic/AddTopicPage/AddTopicPage";
import {TopicExercisesPage} from "../pages/Exercise/TopicExercisesPage/TopicExercisesPage";
import {UserRole} from "../utils/enums/auth/UserRole";
import {CatalogLayout} from "../components/common/Layout/CatalogLayout/CatalogLayout";
import {AccountPage} from "../pages/Account/AccountPage";
import { ExercisePage } from "../pages/Exercise/ExercisePage/ExercisePage";
import {AddLevelPage} from "../pages/Level/AddLevelPage/AddLevelPage";
import {EditLevelPage} from "../pages/Level/EditLevelPage/EditLevelPage";
import {EditTopicPage} from "../pages/Topic/EditTopicPage/EditTopicPage";
import {AddExercisePage} from "../pages/Exercise/AddExercisePage/AddExercisePage";
import {EditExercisePage} from "../pages/Exercise/EditExercisePage/EditExercisePage";
import {TestPage} from "../pages/Test/TestPage/TestPage";
import {CompletedTestResultPage} from "../pages/Test/CompletedTestResultPage/CompletedTestResultPage";
import {TestResultsLayout} from "../components/common/Layout/TestResultsLayout/TestResultsLayout";
import {LevelTestResultsPage} from "../pages/TestResults/LevelTestResultsPage/LevelTestResultsPage";
import {TestResultsPage} from "../pages/TestResults/TestResultsPage/TestResultsPage";
import {TopicTestResultsPage} from "../pages/TestResults/TopicTestResultsPage/TopicTestResultsPage";
import {TestResultPage} from "../pages/TestResults/TestResultPage/TestResultPage";

export const AppRouter = () => (
    <BrowserRouter>
        <AxiosInterceptor>
            <Routes>
                <Route element={<MainLayout />} >
                    <Route element={<CatalogLayout />}>
                        <Route element={<PrivateRoute />} >
                            <Route path={routes.home} element={ <HomePage /> } />
                            <Route path={routes.levels.view.path} element={ <LevelPage /> } />
                            <Route path={routes.topics.view.path} element={ <TopicPage /> } />
                            <Route path={routes.topics.test.path} element={ <TestPage /> } />
                            <Route path={routes.topics.test.result.path} element={ <CompletedTestResultPage /> } />
                        </Route>
                        <Route element={<PrivateRoute allowedRoles={ [UserRole.Admin, UserRole.Teacher] }/>} >
                            <Route path={routes.levels.new} element={ <AddLevelPage /> } />
                            <Route path={routes.levels.edit.path} element={ <EditLevelPage /> } />
                            <Route path={routes.topics.new.path} element={ <AddTopicPage /> } />
                            <Route path={routes.topics.edit.path} element={ <EditTopicPage /> } />
                            <Route path={routes.exercises.list.path} element={ <TopicExercisesPage /> } />
                            <Route path={routes.exercises.view.path} element={ <ExercisePage /> } />
                            <Route path={routes.exercises.new.path} element={ <AddExercisePage /> } />
                            <Route path={routes.exercises.edit.path} element={ <EditExercisePage /> } />
                        </Route>
                    </Route>
                    <Route element={<TestResultsLayout />}>
                        <Route element={<PrivateRoute />} >
                            <Route path={routes.testResults.byLevel.path} element={ <LevelTestResultsPage /> } />
                            <Route path={routes.testResults.all} element={ <TestResultsPage /> } />
                            <Route path={routes.testResults.byTopic.path} element={ <TopicTestResultsPage /> } />
                            <Route path={routes.testResults.view.path} element={ <TestResultPage /> } />
                        </Route>
                    </Route>
                    <Route element={<PrivateRoute />} >
                        <Route path={routes.account} element={ <AccountPage /> } />
                    </Route>
                </Route>
                <Route path={routes.login} element={<LoginPage />} />
                <Route path={routes.undefined} element={<Navigate to="/" replace />} />
            </Routes>
        </AxiosInterceptor>
    </BrowserRouter>
);