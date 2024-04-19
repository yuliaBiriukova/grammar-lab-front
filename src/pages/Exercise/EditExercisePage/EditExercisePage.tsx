import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {ExerciseType} from "../../../models/Exercise/ExerciseType";
import {checkIsStringEmpty} from "../../../utils/helpers/helpers";
import {getExerciseById, updateExerciseAsync} from "../../../services/exercise.service";
import {routes} from "../../../constants/routes";
import {Grid, Typography} from "@mui/material";
import {ExerciseForm} from "../../../components/Forms/ExerciseForm/ExerciseForm";
import {Exercise} from "../../../models/Exercise/Exercise";

export const EditExercisePage = () => {
    const { id } = useParams();

    const [exercise, setExercise] = useState<Exercise>();
    const [type, setType] = useState<ExerciseType>();
    const [task, setTask] = useState('');
    const [answer, setAnswer] = useState('');
    const [apiError, setApiError] = useState('');
    const [validationErrors, setValidationErrors] = useState({
        type: false,
        task: false,
        answer: false,
    });
    const [isExerciseLoaded, setIsExerciseLoaded] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchExercise = async () => {
            const exerciseData = await getExerciseById(parseInt(id as string));
            if(!exerciseData) {
                navigate(routes.home);
                return;
            }
            setExercise(exerciseData);
        };

        fetchExercise();
    }, [id]);

    useEffect(() => {
        if(exercise) {
            setType(exercise.type);
            setTask(exercise.task);
            setAnswer(exercise.answer);
            setIsExerciseLoaded(true);
        }
    }, [exercise]);

    const handleSubmit = async () => {
        setApiError('');

        const isTypeEmpty = !type;
        const isTaskEmpty = checkIsStringEmpty(task);
        const isAnswerEmpty = checkIsStringEmpty(answer);

        setValidationErrors({
            type: isTypeEmpty,
            task: isTaskEmpty,
            answer: isAnswerEmpty,
        });

        if(isTypeEmpty || isTaskEmpty || isAnswerEmpty) {
            return;
        }

        try {
            if(!exercise) {
                return;
            }

            const response = await updateExerciseAsync({
                id: exercise.id,
                topicId: exercise.topicId,
                type: type as ExerciseType,
                task: task.trim(),
                answer: answer.trim(),
            });

            if(response?.status === 400) {
                setApiError(response.data.error.message);
                return;
            }

            if(response?.status !== 200) {
                console.log()
                return;
            }

            navigate(routes.exercises.view.url(exercise.id));
        } catch (err: any) {
            setApiError(err.message);
        }
    }

    return (
        exercise && isExerciseLoaded ? (
            <Grid item container direction='column' rowSpacing={4} xs>
                <Grid item>
                    <Typography variant='h1'>Нове завдання</Typography>
                </Grid>
                <Grid item>
                    <ExerciseForm
                        type={type}
                        setType={setType}
                        task={task}
                        setTask={setTask}
                        answer={answer}
                        setAnswer={setAnswer}
                        validationErrors={validationErrors}
                        setValidationErrors={setValidationErrors}
                        handleSubmit={handleSubmit}
                        goBackLink={routes.exercises.view.url(exercise.id)}
                    />
                </Grid>
            </Grid>
        ) : null
    );
}