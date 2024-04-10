import {Button, ButtonProps} from "@mui/material";
import { colors } from "../../../constants/colors";

export const ButtonStyled = (props: ButtonProps) => {
    const { sx, ...other } = props;

    const defaultSx = {
        '&.MuiButton-root': {
            boxShadow: 'none',
            textTransform: 'none',
            fontSize: 16,
            padding: '8px 24px',
            height: 40,
        },
        '&.MuiButton-text': {
            background: 'none',
            padding: 0,
            height: 24,
            color: colors.linkButtonText,
            '&:hover': {
                color: colors.primary.main,
                background: 'none',
            },
        },
        '&.MuiButton-contained': {
            color: colors.white,
            background: colors.primary.main,
            '&:hover': {
                color: colors.white,
                background: colors.primary.dark,
            },
        },
        '&.MuiButton-outlined': {
            color: colors.primary.main,
            background: 'none',
            border: `1px solid ${colors.primary.main}`,
            '&:hover': {
                color: colors.primary.main,
                background: colors.primary.light,
                border: `1px solid ${colors.primary.main}`,
            },
        },
        ...sx,
    };

    return <Button {...other} sx={defaultSx} />;
}