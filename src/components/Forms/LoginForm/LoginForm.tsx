import React, {ChangeEvent, Dispatch, MouseEventHandler} from "react";
import {LoginModel} from "../../../models/Account/LoginModel";
import {Grid, Typography} from "@mui/material";
import {LabeledTextField} from "../../common/TextField/LabeledTextField";
import {LabeledPasswordField} from "../../common/TextField/LabeledPasswordField";
import {ButtonStyled} from "../../common/Button/ButtonStyled";
import {ButtonVariant} from "../../../utils/enums/button/ButtonVariant";
import {formFieldTexts} from "./config";

export interface LoginValidationErrors {
    email: boolean;
    password: boolean;
}

interface LoginFormProps {
    loginData: LoginModel;
    setLoginData:  Dispatch<React.SetStateAction<LoginModel>>;
    validationErrors: LoginValidationErrors;
    setValidationErrors: Dispatch<React.SetStateAction<LoginValidationErrors>>
    handleSubmit:  MouseEventHandler<HTMLButtonElement>;
    error: string;
}

export const LoginForm = (props: LoginFormProps) => {
    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        props.setLoginData(prev => ({
            ...prev,
            email: event.target.value,
        }));

        props.setValidationErrors({
            ...props.validationErrors,
            email: false,
        });
    };

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        props.setLoginData(prev => ({
            ...prev,
            password: event.target.value,
        }));

        props.setValidationErrors({
            ...props.validationErrors,
            password: false,
        });
    };

    return (
        <Grid item container direction='column' rowSpacing={2}>
            <Grid item>
                <form>
                    <Grid item container direction='column' justifyContent="center" rowSpacing={3}>
                        <Grid item container rowSpacing={1}>
                            <LabeledTextField
                                label={formFieldTexts.email.label}
                                value={props.loginData.email}
                                placeholder={formFieldTexts.email.placeholder}
                                onChange={handleEmailChange}
                                required={true}
                                error={props.validationErrors.email}
                                errorText={formFieldTexts.email.error}
                            />
                        </Grid>
                        <Grid item>
                            <LabeledPasswordField
                                label={formFieldTexts.password.label}
                                value={props.loginData.password}
                                placeholder={formFieldTexts.password.placeholder}
                                onChange={handlePasswordChange}
                                required={true}
                                error={props.validationErrors.password}
                                errorText={formFieldTexts.password.error}
                            />
                        </Grid>
                        <Grid item>
                            <ButtonStyled variant={ButtonVariant.Contained} onClick={props.handleSubmit} fullWidth>
                                Увійти
                            </ButtonStyled>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
            {props.error && (
                <Grid item>
                    <Typography variant="body1" color="error">
                        {props.error}
                    </Typography>
                </Grid>
            )}
        </Grid>
    );
}