import {Grid, Typography} from "@mui/material";
import {routes} from "../../../constants/routes";
import React, {ChangeEvent, useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {changeUserPasswordAsync, getUserByIdAsync} from "../../../services/user.service";
import {LabeledPasswordField} from "../../../components/common/TextField/LabeledPasswordField";
import {ButtonStyled} from "../../../components/common/Button/ButtonStyled";
import {ButtonVariant} from "../../../utils/enums/button/ButtonVariant";
import {LabeledTextDisplay} from "../../../components/common/LabledTextDisplay/LabeledTextDisplay";
import {checkIsStringEmpty} from "../../../utils/helpers/helpers";

export const ChangePasswordPage = () => {
    const { id } = useParams();

    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>('');
    const [passwordValidationError, setPasswordValidationError] = useState(false);
    const [apiError, setApiError] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserEmail = async () => {
            if(!id){
                return;
            }
            const userData = await getUserByIdAsync(id);
            if(!userData) {
                navigate(routes.home);
                return;
            }
            setEmail(userData.email);
        };

        fetchUserEmail();
    }, [id]);

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setPasswordValidationError(false);
    };

    const handleSubmit = async () => {
        setApiError('');

        const isPasswordEmpty = checkIsStringEmpty(password);

        setPasswordValidationError(isPasswordEmpty);

        if(isPasswordEmpty) {
            return;
        }

        try {
            if(!id) {
                return;
            }

            const response = await changeUserPasswordAsync(id, password);

            if(response?.status === 400) {
                setApiError(response.data.message);
                return;
            }

            const isSuccess = response?.data;
            if(!isSuccess) {
                setApiError('Something went wrong...');
                return;
            }

            navigate(routes.users.all);
        } catch (err: any) {
            setApiError(err.message);
        }
    };

    return (
        email ? (
            <Grid item container direction='column' rowSpacing={4} xs>
                <Grid item>
                    <Typography variant='h1'>Зміна паролю</Typography>
                </Grid>
                <Grid item>
                    <Grid container direction='column' rowSpacing={4}>
                        <Grid item container direction='column' rowSpacing={3}>
                            <Grid item>
                                <LabeledTextDisplay label='Електрона пошта' value={email} />
                            </Grid>
                            <Grid item>
                                <form>
                                    <Grid item>
                                        <LabeledPasswordField
                                            label='Новий пароль'
                                            value={password}
                                            placeholder='Введіть новий пароль'
                                            onChange={handlePasswordChange}
                                            required={true}
                                            error={passwordValidationError}
                                            errorText={'Пароль обов\'язковий'}
                                        />
                                    </Grid>
                                </form>
                            </Grid>
                        </Grid>
                        <Grid item container columnSpacing={3}>
                            <Grid item>
                                <Link to={routes.users.edit.url(id as string)}>
                                    <ButtonStyled variant={ButtonVariant.Outlined}>
                                        Назад
                                    </ButtonStyled>
                                </Link>
                            </Grid>
                            <Grid item>
                                <ButtonStyled variant={ButtonVariant.Contained} onClick={handleSubmit}>
                                    Зберегти
                                </ButtonStyled>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        ) : null
    );
}