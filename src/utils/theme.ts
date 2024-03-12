import {createTheme} from "@mui/material";

export const theme = createTheme({
    palette: {
        common: {
            white: '#FFFFFF',
            black: '#1A1A1A'
        },
        primary: {
            main: '#1B8DF7',
            light: '#ECF6FF',
            dark: '#065AA8',
        },
    },
    typography: {
        fontFamily: 'Inter',
        h1: {
            fontSize:32,
            fontWeight: 600,
            margin: 0,
            hyphens: 'auto',
        },
        h2: {
            fontSize: 24,
            fontWeight: 500,
            margin: 0,
            hyphens: 'auto',
        },
        h3: {
            fontSize: 18,
            fontWeight: 600,
            margin: 0,
            hyphens: 'auto',
        },
        h4: {
            fontSize: 16,
            fontWeight: 600,
            margin: 0,
            hyphens: 'auto',
        },
        body1: {
            fontSize: 16,
            fontWeight: 400,
            margin: 0,
            hyphens: 'auto',
        }
    },
    components: {
        MuiLink: {
            styleOverrides: {
                root: {
                    cursor: 'pointer',
                    textDecoration: 'none',
                    color: '#1A1A1A',
                    '&:hover': {
                        color: '#1B8DF7',
                    },
                },
            },
        },
    },
});