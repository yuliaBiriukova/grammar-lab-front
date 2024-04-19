import {Grid, Typography} from "@mui/material";
import {Link as RouterLink, useNavigate, useParams} from "react-router-dom";
import {routes} from "../../../constants/routes";
import {ButtonStyled} from "../../../components/common/Button/ButtonStyled";
import {ButtonVariant} from "../../../utils/enums/button/ButtonVariant";
import React, {useEffect, useState} from "react";
import {Topic} from "../../../models/Topic/Topic";
import {getTopicById} from "../../../services/topic.service";
import { Exercise } from "../../../models/Exercise/Exercise";
import {deleteExerciseById, getTopicExercisesByTopicId} from "../../../services/exercise.service";
import {GridColDef} from "@mui/x-data-grid";
import {DataTable} from "../../../components/common/DataTable/DataTable";
import {ArrowForward, Delete, Edit} from "@mui/icons-material";
import {topicExercisesStyles} from "./topic-exercises.styles";
import {MoreDropDownMenu} from "../../../components/common/DropDown/MoreDropDownMenu";
import {MenuOption} from "../../../models/Options/MenuOption";

const ExerciseType: Record<number, string> = {
    1: "Translation",
    2: "Fill in the gap",
};

export function getExerciseTypeString(index: number | undefined): string {
    if(!index) {
        return 'Не визначений';
    }

    const status = ExerciseType[index];
    return status !== undefined ? status : 'Не визначений';
}

export const TopicExercisesPage = () => {
    const { topicId } = useParams();

    const [topic, setTopic] = useState<Topic>();
    const [exercises, setExercises] = useState<Exercise[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchTopicAndExercises = async () => {
            const [topicData, exercisesData] = await Promise.all([
                getTopicById(parseInt(topicId as string)),
                getTopicExercisesByTopicId(parseInt(topicId as string)),
            ]);

            if(!topicData || !exercisesData) {
                navigate(routes.home);
                return;
            }

            setTopic(topicData);
            setExercises(exercisesData);
        };

        fetchTopicAndExercises();
    }, [topicId]);

    const handleDeleteClick = async (id: number) => {
        const isSuccess = await deleteExerciseById(id);
        if (isSuccess) {
            setExercises(exercises.filter(exercise => exercise.id !== id));
        }
    }

    const getMoreOptions = (id: number): MenuOption[] => {
        return [
            {
                name: 'Редагувати',
                link: routes.exercises.edit.url(id),
                icon: <Edit/>
            },
            {
                name: 'Видалити',
                icon: <Delete/>,
                onClick: () => handleDeleteClick(id),
            }
        ];
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
                <RouterLink to={routes.exercises.view.url(params.row.id)} >
                    <ButtonStyled endIcon={<ArrowForward />} sx={topicExercisesStyles.button}>Переглянути</ButtonStyled>
                </RouterLink>
            ),
        },
        {
            field: 'actions',
            headerName: '',
            width: 48,
            sortable: false,
            align: 'center',
            renderCell: params => (
                <MoreDropDownMenu options={getMoreOptions(params.row.id)} />
            ),
        },
    ];

    return (
        topic && exercises ? (
            <Grid item container direction='column' rowSpacing='40px' xs>
                <Grid item container justifyContent='space-between' alignItems='center'>
                    <Grid item>
                        <Typography variant='h1'>Завдання з теми&nbsp;{topic.name}</Typography>
                    </Grid>
                    <Grid item>
                        <RouterLink to={routes.exercises.new.url(topic.id as number)}>
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
        ) : null
    );
}