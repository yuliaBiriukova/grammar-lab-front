import {Grid, Typography} from "@mui/material";
import {TestResultExercise} from "../../models/TestResult/TestResultExercise";
import { TestResultExercisesListItem } from "./TestResultExercisesListItem";

interface TestResultExercisesListProps {
    testResultExercises: TestResultExercise[];
}

export const TestResultExercisesList = ({ testResultExercises } : TestResultExercisesListProps) => {
    return(
        <Grid container direction='column' rowSpacing={3}>
            <Grid item>
                <Typography variant='h4'>Ваші відповіді на тест:</Typography>
            </Grid>
            { testResultExercises.map((exercise, index) => (
                <Grid item key={exercise.id}>
                    <TestResultExercisesListItem testResultExercise={exercise} index={++index} />
                </Grid>
            )) }
        </Grid>
    );
}