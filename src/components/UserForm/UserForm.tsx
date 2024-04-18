import React, {ChangeEvent, Dispatch, MouseEventHandler, useEffect} from "react";
import {NewUser} from "../../models/User/NewUser";
import {Grid} from "@mui/material";
import {LabeledTextField} from "../common/TextField/LabeledTextField";
import {Link} from "react-router-dom";
import {ButtonStyled} from "../common/Button/ButtonStyled";
import {ButtonVariant} from "../../utils/enums/button/ButtonVariant";
import {SelectField} from "../common/TextField/SelectField";
import {SelectOption} from "../../models/SelectOption";
import {LabeledPasswordField} from "../common/TextField/LabeledPasswordField";
import { UserRoleString } from "../../utils/enums/auth/UserRoleString";
import {UserRole} from "../../models/User/UserRole";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {fetchLevels, selectLevelById, selectLevels} from "../../features/levels/levelsSlice";
import {getLevelDisplayName} from "../../utils/helpers/helpers";

export interface UserValidationErrors {
    email: boolean;
    password?: boolean;
    role: boolean;
}

interface UserFormProps {
    user: NewUser;
    setUser: Dispatch<React.SetStateAction<NewUser>>;
    validationErrors: UserValidationErrors;
    setValidationErrors: Dispatch<React.SetStateAction<UserValidationErrors>>;
    handleSubmit:  MouseEventHandler<HTMLButtonElement>;
    goBackLink: string;
    hasPassword: boolean;
}

export const UserForm = (props: UserFormProps) => {
    const levels = useAppSelector(selectLevels);

    const roles: SelectOption[] = [
        {name: UserRoleString.Admin.toString(), value: 1},
        {name: UserRoleString.Teacher.toString(), value: 2},
        {name: UserRoleString.Student.toString(), value: 3}
    ];

    const levelsOptions: SelectOption[] = levels.map(level => (
        {name: getLevelDisplayName(level.code, level.name), value: level.id}
    ));

    const initialRole = props.user.role?.toString() || 'Виберіть роль';
    const initialLevel = props.user.levelId || 'Виберіть рівень';

    const dispatch = useAppDispatch();

    useEffect(() => {
        if(!levels.length) {
            dispatch(fetchLevels());
        }
    }, [levels.length]);

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        props.setUser(prevUser => ({
            ...prevUser,
            email: e.target.value,
        }));
        props.setValidationErrors(prev => ({
            ...prev,
            email: false,
        }));
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        props.setUser(prevUser => ({
            ...prevUser,
            password: e.target.value,
        }));
        props.setValidationErrors(prev => ({
            ...prev,
            password: false,
        }));
    };

    const handleFirstNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        props.setUser(prevUser => ({
            ...prevUser,
            firstName: e.target.value,
        }));
    };

    const handleLastNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        props.setUser(prevUser => ({
            ...prevUser,
            lastName: e.target.value,
        }));
    };

    const handleRoleChange = (e: ChangeEvent<{ value: unknown }>) => {
        props.setUser(prevUser => ({
            ...prevUser,
            role: e.target.value as UserRole,
        }));
        props.setValidationErrors(prev => ({
            ...prev,
            role: false,
        }));
    };

    const handleLevelIdChange = (e: ChangeEvent<{ value: unknown }>) => {
        props.setUser(prevUser => ({
            ...prevUser,
            levelId: e.target.value as number,
        }));
    };

    return (
        <Grid container direction='column' rowSpacing={4}>
            <Grid item>
                <form>
                    <Grid item container direction='column' justifyContent="center" rowSpacing={3}>
                        <Grid item>
                            <LabeledTextField
                                label='Електрона пошта'
                                value={props.user.email}
                                placeholder='Введіть електрону пошту'
                                onChange={handleEmailChange}
                                required={true}
                                error={props.validationErrors.email}
                                errorText={'Електронна пошта обов\'язкова'}
                            />
                        </Grid>
                        { props.hasPassword && props.user.password && (
                            <Grid item>
                                <LabeledPasswordField
                                    label='Пароль'
                                    value={props.user.password}
                                    placeholder='Введіть пароль'
                                    onChange={handlePasswordChange}
                                    required={true}
                                    error={props.validationErrors.password}
                                    errorText={'Пароль обов\'язковий'}
                                />
                            </Grid>
                        )}
                        <Grid item>
                            <LabeledTextField
                                label={'Ім\'я'}
                                value={props.user.firstName || ''}
                                placeholder={'Введіть ім\'я'}
                                onChange={handleFirstNameChange}
                                required={false}
                            />
                        </Grid>
                        <Grid item>
                            <LabeledTextField
                                label='Прізвище'
                                value={props.user.lastName || ''}
                                placeholder={'Введіть прізвище'}
                                onChange={handleLastNameChange}
                                required={false}
                            />
                        </Grid>
                        <Grid item>
                            <SelectField
                                label='Роль'
                                value={initialRole}
                                selectOptions={roles}
                                placeholder='Виберіть роль'
                                onChange={handleRoleChange}
                                required={true}
                                error={props.validationErrors.role}
                                errorText={'Роль обов\'язкова'}
                            />
                        </Grid>
                        <Grid item>
                            <SelectField
                                label='Рівень'
                                value={initialLevel}
                                selectOptions={levelsOptions}
                                placeholder='Виберіть рівень'
                                onChange={handleLevelIdChange}
                                required={false}
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