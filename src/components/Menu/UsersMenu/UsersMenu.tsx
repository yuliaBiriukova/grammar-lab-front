import {Grid, Link, Typography} from "@mui/material";
import {levelsMenuStyles} from "../LevelsMenu/levels-menu.styles";
import {Link as RouterLink, useLocation} from "react-router-dom";
import {routes} from "../../../constants/routes";
import React from "react";
import { UsersMenuItem } from "./UsersMenuItem";
import {Add} from "@mui/icons-material";
import {userRoleGroupsDisplayNames} from "../../../constants/userRoleGroupsDisplayNames";

export const UsersMenu = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const selectedRoleIndex = queryParams.get('role');

    const allUsersLinkStyle = selectedRoleIndex ? {} : levelsMenuStyles.linkActive;

    return (
        <Grid item container sx={levelsMenuStyles.container}>
            <Grid container direction='column' rowSpacing={2}>
                <Grid item container justifyContent='space-between' alignItems='center'>
                    <Grid item>
                        <Link variant='h3' component={RouterLink} to={routes.users.all}>
                            <Typography variant='h3'>
                                Users
                            </Typography>
                        </Link>
                    </Grid>
                    <Grid item height={24}>
                        <Link component={RouterLink} to={routes.users.new}>
                            <Add />
                        </Link>
                    </Grid>
                </Grid>
                <Grid item>
                    <Link to={routes.users.all} component={RouterLink} sx={allUsersLinkStyle}>
                        All users
                    </Link>
                </Grid>
                {
                    Object.entries(userRoleGroupsDisplayNames).map( ([key, value]) => (
                        <UsersMenuItem key={key} roleIndex={parseInt(key)} name={value}/>
                    ))
                }
            </Grid>
        </Grid>
    );
}