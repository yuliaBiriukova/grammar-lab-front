import {InputLabel, InputLabelProps} from "@mui/material";
import {theme} from "../../../utils/theme";

export const TextInputLabel = (props: InputLabelProps) => {
    const { sx, children, ...other } = props;

    const defaultSx = {
        '&.MuiInputLabel-root': {
            color: theme.palette.common.black,
            fontWeight: 500,
        },
        '& .MuiInputLabel-asterisk': {
            color: '#B81A14',
        },
        ...sx,
    };

    return (
        <InputLabel {...other} sx={defaultSx} >
            {children}
        </InputLabel>
    );
}