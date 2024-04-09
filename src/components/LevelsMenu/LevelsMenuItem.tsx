import React from "react";
import {Grid, Link} from "@mui/material";
import {routes} from "../../constants/routes";
import {Link as RouterLink, useParams} from "react-router-dom";
import {levelsMenuStyles} from "./levels-menu.styles";
import {selectLevelById} from "../../features/levels/levelsSlice";
import {useAppSelector} from "../../app/hooks";

interface LevelsMenuItemProps {
    levelId: number;
}

export const LevelsMenuItem = ({ levelId: propLevelId } : LevelsMenuItemProps)=> {
    const { levelId } = useParams();

    const level = useAppSelector(state => selectLevelById(state, propLevelId));

    const menuItemIsActive = parseInt(levelId as string) === propLevelId;
    const linkStyle = menuItemIsActive ? levelsMenuStyles.linkActive : {};

    return (
        <Grid item key={level?.id}>
            <Link to={routes.levels.view.url(propLevelId)} component={RouterLink} sx={linkStyle}>
                {level?.code}: {level?.name}
            </Link>
        </Grid>
    );
}