import {Grid, Typography} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Exercise} from "../../../models/Exercise/Exercise";
import {checkUserHasRole} from "../../../services/auth.service";
import {UserRoleString} from "../../../utils/enums/auth/UserRoleString";
import {routes} from "../../../constants/routes";
import {deleteExerciseById, getExerciseById} from "../../../services/exercise.service";
import {LabeledTextDisplay} from "../../../components/common/LabledTextDisplay/LabeledTextDisplay";
import {exercisePageLabels} from "../../../constants/labels";
import { ExerciseType } from "../../../models/Exercise/ExerciseType";
import {MoreDropDownMenu} from "../../../components/common/DropDown/MoreDropDownMenu";
import {MenuOption} from "../../../models/MenuOption";
import {Delete, Edit} from "@mui/icons-material";

export const ExercisePage = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const [exercise, setExercise] = useState<Exercise>();
    const [isAdmin, setIsAdmin] = useState(false);

    const [exerciseTypeName, setExerciseTypeName] = useState<string>();

    const handleDeleteClick = async () => {
        const isSuccess = await deleteExerciseById(exercise?.id as number);
        if(isSuccess && exercise) {
            navigate(routes.exercises.list.url(exercise.topicId));
        }
    }

    const exerciseMenuOptions: MenuOption[] = [
        {
            name: 'Редагувати',
            link: routes.exercises.edit.url(parseInt(id as string)),
            icon: <Edit/>
        },
        {
            name: 'Видалити',
            icon: <Delete/>,
            onClick: handleDeleteClick,
        }
    ];

    useEffect(() => {
        setIsAdmin(checkUserHasRole(UserRoleString.Admin));
    }, []);

    useEffect(() => {
        const fetchExercise = async () => {
            const exerciseData = await getExerciseById(parseInt(id as string));
            if(!exerciseData) {
                navigate(routes.home);
                return;
            }
            setExercise(exerciseData);
            setExerciseTypeName(ExerciseType[exerciseData.type]);
        };

        fetchExercise();
    }, [id]);

    return (
        exercise ? (
            <Grid container direction='column' rowSpacing={4}>
                <Grid item container justifyContent='space-between' alignItems='center'>
                    <Grid item xs>
                        <Typography variant='h1'>{exercise.task}</Typography>
                    </Grid>
                    { isAdmin &&
                        <MoreDropDownMenu options={exerciseMenuOptions} />
                    }
                </Grid>
                <Grid item>
                    <Grid container direction='column' rowSpacing={4}>
                        <LabeledTextDisplay label={exercisePageLabels.type} value={exerciseTypeName} />
                        <LabeledTextDisplay label={exercisePageLabels.task} value={exercise.task} />
                        <LabeledTextDisplay label={exercisePageLabels.answer} value={exercise.answer} />
                    </Grid>
                </Grid>
            </Grid>
        ) : null
    );
}