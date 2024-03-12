import {Link as RouterLink, useNavigate} from "react-router-dom";
import {routes} from "../../../constants/routes";
import React, {useEffect, useState} from "react";
import {Grid, Link, Typography} from "@mui/material";
import {headerStyles} from "./headerStyles";
import {AuthService} from "../../../services/AuthService";
import {UserRole} from "../../../utils/enums/auth/UserRole";

export const Header = () => {
    const navigate = useNavigate();

    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        setIsAdmin(AuthService.checkHasRole(UserRole.Admin));
    }, []);

    const onLogoutClick = () => {
        AuthService.logout();
        navigate(routes.login);
    }

    return (
        <Grid item container justifyContent='center' sx={headerStyles.container}>
            <Grid container sx={headerStyles.content} alignItems='center' justifyContent='space-between'>
                <Grid item sx={headerStyles.logoContainer}>
                    <Typography sx={headerStyles.logo}>
                        GrammarLab
                    </Typography>
                </Grid>
                <Grid item container justifyContent='space-between' xs>
                    <Grid item container columnSpacing={3} xs='auto'>
                        <Grid item>
                            <Link to={routes.home} component={RouterLink} >
                                Граматика
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link to={routes.home} component={RouterLink}>
                                Мої результати
                            </Link>
                        </Grid>
                        { isAdmin &&
                            <Grid item>
                                <Link to={routes.home} component={RouterLink} >
                                    Користувачі
                                </Link>
                            </Grid>
                        }
                    </Grid>
                    <Grid item container columnSpacing={3} justifyContent='end' xs={3}>
                        <Grid item>
                            <Link to={routes.home} component={RouterLink} >
                                Мій акаунт
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link onClick={onLogoutClick}>
                                Вийти
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}