import {Grid, Typography} from "@mui/material"
import React, {useEffect, useState} from "react";
import {Level} from "../../models/Level";
import {LevelService} from "../../services/LevelService";
import {LevelCard} from "../LevelCard/LevelCard";

export const LevelCardsList = () => {
    const [levels, setLevels] = useState<Level[]>();

    useEffect(() => {
        const fetchLevels = async () => {
            const levelsData = await LevelService.getLevels();
            setLevels(levelsData);
        };

        fetchLevels();
    }, []);

    let levelCards = levels?.map(level => (
        <Grid item key={level.id}>
            <LevelCard level={level} />
        </Grid>
    ));

    return (
        <Grid item container direction='column' rowSpacing={3}>
            <Grid item>
                <Typography variant='h2'>Оберіть рівень</Typography>
            </Grid>
            <Grid item container direction='column' rowSpacing={2}>
                {levelCards}
            </Grid>
        </Grid>
    )
}