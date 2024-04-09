import {Grid, Typography} from "@mui/material";
import {routes} from "../../../constants/routes";
import React, {useEffect, useState} from "react";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import {getTestResultById} from "../../../services/testResult.service";
import {TestResult} from "../../../models/TestResult/TestResult";
import {ButtonStyled} from "../../../components/common/Button/ButtonStyled";
import {ButtonVariant} from "../../../utils/enums/button/ButtonVariant";
import {TestResultPieChart} from "../../../components/TestResultPieChart/TestResultPieChart";
import {TestResultExercisesList} from "../../../components/TestResultExercisesList/TestResultExercisesList";

export const CompletedTestResultPage = () => {
    const { topicId } = useParams();

    const [testResult, setTestResult] = useState<TestResult>();

    const navigate = useNavigate();
    const location = useLocation();
    const testResultId = location.state?.testResultId;

    useEffect(() => {
        const fetchTestResult = async () => {
            const testResultData = await getTestResultById(testResultId);

            if(!testResultData) {
                navigate(routes.home);
                return;
            }

            setTestResult(testResultData);
        };

        fetchTestResult();
    }, [topicId]);

    useEffect(() => {
        if (!testResultId) {
            navigate(routes.topics.test.url(parseInt(topicId as string)));
            return;
        }
    }, []);

    const resultLabel = testResult?.percentage! < 90
        ? 'Результат пройденого тесту незадовільний. Пройдіть тест ще раз.'
        : 'Результат пройденого тесту задовільний. Ви можете пройти тест ще раз.';

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
                    <Typography variant='h1'>Результати тесту {testResult.topicName}</Typography>
                </Grid>
                <Grid item container justifyContent='space-between' columnSpacing={4}>
                    <Grid item container direction='column' rowSpacing={3} xs>
                        <Grid item container direction='column' rowSpacing={3}>
                            <Grid item container direction='column' rowSpacing={2}>
                                <Grid item>
                                    <Typography variant='body1'>{resultLabel}</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant='body1'>Результати тесту будуть збережені в розділі Мої результати, де ви зможете передивитися їх пізніше. </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item container columnSpacing={3}>
                            <Grid item>
                                <Link to={routes.topics.test.url(testResult.topicId)}>
                                    <ButtonStyled variant={ButtonVariant.Outlined}>
                                        Пройти ще раз
                                    </ButtonStyled>
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to={routes.topics.view.url(testResult.topicId)}>
                                    <ButtonStyled variant={ButtonVariant.Contained}>
                                        До теми
                                    </ButtonStyled>
                                </Link>
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
    )
}