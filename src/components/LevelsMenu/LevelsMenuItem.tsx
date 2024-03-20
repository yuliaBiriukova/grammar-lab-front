import React from "react";
import {Level} from "../../models/Level";
import {Grid, Link} from "@mui/material";
import {routes} from "../../constants/routes";
import {Link as RouterLink, useParams} from "react-router-dom";
import {levelsMenuStyles} from "./levelsMenuStyles";

interface LevelsMenuItemProps {
    level: Level;
}

export const LevelsMenuItem = ({ level } : LevelsMenuItemProps)=> {
    const { levelId } = useParams();

    const menuItemIsActive = parseInt(levelId as string) === level.id;
    const sx = menuItemIsActive ? levelsMenuStyles.linkActive : {};

    return (
        <Grid item key={level.id}>
            <Link to={routes.levels.view.url(level.id)} component={RouterLink} sx={sx}>
                {level.code}: {level.name}
            </Link>
        </Grid>
    );
}