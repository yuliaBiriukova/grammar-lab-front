import React, {ChangeEvent, Dispatch, MouseEventHandler} from "react";
import {ExerciseType} from "../../../models/Exercise/ExerciseType";
import {Grid} from "@mui/material";
import {LabeledTextField} from "../../common/TextField/LabeledTextField";
import {Link} from "react-router-dom";
import {ButtonStyled} from "../../common/Button/ButtonStyled";
import {ButtonVariant} from "../../../utils/enums/button/ButtonVariant";
import {SelectField} from "../../common/TextField/SelectField";
import {SelectOption} from "../../../models/SelectOption";

interface ExerciseValidationErrors {
    type: boolean;
    task: boolean;
    answer: boolean;
}

interface ExerciseFormProps {
    type: ExerciseType | undefined;
    setType:  Dispatch<React.SetStateAction<ExerciseType | undefined>>;
    task: string;
    setTask:  Dispatch<React.SetStateAction<string>>;
    answer: string;
    setAnswer:  Dispatch<React.SetStateAction<string>>;
    validationErrors: ExerciseValidationErrors;
    setValidationErrors: Dispatch<React.SetStateAction<ExerciseValidationErrors>>
    handleSubmit:  MouseEventHandler<HTMLButtonElement>;
    goBackLink: string;
}

export const ExerciseForm = (props : ExerciseFormProps) => {
    const initialType = props.type || 'Виберіть тип завдання';

    const handleTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedValue = parseInt(event.target.value);
        props.setType(selectedValue as ExerciseType);
        props.setValidationErrors({
            ...props.validationErrors,
            type: false,
        });
    };

    const handleTaskChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        props.setTask(inputValue);
        props.setValidationErrors({
            ...props.validationErrors,
            task: false,
        });
    };

    const handleAnswerChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        props.setAnswer(inputValue);
        props.setValidationErrors({
            ...props.validationErrors,
            answer: false,
        });
    };

    const types: SelectOption[] = [
        {name: 'Translation', value: 1},
        {name: 'Fill the gap', value: 2}
    ];

    return (
        <Grid container direction='column' rowSpacing={4}>
            <Grid item>
                <form>
                    <Grid item container direction='column' justifyContent="center" rowSpacing={3}>
                        <Grid item>
                            <SelectField
                                label='Тип завдання'
                                value={initialType}
                                selectOptions={types}
                                placeholder='Виберіть тип завдання'
                                onChange={handleTypeChange}
                                required={true}
                                error={props.validationErrors.type}
                                errorText={'Тип завдання обов\'язковий'}
                            />
                        </Grid>
                        <Grid item>
                            <LabeledTextField
                                label='Текст завдання'
                                value={props.task}
                                placeholder='Введіть текст завдання'
                                onChange={handleTaskChange}
                                required={true}
                                error={props.validationErrors.task}
                                errorText={'Текст завдання обов\'язковий'}
                            />
                        </Grid>
                        <Grid item>
                            <LabeledTextField
                                label='Відповідь'
                                value={props.answer}
                                placeholder='Введіть відповідь на завдання'
                                onChange={handleAnswerChange}
                                required={true}
                                error={props.validationErrors.answer}
                                errorText={'Відповідь обов\'язковиа'}
                            />
                        </Grid>
                    </Grid>
                </form>
            </Grid>
            <Grid item container columnSpacing={3}>
                <Grid item>
                    <Link to={props.goBackLink}>
                        <ButtonStyled variant={ButtonVariant.Outlined}>
                            Назад
                        </ButtonStyled>
                    </Link>
                </Grid>
                <Grid item>
                    <ButtonStyled variant={ButtonVariant.Contained} onClick={props.handleSubmit}>
                        Зберегти
                    </ButtonStyled>
                </Grid>
            </Grid>
        </Grid>
    );
}