import {Navigate, Outlet} from "react-router-dom";
import React from "react";
import {AuthService} from "../services/AuthService";
import {routes} from "../constants/routes";

interface PrivateRouteProps {
    allowedRoles?: string[];
}

export const PrivateRoute = ({ allowedRoles } : PrivateRouteProps) => {
    const isAuthenticated = AuthService.checkIsAuthenticated();
    const userRoles = AuthService.getUserRoles();

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