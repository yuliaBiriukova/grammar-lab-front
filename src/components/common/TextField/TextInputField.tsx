import {TextField, TextFieldProps} from "@mui/material";
import {colors} from "../../../constants/colors";

export const TextInputField = (props: TextFieldProps) => {
    const { sx, ...other } = props;

    const defaultSx = {
        '& .MuiInputBase-root': {
            padding: '0 0 0 0'
        },
        '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            border: `1px solid ${colors.border.default}`,
            borderRadius: '8px',
        },
        '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
            border: `1px solid ${colors.border.error}`,
        },
        '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            border: `1px solid ${colors.border.hover}`,
        },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            border: `1px solid ${colors.border.active}`,
        },
        '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
            border: `1px solid ${colors.border.default}`,
        },
        '& .MuiInputBase-input': {
            color: colors.black,
            background: colors.white,
            typography: 'body1',
            wordWrap: 'break-word',
            padding: '8px 16px',
        },
        '& .MuiFormHelperText-root': {
            margin: '8px 0 0 0',
            fontSize: 14,
            fontWeight: 400,
            lineHeight: '140%',
        },
        '& .MuiFormHelperText-root.Mui-error': {
            color: colors.text.error,
        },
        ...sx,
    };

    return <TextField {...other} sx={defaultSx} />;
}