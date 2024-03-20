import {Grid, IconButton, Typography} from "@mui/material";
import {homeStyles} from "./HomePage/homeStyles";
import {LevelsMenu} from "../components/LevelsMenu/LevelsMenu";
import {Link as RouterLink, useNavigate, useParams} from "react-router-dom";
import {routes} from "../constants/routes";
import {ButtonStyled} from "../components/common/Button/ButtonStyled";
import {ButtonVariant} from "../utils/enums/button/ButtonVariant";
import React, {useEffect, useState} from "react";
import {Topic} from "../models/Topic";
import {TopicService} from "../services/TopicService";
import { Exercise } from "../models/Exercise";
import {ExerciseService} from "../services/ExerciseService";
import {GridColDef} from "@mui/x-data-grid";
import {DataTable} from "../components/DataTable";
import {ArrowForward, MoreVert} from "@mui/icons-material";
import {theme} from "../utils/theme";

const ExerciseType: Record<number, string> = {
    1: "Translation",
    2: "Fill in the gap",
};

export function getExerciseTypeString(index: number | undefined): string {
    if(!index) {
        return "Unknown";
    }

    const status = ExerciseType[index];
    return status !== undefined ? status : "Unknown";
}

export const TopicExercisesPage = () => {
    const { topicId } = useParams();

    const [topic, setTopic] = useState<Topic>();
    const [exercises, setExercises] = useState<Exercise[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchTopic = async () => {
            const topicData = await TopicService.getTopic(parseInt(topicId as string));
            if(!topicData) {
                navigate(routes.home);
                return;
            }
            setTopic(topicData);
        };

        fetchTopic();
    }, [topicId]);

    useEffect(() => {
        const fetchExercises = async () => {
            const exercisesData = await ExerciseService.getTopicExercises(parseInt(topicId as string));
            if(!exercisesData) {
                navigate(routes.home);
                return;
            }
            setExercises(exercisesData);
        };

        fetchExercises();
    }, [topicId]);

    const buttonStyles = {
        '&.MuiButton-text': {
            background: 'none',
            padding: 0,
            height: 24,
            color: theme.palette.primary.main,
            '&:hover': {
                color: theme.palette.primary.dark,
                background: 'none',
            },
        },
    }

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: '№',
            width: 64,
            renderCell: params => params.api.getRowIndexRelativeToVisibleRows(params.row.id) + 1,
        },
        {
            field: 'task',
            headerName: 'Завдання',
            flex: 1,
            sortable: false,
        },
        {
            field: 'type',
            headerName: 'Тип',
            width: 168,
            renderCell: params => getExerciseTypeString(params.row.type),
        },
        {
            field: 'view',
            headerName: '',
            width: 168,
            sortable: false,
            align: 'center',
            renderCell: (params) => (
                <ButtonStyled onClick={() => console.log(params.row.id)} endIcon={<ArrowForward />} sx={buttonStyles}>Переглянути</ButtonStyled>
            ),
        },
        {
            field: 'actions',
            headerName: '',
            width: 48,
            sortable: false,
            align: 'center',
            renderCell: () => (
                <IconButton>
                    <MoreVert />
                </IconButton>
            ),
        },
    ];

    return (
        <Grid item container justifyContent='center' sx={homeStyles.container}>
            <Grid item container sx={homeStyles.content} wrap='nowrap'>
                <Grid item>
                    <LevelsMenu />
                </Grid>
                <Grid item container direction='column' rowSpacing='40px' xs>
                    <Grid item container justifyContent='space-between' alignItems='center'>
                        <Grid item>
                            <Typography variant='h1'>Завдання з теми&nbsp;{topic?.name}</Typography>
                        </Grid>
                        <Grid item>
                            <RouterLink to={routes.exercises.new.url(topic?.id as number)}>
                                <ButtonStyled variant={ButtonVariant.Contained}>Додати завдання</ButtonStyled>
                            </RouterLink>
                        </Grid>
                    </Grid>
                    <Grid item width='100%'>
                        { exercises.length !== 0 &&
                            <DataTable rows={exercises} columns={columns}/>
                        }
                        { exercises.length === 0 &&
                            <Typography variant='body1'>У цієї теми немає завдань.</Typography>
                        }
                    </Grid>

                </Grid>
            </Grid>
        </Grid>
    )
}