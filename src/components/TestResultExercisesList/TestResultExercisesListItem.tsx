import {TestResultExercise} from "../../models/TestResult/TestResultExercise";
import {Grid, Typography} from "@mui/material";
import React from "react";
import {testResultExerciseStyles} from "./testResultExercise.styles";
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';

interface TestResultExercisesListItemProps {
    testResultExercise: TestResultExercise;
    index: number;
}

export const TestResultExercisesListItem = ({ testResultExercise, index } : TestResultExercisesListItemProps) => {
    const answerStyle = testResultExercise.isCorrect
        ? testResultExerciseStyles.correct
        : testResultExerciseStyles.incorrect;

    const icon = testResultExercise.isCorrect
        ? <CheckIcon sx={answerStyle}/>
        : <ClearIcon sx={answerStyle}/>;

    return (
        <Grid container direction='column' rowSpacing={2}>
            <Grid item>
                <Typography variant='body1'>{`${index}. ${testResultExercise.task}`}</Typography>
            </Grid>
            <Grid item container columnSpacing={'6px'} height={40}>
                <Grid item>
                    {icon}
                </Grid>
                <Grid item>
                    <Typography variant='body1' sx={answerStyle}>{testResultExercise.userAnswer}</Typography>
                </Grid>
            </Grid>
            {
                !testResultExercise.isCorrect && (
                    <Grid item>
                        <Typography variant='body1'>Правильна відповідь: {testResultExercise.answer}</Typography>
                    </Grid>
                )
            }
        </Grid>
    );
}