import {Grid, Typography} from "@mui/material";
import React, {useState} from "react";
import {UserForm, UserValidationErrors} from "../../../components/Forms/UserForm/UserForm";
import {NewUser} from "../../../models/User/NewUser";
import {routes} from "../../../constants/routes";
import {addUserAsync} from "../../../services/user.service";
import {useNavigate} from "react-router-dom";
import {checkIsStringEmpty} from "../../../utils/helpers/helpers";

export const AddUserPage = () => {
    const [user, setUser] = useState<NewUser>({} as NewUser);
    const [validationErrors, setValidationErrors] = useState<UserValidationErrors>({
        email: false,
        password: false,
        role: false,
    });
    const [apiError, setApiError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async () => {
        setApiError('');

        const isEmailEmpty = checkIsStringEmpty(user.email);
        const isPasswordEmpty = checkIsStringEmpty(user.password ?? '');
        const isRoleEmpty = !user.role;

        setValidationErrors({
            email: isEmailEmpty,
            password: isPasswordEmpty,
            role: isRoleEmpty,
        });

        if(isEmailEmpty || isPasswordEmpty || isRoleEmpty) {
            return;
        }

        try {
            const response = await addUserAsync(user);

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
        <Grid item container direction='column' rowSpacing={4} xs>
            <Grid item>
                <Typography variant='h1'>New user</Typography>
            </Grid>
            <Grid item>
                <UserForm
                    user={user}
                    setUser={setUser}
                    validationErrors={validationErrors}
                    setValidationErrors={setValidationErrors}
                    handleSubmit={handleSubmit}
                    goBackLink={routes.users.all}
                    hasPassword={true}
                />
            </Grid>
        </Grid>
    );
}