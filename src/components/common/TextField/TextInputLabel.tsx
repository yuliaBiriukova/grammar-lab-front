import {InputLabel, InputLabelProps} from "@mui/material";
import {theme} from "../../../utils/theme";
import {colors} from "../../../constants/colors";

export const TextInputLabel = (props: InputLabelProps) => {
    const { sx, children, ...other } = props;

    const defaultSx = {
        '&.MuiInputLabel-root': {
            color: theme.palette.common.black,
            fontWeight: 500,
        },
        '& .MuiInputLabel-asterisk': {
            color: colors.error,
        },
        ...sx,
    };

    return (
        <InputLabel {...other} sx={defaultSx} >
            {children}
        </InputLabel>
    );
}