import {inputStyles} from "./input.styles";
import {TextInputField} from "./TextInputField";
import React, {MouseEventHandler} from "react";
import {IconButton, InputAdornment, TextField} from "@mui/material";
import {Search} from "@mui/icons-material";

interface SearchFieldProps extends React.ComponentProps<typeof TextField> {
    handleSubmit: MouseEventHandler<HTMLButtonElement>;
}

export const SearchField = ({ handleSubmit, ...rest }: SearchFieldProps) => {
    return (
        <TextInputField
            type="text"
            sx={inputStyles.textField}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={handleSubmit}>
                            <Search />
                        </IconButton>
                    </InputAdornment>
                ),
            }}
            {...rest}
        />
    )
}