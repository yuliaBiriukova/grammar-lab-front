import {theme} from "../../../utils/theme";

export const topicExercisesStyles = {
    button: {
        '&.MuiButton-text': {
            background: 'none',
            padding: 0,
            height: 24,
            color: theme.palette.primary.main,
            '&:hover': {
                color: theme.palette.primary.dark,
                background: 'none',
            },
        },
    },
}