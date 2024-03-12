import {theme} from "../../utils/theme";

export const homeStyles = {
    container: {
        padding: '40px 0',
    },
    content: {
        padding: '0 120px',
        maxWidth: 1440,
    },
    link: {
        color: theme.palette.primary.main,
        '&:hover': {
            color: theme.palette.primary.dark,
        },
    }
}