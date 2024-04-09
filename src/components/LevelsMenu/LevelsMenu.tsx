import {Grid, Link, Typography} from "@mui/material";
import { levelsMenuStyles } from "./levels-menu.styles";
import {routes} from "../../constants/routes";
import React, {useEffect, useState} from "react";
import {checkUserHasRole} from "../../services/auth.service";
import {UserRole} from "../../utils/enums/auth/UserRole";
import {Add} from "@mui/icons-material";
import {LevelsMenuItem} from "./LevelsMenuItem";
import {Link as RouterLink} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {fetchLevels, selectLevelsIds} from "../../features/levels/levelsSlice";

export const LevelsMenu = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const levelsIds = useAppSelector(selectLevelsIds);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if(!levelsIds.length) {
            dispatch(fetchLevels());
        }
    }, [levelsIds.length]);

    useEffect(() => {
        setIsAdmin(checkUserHasRole(UserRole.Admin));
    }, []);

    let levelsLinks = levelsIds?.map(levelId => (
        <LevelsMenuItem key={levelId} levelId={levelId as number}/>
    ));

    return (
        <Grid item container sx={levelsMenuStyles.container}>
            <Grid container direction='column' rowSpacing={2}>
                <Grid item container justifyContent='space-between' alignItems='center'>
                    <Grid item>
                        <Typography variant='h3'>
                            Каталог рівнів
                        </Typography>
                    </Grid>
                    { isAdmin &&
                        <Grid item height={24}>
                            <Link component={RouterLink} to={routes.levels.new}>
                                <Add />
                            </Link>
                        </Grid>
                    }
                </Grid>
                {levelsLinks}
            </Grid>
        </Grid>
    );
}