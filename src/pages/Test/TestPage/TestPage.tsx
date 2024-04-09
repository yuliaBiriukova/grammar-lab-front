import {Grid, Typography} from "@mui/material";
import {routes} from "../../../constants/routes";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Exercise} from "../../../models/Exercise/Exercise";
import {getTopicExercisesByTopicId} from "../../../services/exercise.service";
import {getTopicById} from "../../../services/topic.service";
import {Topic} from "../../../models/Topic/Topic";
import {NewTestResult} from "../../../models/TestResult/NewTestResult";
import {TestForm} from "../../../components/TestForm/TestForm";
import {addTestResultAsync} from "../../../services/testResult.service";

export const TestPage = () => {
    const { topicId } = useParams();
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [topic, setTopic] = useState<Topic>();
    const [userAnswers, setUserAnswers] = useState<Map<number, string>>(new Map());
    const [answersValidationErrors, setAnswersValidationErrors] = useState<number[]>([]);
    const [apiError, setApiError] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchTopicAndExercises = async () => {
            const [topicData, exercisesData] = await Promise.all([
                getTopicById(parseInt(topicId as string)),
                getTopicExercisesByTopicId(parseInt(topicId as string))
            ]);

            if(!topicData || !exercisesData) {
                navigate(routes.home);
                return;
            }
            setTopic(topicData);
            setExercises(exercisesData.sort((a: Exercise, b: Exercise) => a.type - b.type));
        };

        fetchTopicAndExercises();
    }, [topicId]);

    const handleSubmit = async () => {
        // Validate answers
        const errorExercises: number[] = [];
        const trimmedAnswers: Map<number, string> = new Map();
        exercises.forEach((exercise) => {
            const answer = userAnswers.get(exercise.id)?.trim() ?? '';
            if (!answer) {
                errorExercises.push(exercise.id);
            }
            trimmedAnswers.set(exercise.id, answer);
        });

        // Display error for exercises with empty answers
        setAnswersValidationErrors(errorExercises);

        // If all answers are valid, prepare data for submission and perform POST request
        if (errorExercises.length !== 0) {
            return;
        }

        const testResult: NewTestResult = {
            topicId: parseInt(topicId as string),
            testResultExercises: Array.from(userAnswers).map(([exerciseId, userAnswer]) => ({
                exerciseId,
                userAnswer,
            })),
        };

        try {
            const response = await addTestResultAsync(testResult);

            if(response?.status === 400) {
                setApiError(response.data.message);
                return;
            }

            const testResultId: number = response?.data;
            navigate(routes.topics.test.result.url(parseInt(topicId as string)), { state: { testResultId } });

            console.log(testResultId);
        } catch (err: any) {
            setApiError(err.message);
        }
    };

    return (
        topic && exercises ? (
            <Grid item container direction='column' rowSpacing={4} xs>
                <Grid item>
                    <Typography variant='h1'>Тест {topic?.name}</Typography>
                </Grid>
                <Grid item >
                    <TestForm
                        topicId={parseInt(topicId as string)}
                        exercises={exercises}
                        userAnswers={userAnswers}
                        setUserAnswers={setUserAnswers}
                        validationErrors={answersValidationErrors}
                        setValidationErrors={setAnswersValidationErrors}
                        handleSubmit={handleSubmit}
                        goBackLink={routes.topics.view.url(parseInt(topicId as string))}
                    />
                </Grid>
            </Grid>
        ) : null
    );
}