import {Exercise} from "../../../models/Exercise/Exercise";
import {Grid, Typography} from "@mui/material";
import {LabeledTextField} from "../../common/TextField/LabeledTextField";
import React, {Dispatch, MouseEventHandler} from "react";
import {Link} from "react-router-dom";
import {ButtonStyled} from "../../common/Button/ButtonStyled";
import {ButtonVariant} from "../../../utils/enums/button/ButtonVariant";
import {ExerciseType} from "../../../models/Exercise/ExerciseType";

interface TestFormProps {
    topicId: number;
    exercises: Exercise[];
    userAnswers: Map<number, string>;
    setUserAnswers: Dispatch<React.SetStateAction<Map<number, string>>>;
    validationErrors: number[];
    setValidationErrors: Dispatch<React.SetStateAction<number[]>>;
    handleSubmit:  MouseEventHandler<HTMLButtonElement>;
    goBackLink: string;
}

export const TestForm = ( props  : TestFormProps) => {

    const groupedExercises: { [key: number]: Exercise[] } = {};
    props.exercises.forEach((exercise) => {
        if (!groupedExercises[exercise.type]) {
            groupedExercises[exercise.type] = [];
        }
        groupedExercises[exercise.type].push(exercise);
    });

    const exerciseTypeLabels: { [key: number]: string } = {
        [ExerciseType.Translation]: 'Translate the sentences',
        [ExerciseType.FillTheGap]: 'Fill in the gap in the sentences',
        // Add labels for additional exercise types here if needed
    };

    let exerciseIndex = 1;

    const handleChange = (exerciseId: number, userAnswer: string) => {
        props.setUserAnswers((prevAnswers) => {
            const newAnswers = new Map(prevAnswers);
            newAnswers.set(exerciseId, userAnswer);
            return newAnswers;
        });

        props.setValidationErrors((prevErrorExercises) =>
            prevErrorExercises
                .filter((id) => id !== exerciseId)
        );
    };

    return (
        <Grid container direction='column' rowSpacing={4}>
            <Grid item>
                <form>
                    <Grid container direction='column' rowSpacing={4}>
                        {Object.keys(groupedExercises).map((type) => (
                            <Grid item container rowSpacing={3} key={type}>
                                <Grid item xs={12}>
                                    <Typography variant="h4">{exerciseTypeLabels[parseInt(type)]}</Typography>
                                </Grid>
                                {groupedExercises[parseInt(type)].map(exercise => (
                                    <Grid item xs={12} key={exercise.id}>
                                        <LabeledTextField
                                            label={`${exerciseIndex++}. ${exercise.task}`}
                                            value={props.userAnswers.get(exercise.id) ?? ''}
                                            placeholder='Enter the answer'
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(exercise.id, e.target.value)}
                                            required
                                            error={props.validationErrors.includes(exercise.id)}
                                            errorText={props.validationErrors.includes(exercise.id) ? "Answer can't be empty" : ''}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        ))}
                    </Grid>
                </form>
            </Grid>
            <Grid item>
                <ButtonStyled variant={ButtonVariant.Contained} onClick={props.handleSubmit}>
                    Check answers
                </ButtonStyled>
            </Grid>
        </Grid>
    );
}