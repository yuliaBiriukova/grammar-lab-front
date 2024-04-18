import {Link as RouterLink, useLocation} from "react-router-dom";
import {levelsMenuStyles} from "../LevelsMenu/levels-menu.styles";
import {Grid, Link} from "@mui/material";
import {routes} from "../../../constants/routes";
import React from "react";

interface UsersMenuItemProps {
    roleIndex: number;
    name: string;
}

export const UsersMenuItem = ({ roleIndex, name } : UsersMenuItemProps) => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const selectedRoleIndex = queryParams.get('role');

    let menuItemIsActive = false;

    if(selectedRoleIndex) {
        menuItemIsActive = parseInt(selectedRoleIndex) === roleIndex;
    }

    const linkStyle = menuItemIsActive ? levelsMenuStyles.linkActive : {};

    return (
        <Grid item>
            <Link to={routes.users.byRole(roleIndex)} component={RouterLink} sx={linkStyle}>
                {name}
            </Link>
        </Grid>
    );
}