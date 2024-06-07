import {Grid, Typography, Link} from "@mui/material";
import {routes} from "../../../constants/routes";
import React, {useEffect, useState} from "react";
import {Link as RouterLink, useLocation, useNavigate, useParams} from "react-router-dom";
import {getTestResultByIdAsync} from "../../../services/testResult.service";
import {TestResult} from "../../../models/TestResult/TestResult";
import {ButtonStyled} from "../../../components/common/Button/ButtonStyled";
import {ButtonVariant} from "../../../utils/enums/button/ButtonVariant";
import {TestResultPieChart} from "../../../components/TestResultPieChart/TestResultPieChart";
import {TestResultExercisesList} from "../../../components/TestResultExercisesList/TestResultExercisesList";
import {homeStyles} from "../../HomePage/home.styles";

export const CompletedTestResultPage = () => {
    const { topicId } = useParams();

    const [testResult, setTestResult] = useState<TestResult>();

    const navigate = useNavigate();
    const location = useLocation();
    const testResultId = location.state?.testResultId;

    useEffect(() => {
        const fetchTestResult = async () => {
            const testResultData = await getTestResultByIdAsync(testResultId);

            if(!testResultData) {
                navigate(routes.home);
                return;
            }

            setTestResult(testResultData);
        };

        fetchTestResult();
    }, []);

    useEffect(() => {
        if (!testResultId) {
            navigate(routes.topics.test.url(parseInt(topicId as string)));
            return;
        }
    }, []);

    const resultLabel = testResult?.percentage! < 90
        ? 'The result of the completed test is unsatisfactory. Please take the test again.'
        : 'The result of the completed test is satisfactory. You may take the test again.';

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
                    <Typography variant='h1'>Test result {testResult.topicName}</Typography>
                </Grid>
                <Grid item container justifyContent='space-between' columnSpacing={4}>
                    <Grid item container direction='column' rowSpacing={3} xs>
                        <Grid item container direction='column' rowSpacing={3}>
                            <Grid item container direction='column' rowSpacing={2}>
                                <Grid item>
                                    <Typography variant='body1'>{resultLabel}</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant='body1'>
                                    The test results will be saved in the&nbsp;
                                        <Link component={RouterLink} to={routes.testResults.all} sx={homeStyles.link}>
                                            My Results
                                        </Link>
                                        &nbsp;section, where you can review them later.
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item container columnSpacing={3}>
                            <Grid item>
                                <RouterLink to={routes.topics.test.url(testResult.topicId)}>
                                    <ButtonStyled variant={ButtonVariant.Outlined}>
                                        Take test again
                                    </ButtonStyled>
                                </RouterLink>
                            </Grid>
                            <Grid item>
                                <RouterLink to={routes.topics.view.url(testResult.topicId)}>
                                    <ButtonStyled variant={ButtonVariant.Contained}>
                                        Back to topic
                                    </ButtonStyled>
                                </RouterLink>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <TestResultPieChart
                            correctCount={correctAnswersCount}
                            incorrectCount={incorrectAnswersCount}
                            percentage={testResult.percentage}
                        />
                    </Grid>
                </Grid>
                <Grid item>
                    <TestResultExercisesList testResultExercises={testResult.testResultExercises}/>
                </Grid>
            </Grid>
        ): null
    );
}