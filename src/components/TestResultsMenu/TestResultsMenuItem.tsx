import {Link as RouterLink, useParams} from "react-router-dom";
import {useAppSelector} from "../../app/hooks";
import {selectLevelById} from "../../features/levels/levelsSlice";
import {levelsMenuStyles} from "../LevelsMenu/levels-menu.styles";
import {Grid, Link} from "@mui/material";
import {routes} from "../../constants/routes";
import React from "react";

interface TestsMenuItemProps {
    levelId: number;
}

export const TestResultsMenuItem = ({ levelId: propLevelId } : TestsMenuItemProps) => {
    const { levelId } = useParams();

    const level = useAppSelector(state => selectLevelById(state, propLevelId));

    const menuItemIsActive = parseInt(levelId as string) === propLevelId;
    const linkStyle = menuItemIsActive ? levelsMenuStyles.linkActive : {};

    return (
        <Grid item>
            <Link to={routes.testResults.byLevel.url(propLevelId)} component={RouterLink} sx={linkStyle}>
                {level?.code}: {level?.name}
            </Link>
        </Grid>
    );
}