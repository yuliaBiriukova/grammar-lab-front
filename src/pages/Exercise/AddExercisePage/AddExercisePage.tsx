import React, {useState} from "react";
import {ExerciseType} from "../../../utils/enums/models/ExerciseType";
import {useNavigate, useParams} from "react-router-dom";
import {Grid, Typography} from "@mui/material";
import {routes} from "../../../constants/routes";
import { ExerciseForm } from "../../../components/ExerciseForm/ExerciseForm";
import {checkIsStringEmpty} from "../../../utils/helpers/helpers";
import {addExerciseAsync} from "../../../services/exercise.service";

export const AddExercisePage = () => {
    const { topicId } = useParams();
    const [type, setType] = useState<ExerciseType>();
    const [task, setTask] = useState('');
    const [answer, setAnswer] = useState('');
    const [apiError, setApiError] = useState('');
    const [validationErrors, setValidationErrors] = useState({
        type: false,
        task: false,
        answer: false,
    });

    const navigate = useNavigate();

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
            const response = await addExerciseAsync({
                type: type as ExerciseType,
                task: task.trim(),
                answer: answer.trim(),
                topicId: parseInt(topicId as string),
            });

            if(response?.status === 400) {
                setApiError(response.data.error.message);
                return;
            }

            if(response?.status !== 200) {
                console.log()
                return;
            }

            navigate(routes.exercises.list.url(parseInt(topicId as string)));
        } catch (err: any) {
            setApiError(err.message);
        }
    }


    return (
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
                    goBackLink={routes.exercises.list.url(parseInt(topicId as string))}
                />
            </Grid>
        </Grid>
    );
}