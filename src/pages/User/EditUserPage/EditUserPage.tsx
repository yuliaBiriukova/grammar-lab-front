import React, {useEffect, useState} from "react";
import {NewUser} from "../../../models/User/NewUser";
import {UserForm, UserValidationErrors} from "../../../components/UserForm/UserForm";
import {Link as RouterLink, useNavigate, useParams} from "react-router-dom";
import {getUserByIdAsync, updateUserAsync,} from "../../../services/user.service";
import {routes} from "../../../constants/routes";
import {Grid, Typography} from "@mui/material";
import {UserRole} from "../../../models/User/UserRole";
import {checkIsStringEmpty} from "../../../utils/helpers/helpers";
import {ButtonStyled} from "../../../components/common/Button/ButtonStyled";
import {ButtonVariant} from "../../../utils/enums/button/ButtonVariant";

export const EditUserPage = () => {
    const { id } = useParams();

    const [user, setUser] = useState<NewUser>({} as NewUser);
    const [validationErrors, setValidationErrors] = useState<UserValidationErrors>({
        email: false,
        role: false,
    });
    const [apiError, setApiError] = useState('');
    const [isUserLoaded, setIsUserLoaded] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const userData = await getUserByIdAsync(id as string);
            if(!userData) {
                navigate(routes.home);
                return;
            }
            const roleName = userData.roles[0];
            const role: UserRole = UserRole[roleName as keyof typeof UserRole];

            setUser({
                id: userData.id,
                email: userData.email,
                role: role,
                firstName: userData.firstName,
                lastName: userData.lastName,
                levelId: userData.level?.id,
            } as NewUser);
        };

        fetchUser();
    }, [id]);

    useEffect(() => {
        if (user && user.id) {
            setIsUserLoaded(true);
        }
    }, [user]);

    const handleSubmit = async () => {
        setApiError('');

        const isEmailEmpty = checkIsStringEmpty(user.email);
        const isRoleEmpty = !user.role;

        setValidationErrors(prev => ({
            ...prev,
            email: isEmailEmpty,
            role: isRoleEmpty,
        }));

        if(isEmailEmpty || isRoleEmpty) {
            return;
        }

        try {
            const response = await updateUserAsync(user);

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
        user && isUserLoaded ? (
            <Grid item container direction='column' rowSpacing={4} xs>
                <Grid item container justifyContent='space-between' alignItems='start'>
                    <Grid item>
                        <Typography variant='h1'>Редагування користувача</Typography>
                    </Grid>
                    <Grid item>
                        <RouterLink to={routes.users.edit.password.url(user.id!)}>
                            <ButtonStyled variant={ButtonVariant.Outlined}>Змінити пароль</ButtonStyled>
                        </RouterLink>
                    </Grid>
                </Grid>
                <Grid item>
                    <UserForm
                        user={user}
                        setUser={setUser}
                        validationErrors={validationErrors}
                        setValidationErrors={setValidationErrors}
                        handleSubmit={handleSubmit}
                        goBackLink={routes.users.all}
                        hasPassword={false}
                    />
                </Grid>
            </Grid>
        ) : null
    );
}