import {Grid} from "@mui/material";
import React, {ChangeEvent, Dispatch, MouseEventHandler} from "react";
import {Link} from "react-router-dom";
import {ButtonStyled} from "../../common/Button/ButtonStyled";
import {ButtonVariant} from "../../../utils/enums/button/ButtonVariant";
import {LabeledTextField} from "../../common/TextField/LabeledTextField";
import { formFieldTexts } from "./configs";

interface LevelValidationErrors {
    code: boolean;
    name: boolean;
}

interface LevelFormProps {
    code: string;
    setCode:  Dispatch<React.SetStateAction<string>>;
    name: string;
    setName:  Dispatch<React.SetStateAction<string>>;
    validationErrors: LevelValidationErrors;
    setValidationErrors: Dispatch<React.SetStateAction<LevelValidationErrors>>
    handleSubmit:  MouseEventHandler<HTMLButtonElement>;
    goBackLink: string;
}

export const LevelForm = (props : LevelFormProps) => {
    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        props.setName(inputValue);
        props.setValidationErrors({
            ...props.validationErrors,
            name: false,
        });
    };

    const handleCodeChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        props.setCode(inputValue);
        props.setValidationErrors({
            ...props.validationErrors,
            code: false,
        });
    };

    return (
        <Grid container direction='column' rowSpacing={4}>
            <Grid item>
                <form>
                    <Grid item container direction='column' justifyContent="center" rowSpacing={3}>
                        <Grid item>
                            <LabeledTextField
                                label={formFieldTexts.code.label}
                                value={props.code}
                                placeholder={formFieldTexts.code.placeholder}
                                onChange={handleCodeChange}
                                required={true}
                                error={props.validationErrors.code}
                                errorText={formFieldTexts.code.error}
                            />
                        </Grid>
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