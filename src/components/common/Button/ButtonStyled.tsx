import {Button, ButtonProps} from "@mui/material";
import {theme} from "../../../utils/theme";

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
            color: '#4F4F4F',
            '&:hover': {
                color: theme.palette.primary.main,
                background: 'none',
            },
        },
        '&.MuiButton-contained': {
            color: theme.palette.common.white,
            background: theme.palette.primary.main,
            '&:hover': {
                color: theme.palette.common.white,
                background: theme.palette.primary.dark,
            },
        },
        '&.MuiButton-outlined': {
            color: theme.palette.primary.main,
            background: 'none',
            border: `1px solid ${theme.palette.primary.main}`,
            '&:hover': {
                color: theme.palette.primary.main,
                background: theme.palette.primary.light,
                border: `1px solid ${theme.palette.primary.main}`,
            },
        },
        ...sx,
    };

    return <Button {...other} sx={defaultSx} />;
}