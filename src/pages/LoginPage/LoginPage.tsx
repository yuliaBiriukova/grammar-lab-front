import {Grid, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {routes} from "../../constants/routes";
import React, {ChangeEvent, useState} from "react";
import {TextInputField} from "../../components/common/TextField/TextInputField";
import {PasswordInput} from "../../components/common/TextField/PasswordInput";
import {Api} from "../../utils/axiosApi";
import {apiEndpoints} from "../../constants/apiEndpoints";
import {loginStyles} from "./login.styles";
import {TextInputLabel} from "../../components/common/TextField/TextInputLabel";
import {ButtonStyled} from "../../components/common/Button/ButtonStyled";
import {ButtonVariant} from "../../utils/enums/button/ButtonVariant";
import {login} from "../../services/auth.service";

export const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [validationErrors, setValidationErrors] = useState({
        email: false,
        password: false,
    });

    const navigate = useNavigate();

    const handleLoginSubmit = async () => {
        setLoginError('');

        const isEmpty = (value: string) => value.trim() === '';

        let isEmailEmpty = isEmpty(email);
        let isPasswordEmpty = isEmpty(password);

        setValidationErrors({
            email: isEmailEmpty,
            password: isPasswordEmpty,
        });

        if(isEmailEmpty || isPasswordEmpty) {
            return;
        }

        try {
            const response = await Api.post(
                apiEndpoints.account.login,
                {
                    email,
                    password
                },
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            if(response.status === 400) {
                setLoginError(response.data.error.message);
                return;
            }

            login({
                userToken: response.data.accessToken,
                userRole: response.data.roles,
            });

            navigate(routes.home);
        } catch (err: any) {
            setLoginError(err.message);
        }
    }

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        setEmail(inputValue);
    };

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        setPassword(inputValue);
    };

    return (
        <Grid item container justifyContent='center' alignItems='center' sx={loginStyles.container}>
            <Grid item container direction='column' rowSpacing={4} sx={loginStyles.formContainer}>
                <Grid item>
                    <Typography variant='h2'>Вхід в акаунт</Typography>
                </Grid>
                <Grid item container direction='column' rowSpacing={2}>
                    <Grid item>
                        <form>
                            <Grid item container direction='column' justifyContent="center" rowSpacing={3}>
                                <Grid item container rowSpacing={1}>
                                    <TextInputLabel required={true}>
                                        Електронна пошта
                                    </TextInputLabel>
                                    <TextInputField
                                        type="email"
                                        placeholder="Введіть електронну пошту"
                                        value={email}
                                        onChange={handleEmailChange}
                                        required={true}
                                        sx={loginStyles.textField}
                                        error={validationErrors.email}
                                        helperText={validationErrors.email ? 'Електронна пошта обов\'язкова' : ''}
                                    />
                                </Grid>
                                <Grid item>
                                    <TextInputLabel required={true}>
                                        Пароль
                                    </TextInputLabel>
                                    <PasswordInput
                                        password={password}
                                        handlePassword={handlePasswordChange}
                                        sx={loginStyles.textField}
                                        error={validationErrors.password}
                                        helperText={validationErrors.password ? 'Пароль обов\'язковий' : ''}
                                    />
                                </Grid>
                                <Grid item>
                                    <ButtonStyled variant={ButtonVariant.Contained} onClick={handleLoginSubmit} fullWidth>
                                        Увійти
                                    </ButtonStyled>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                    {loginError && (
                        <Grid item>
                            <Typography variant="body1" color="error">
                                {loginError}
                            </Typography>
                        </Grid>
                    )}
                </Grid>
            </Grid>
        </Grid>
    )
}