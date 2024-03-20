import {Grid, Link, Typography} from "@mui/material";
import { levelsMenuStyles } from "./levelsMenuStyles";
import {routes} from "../../constants/routes";
import React, {useEffect, useState} from "react";
import {Level} from "../../models/Level";
import {LevelService} from "../../services/LevelService";
import {AuthService} from "../../services/AuthService";
import {UserRole} from "../../utils/enums/auth/UserRole";
import {Add} from "@mui/icons-material";
import {LevelsMenuItem} from "./LevelsMenuItem";
import {Link as RouterLink} from "react-router-dom";

export const LevelsMenu = () => {
    const [levels, setLevels] = useState<Level[]>();
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        setIsAdmin(AuthService.checkHasRole(UserRole.Admin));
    }, []);

    useEffect(() => {
        const fetchLevels = async () => {
            const levelsData = await LevelService.getLevels();
            setLevels(levelsData);
        };

        fetchLevels();
    }, []);

    let levelsLinks = levels?.map(level => (
        <LevelsMenuItem key={level.id} level={level}/>
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