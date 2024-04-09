import {theme} from "../../utils/theme";

export const homeStyles = {
    link: {
        cursor: 'pointer',
        color: theme.palette.primary.main,
        '&:hover': {
            color: theme.palette.primary.dark,
        },
    }
}