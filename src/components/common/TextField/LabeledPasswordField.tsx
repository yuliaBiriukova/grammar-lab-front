import {Grid} from "@mui/material";
import {TextInputLabel} from "./TextInputLabel";
import {inputStyles} from "./input.styles";
import React from "react";
import {PasswordField} from "./PasswordField";

interface LabeledPasswordFieldProps {
    label: string;
    value: string;
    placeholder: string;
    onChange: any;
    required: boolean;
    error?: boolean;
    errorText?: string;
}

export const LabeledPasswordField = (props : LabeledPasswordFieldProps) => {
    return (
        <Grid container direction='column' rowSpacing={1}>
            <Grid item>
                <TextInputLabel required={props.required}>
                    {props.label}
                </TextInputLabel>
            </Grid>
            <Grid item>
                <PasswordField
                    value={props.value}
                    placeholder={props.placeholder}
                    onChange={props.onChange}
                    required={props.required}
                    error={props.error}
                    helperText={props.error ? props.errorText : ''}
                    sx={inputStyles.textField}
                />
            </Grid>
        </Grid>
    )
}