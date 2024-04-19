import {Grid, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {routes} from "../../../constants/routes";
import React, {useState} from "react";
import {loginStyles} from "./login.styles";
import {localLogin} from "../../../services/auth.service";
import {LoginModel} from "../../../models/Account/LoginModel";
import {LoginForm, LoginValidationErrors} from "../../../components/Forms/LoginForm/LoginForm";
import {loginAsync} from "../../../services/account.service";

export const LoginPage = () => {
    const [loginData, setLoginData] = useState<LoginModel>({
        email: '',
        password: '',
    });
    const [loginError, setLoginError] = useState('');
    const [validationErrors, setValidationErrors] = useState<LoginValidationErrors>({
        email: false,
        password: false,
    });

    const navigate = useNavigate();

    const handleSubmit = async () => {
        setLoginError('');

        const isEmpty = (value: string) => value.trim() === '';

        let isEmailEmpty = isEmpty(loginData.email);
        let isPasswordEmpty = isEmpty(loginData.password);

        setValidationErrors({
            email: isEmailEmpty,
            password: isPasswordEmpty,
        });

        if(isEmailEmpty || isPasswordEmpty) {
            return;
        }

        try {
            const response = await loginAsync(loginData);

            if(!response) {
                return;
            }

            if(response.status === 400) {
                setLoginError('Неправильний логін або пароль.');
                return;
            }

            localLogin({
                userToken: response.data.accessToken,
                userRole: response.data.roles,
            });

            navigate(routes.home);
        } catch (err: any) {
            setLoginError(err.message);
        }
    }

    return (
        <Grid item container justifyContent='center' alignItems='center' sx={loginStyles.container}>
            <Grid item container direction='column' rowSpacing={4} sx={loginStyles.formContainer}>
                <Grid item>
                    <Typography variant='h2'>Вхід в акаунт</Typography>
                </Grid>
                <Grid item>
                    <LoginForm
                        loginData={loginData}
                        setLoginData={setLoginData}
                        validationErrors={validationErrors}
                        setValidationErrors={setValidationErrors}
                        handleSubmit={handleSubmit}
                        error={loginError}
                    />
                </Grid>
            </Grid>
        </Grid>
    )
}