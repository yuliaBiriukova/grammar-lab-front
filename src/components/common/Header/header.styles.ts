import {theme} from "../../../utils/theme";

export const headerStyles = {
    container: {
        background: '#FCFCFC',
        height: 72,
        boxShadow: '0 4px 12px 0 rgba(0, 0, 0, 0.06)',
    },
    content: {
        padding: '0 120px',
        maxWidth: 1440,
    },
    logoContainer: {
        marginRight: '56px',
    },
    logo: {
        color: theme.palette.primary.main,
        fontWeight: 800,
        fontSize: 32,
        fontFamily: 'Montserrat',
    }
}