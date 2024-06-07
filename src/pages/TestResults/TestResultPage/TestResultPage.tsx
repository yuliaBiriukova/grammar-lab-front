import React, {useEffect, useState} from "react";
import {TestResult} from "../../../models/TestResult/TestResult";
import {getTestResultByIdAsync} from "../../../services/testResult.service";
import {routes} from "../../../constants/routes";
import {useNavigate, useParams} from "react-router-dom";
import {Grid, Typography} from "@mui/material";
import {TestResultPieChart} from "../../../components/TestResultPieChart/TestResultPieChart";
import {TestResultExercisesList} from "../../../components/TestResultExercisesList/TestResultExercisesList";
import {formatDateToString} from "../../../utils/helpers/dates.helper";

export const TestResultPage = () => {
    const { id } = useParams();
    const [testResult, setTestResult] = useState<TestResult>();

    const navigate = useNavigate();

    useEffect(() => {
        const fetchTestResult = async () => {
            const testResultData = await getTestResultByIdAsync(parseInt(id as string));

            if(!testResultData) {
                navigate(routes.home);
                return;
            }

            setTestResult(testResultData);
        };

        fetchTestResult();
    }, []);

    const correctAnswersCount = testResult?.testResultExercises
        .filter(e => e.isCorrect)
        .length ?? 0;

    const incorrectAnswersCount = testResult?.testResultExercises
        .filter(e => !e.isCorrect)
        .length ?? 0;

    return(
        testResult ? (
            <Grid item container direction='column' rowSpacing={4} xs>
                <Grid item>
                    <Typography variant='h1'>{testResult.topicName} test result from {formatDateToString(testResult.dateCompleted)}</Typography>
                </Grid>
                <Grid item container justifyContent='space-between' columnSpacing={4}>
                    <Grid item>
                        <TestResultExercisesList testResultExercises={testResult.testResultExercises}/>
                    </Grid>
                    <Grid item>
                        <TestResultPieChart
                            correctCount={correctAnswersCount}
                            incorrectCount={incorrectAnswersCount}
                            percentage={testResult.percentage}
                        />
                    </Grid>
                </Grid>

            </Grid>
        ): null
    );

}