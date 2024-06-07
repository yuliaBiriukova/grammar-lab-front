import React, {ChangeEvent, Dispatch, MouseEventHandler} from "react";
import {Grid} from "@mui/material";
import {Link} from "react-router-dom";
import {ButtonStyled} from "../../common/Button/ButtonStyled";
import {ButtonVariant} from "../../../utils/enums/button/ButtonVariant";
import {LabeledTextField} from "../../common/TextField/LabeledTextField";
import { formFieldTexts } from "./configs";

interface TopicValidationErrors {
    name: boolean;
    content: boolean;
}

interface TopicFormProps {
    name: string;
    setName:  Dispatch<React.SetStateAction<string>>;
    content: string;
    setContent:  Dispatch<React.SetStateAction<string>>;
    validationErrors: TopicValidationErrors;
    setValidationErrors: Dispatch<React.SetStateAction<TopicValidationErrors>>
    handleSubmit:  MouseEventHandler<HTMLButtonElement>;
    goBackLink: string;
}

export const TopicForm = (props : TopicFormProps) => {
    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        props.setName(inputValue);
        props.setValidationErrors({
            ...props.validationErrors,
            name: false,
        });
    };

    const handleContentChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        props.setContent(inputValue);
        props.setValidationErrors({
            ...props.validationErrors,
            content: false,
        });
    };

    return (
        <Grid container direction='column' rowSpacing={4}>
            <Grid item>
                <form>
                    <Grid item container direction='column' justifyContent="center" rowSpacing={3}>
                        <Grid item>
                            <LabeledTextField
                                label={formFieldTexts.name.label}
                                value={props.name}
                                placeholder={formFieldTexts.name.placeholder}
                                onChange={handleNameChange}
                                required={true}
                                error={props.validationErrors.name}
                                errorText={formFieldTexts.name.error}
                            />
                        </Grid>
                        <Grid item>
                            <LabeledTextField
                                label={formFieldTexts.content.label}
                                value={props.content}
                                placeholder={formFieldTexts.content.placeholder}
                                onChange={handleContentChange}
                                required={true}
                                error={props.validationErrors.content}
                                errorText={formFieldTexts.content.error}
                            />
                        </Grid>
                    </Grid>
                </form>
            </Grid>
            <Grid item container columnSpacing={3}>
                <Grid item>
                    <Link to={props.goBackLink}>
                        <ButtonStyled variant={ButtonVariant.Outlined}>
                            Back
                        </ButtonStyled>
                    </Link>
                </Grid>
                <Grid item>
                    <ButtonStyled variant={ButtonVariant.Contained} onClick={props.handleSubmit}>
                        Save
                    </ButtonStyled>
                </Grid>
            </Grid>
        </Grid>
    );
}