import {TextField, TextFieldProps} from "@mui/material";
import {theme} from "../../../utils/theme";

export const TextInputField = (props: TextFieldProps) => {
    const { sx, ...other } = props;

    const defaultSx = {
        '& .MuiInputBase-root': {
            padding: '0 0 0 0'
        },
        '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            border: '1px solid #E0E0E0',
            borderRadius: '8px',
        },
        '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
            border: '1px solid #EB4D47',
        },
        '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            border: '1px solid #828282',
        },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            border: '1px solid #4B4C4E',
        },
        '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
            border: '1px solid #E0E0E0',
        },
        '& .MuiInputBase-input': {
            color: theme.palette.common.black,
            background: '#FFFFFF',
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
            color: '#B81A14',
        },
        ...sx,
    };

    return <TextField {...other} sx={defaultSx} />;
}