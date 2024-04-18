import {Grid, MenuItem} from "@mui/material";
import {TextInputLabel} from "./TextInputLabel";
import {TextInputField} from "./TextInputField";
import {inputStyles} from "./input.styles";
import React from "react";
import {SelectOption} from "../../../models/SelectOption";

interface SelectFieldProps {
    label: string;
    value: any;
    selectOptions: SelectOption[];
    placeholder: string;
    onChange: any;
    required: boolean;
    error?: boolean;
    errorText?: string;
}

export const SelectField = (props : SelectFieldProps) => {
    return (
        <Grid container direction='column' rowSpacing={1}>
            <Grid item>
                <TextInputLabel required={props.required}>
                    {props.label}
                </TextInputLabel>
            </Grid>
            <Grid item>
                <TextInputField
                    select
                    value={props.value}
                    onChange={props.onChange}
                    required={props.required}
                    sx={inputStyles.textField}
                    error={props.error}
                    helperText={props.error ? props.errorText : ''}
                >
                    <MenuItem value={props.placeholder} disabled>
                        {props.placeholder}
                    </MenuItem>
                    {props.selectOptions.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.name}
                        </MenuItem>
                    ))}
                </TextInputField>
            </Grid>
        </Grid>
    );
}