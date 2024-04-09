import {TextInputLabel} from "./TextInputLabel";
import {TextInputField} from "./TextInputField";
import {Grid} from "@mui/material";
import React from "react";
import {Simulate} from "react-dom/test-utils";
import {inputStyles} from "./input.styles";

interface LabeledTextFieldProps {
    label: string;
    value: string;
    placeholder: string;
    onChange: any;
    required: boolean;
    error: boolean;
    errorText: string;
}

export const LabeledTextField = (props : LabeledTextFieldProps) => {
    return (
        <Grid container direction='column' rowSpacing={1}>
            <Grid item>
                <TextInputLabel required={props.required}>
                    {props.label}
                </TextInputLabel>
            </Grid>
            <Grid item>
                <TextInputField
                    type="text"
                    placeholder={props.placeholder}
                    value={props.value}
                    onChange={props.onChange}
                    required={props.required}
                    sx={inputStyles.textField}
                    error={props.error}
                    helperText={props.error ? props.errorText : ''}
                />
            </Grid>
        </Grid>
    );
}