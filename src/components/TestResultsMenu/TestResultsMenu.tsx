import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {fetchLevels, selectLevelsIds} from "../../features/levels/levelsSlice";
import React, {useEffect} from "react";
import {levelsMenuStyles} from "../LevelsMenu/levels-menu.styles";
import {Grid, Link, Typography} from "@mui/material";
import {TestResultsMenuItem} from "./TestResultsMenuItem";
import {routes} from "../../constants/routes";
import {Link as RouterLink} from "react-router-dom";

export const TestResultsMenu = () => {
    const levelsIds = useAppSelector(selectLevelsIds);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if(!levelsIds.length) {
            dispatch(fetchLevels());
        }
    }, [levelsIds.length]);

    return (
        <Grid item container sx={levelsMenuStyles.container}>
            <Grid container direction='column' rowSpacing={2}>
                <Grid item>
                    <Link variant='h3' component={RouterLink} to={routes.testResults.all}>
                        <Typography variant='h3'>
                            Результати тестів
                        </Typography>
                    </Link>
                </Grid>
                {
                    levelsIds?.map(levelId => (
                        <TestResultsMenuItem key={levelId} levelId={levelId as number}/>
                    ))
                }
            </Grid>
        </Grid>
    )
}