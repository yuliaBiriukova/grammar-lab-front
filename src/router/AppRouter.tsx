import React from "react";
import {MainLayout} from "../components/common/Layout/MainLayout/MainLayout";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {PrivateRoute} from "./PrivateRoute";
import {HomePage} from "../pages/HomePage/HomePage";
import {LoginPage} from "../pages/Account/LoginPage/LoginPage";
import {routes} from "../constants/routes";
import {AxiosInterceptor} from "../utils/axiosApi";
import {LevelPage} from "../pages/Level/LevelPage/LevelPage";
import {TopicPage} from "../pages/Topic/TopicPage/TopicPage";
import {AddTopicPage} from "../pages/Topic/AddTopicPage/AddTopicPage";
import {TopicExercisesPage} from "../pages/Exercise/TopicExercisesPage/TopicExercisesPage";
import {UserRoleString} from "../utils/enums/auth/UserRoleString";
import {CatalogLayout} from "../components/common/Layout/CatalogLayout/CatalogLayout";
import {AccountPage} from "../pages/Account/AccountPage/AccountPage";
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
import {AllTestResultsPage} from "../pages/TestResults/AllTestResultsPage/AllTestResultsPage";
import {TopicTestResultsPage} from "../pages/TestResults/TopicTestResultsPage/TopicTestResultsPage";
import {TestResultPage} from "../pages/TestResults/TestResultPage/TestResultPage";
import {UsersLayout} from "../components/common/Layout/UsersLayout/UsersLayout";
import {UsersPage} from "../pages/User/UsersPage/UsersPage";
import {AddUserPage} from "../pages/User/AddUserPage/AddUserPage";
import {EditUserPage} from "../pages/User/EditUserPage/EditUserPage";
import {ChangePasswordPage} from "../pages/User/ChangePasswordPage/ChangePasswordPage";
import {SearchPage} from "../pages/Topic/SearchPage/SearchPage";

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
                            <Route path={routes.topics.search.main} element={ <SearchPage /> } />
                        </Route>
                        <Route element={<PrivateRoute allowedRoles={ [UserRoleString.Admin, UserRoleString.Teacher] }/>} >
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
                            <Route path={routes.testResults.all} element={ <AllTestResultsPage /> } />
                            <Route path={routes.testResults.byTopic.path} element={ <TopicTestResultsPage /> } />
                            <Route path={routes.testResults.view.path} element={ <TestResultPage /> } />
                        </Route>
                    </Route>
                    <Route element={<UsersLayout />}>
                        <Route element={<PrivateRoute allowedRoles={ [UserRoleString.Admin] }/>} >
                            <Route path={routes.users.all} element={ <UsersPage /> } />
                            <Route path={routes.users.new} element={ <AddUserPage /> } />
                            <Route path={routes.users.edit.path} element={ <EditUserPage /> } />
                            <Route path={routes.users.edit.password.path} element={ <ChangePasswordPage /> } />
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