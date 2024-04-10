import {createTheme} from "@mui/material";
import {colors} from "../constants/colors";

export const theme = createTheme({
    palette: {
        common: {
            white: colors.white,
            black: colors.black,
        },
        primary: colors.primary,
    },
    typography: {
        fontFamily: 'Inter',
        h1: {
            fontSize:32,
            fontWeight: 600,
            margin: 0,
            hyphens: 'auto',
            wordWrap: 'break-word',
        },
        h2: {
            fontSize: 24,
            fontWeight: 500,
            margin: 0,
            hyphens: 'auto',
            wordWrap: 'break-word',
        },
        h3: {
            fontSize: 18,
            fontWeight: 600,
            margin: 0,
            hyphens: 'auto',
            wordWrap: 'break-word',
        },
        h4: {
            fontSize: 16,
            fontWeight: 600,
            margin: 0,
            hyphens: 'auto',
            wordWrap: 'break-word',
        },
        body1: {
            fontSize: 16,
            fontWeight: 400,
            margin: 0,
            hyphens: 'auto',
            wordWrap: 'break-word',
        },
        body2: {
            fontSize: 14,
            fontWeight: 400,
            margin: 0,
            hyphens: 'auto',
            wordWrap: 'break-word',
        }
    },
    components: {
        MuiLink: {
            styleOverrides: {
                root: {
                    cursor: 'pointer',
                    textDecoration: 'none',
                    color: colors.black,
                    '&:hover': {
                        color: colors.primary.main,
                    },
                },
            },
        },
    },
});