import {Navigate, Outlet} from "react-router-dom";
import React from "react";
import {checkIsUserAuthenticated, getCurrentUserRoles} from "../services/auth.service";
import {routes} from "../constants/routes";

interface PrivateRouteProps {
    allowedRoles?: string[];
}

export const PrivateRoute = ({ allowedRoles } : PrivateRouteProps) => {
    const isAuthenticated = checkIsUserAuthenticated();
    const userRoles = getCurrentUserRoles();

    const checkIsAllowed = () => {
        if (!allowedRoles || allowedRoles.length === 0) {
            return true; // No roles specified, allow access
        }

        if (!userRoles) {
            return false; // No user role available, don't allow access
        }

        return userRoles.some((role: string) => allowedRoles.includes(role));
    };

    const isAllowed = checkIsAllowed();

    if(!isAuthenticated) {
        return <Navigate to={routes.login} />;
    }

    if(!isAllowed) {
        return <Navigate to={routes.home} replace />
    }

    return <Outlet />;
}