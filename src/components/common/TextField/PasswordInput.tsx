import React, {ChangeEventHandler, useState} from "react";
import {TextInputField} from "./TextInputField";
import {IconButton, InputAdornment, TextFieldProps} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {inputStyles} from "./input.styles";

interface PasswordInputProps {
    password: string,
    handlePassword: ChangeEventHandler<HTMLInputElement>
}

export const PasswordInput = ({ password, handlePassword, ...rest} : PasswordInputProps & TextFieldProps) => {

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <TextInputField
            size="small"
            type={showPassword ? "text" : "password"}
            placeholder="Введіть пароль"
            value={password}
            onChange={handlePassword}
            required={true}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                            sx={inputStyles.iconButton}
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
            {...rest}
        />
    );
};