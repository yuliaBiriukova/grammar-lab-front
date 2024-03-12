import {Grid, Typography} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {homeStyles} from "../HomePage/homeStyles";
import {LevelsMenu} from "../../components/LevelsMenu/LevelsMenu";
import {useEffect, useState} from "react";
import {Level} from "../../models/Level";
import {LevelService} from "../../services/LevelService";
import {routes} from "../../constants/routes";

export const LevelPage = () => {
    const { id } = useParams();

    const [level, setLevel] = useState<Level>();

    const navigate = useNavigate();

    useEffect(() => {
        const fetchLevel = async () => {
            const levelData = await LevelService.getLevelWithTopics(parseInt(id as string));
            if(!levelData) {
                navigate(routes.home);
                return;
            }
            setLevel(levelData);
        };

        fetchLevel();
    }, [id]);

    return (
        <Grid item container justifyContent='center' sx={homeStyles.container}>
            <Grid item container justifyContent='space-between' sx={homeStyles.content} >
                <Grid item>
                    <LevelsMenu />
                </Grid>
                <Grid item container direction='column' xs>
                    <Grid item>
                        <Typography variant='h1'>{level?.code}: {level?.name}</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}