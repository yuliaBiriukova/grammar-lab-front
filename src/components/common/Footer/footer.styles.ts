import {colors} from "../../../constants/colors";

export const footerStyles = {
    container: {
        background: colors.backgroundWhite,
        height: 72,
        borderTop: '1px solid #E0E0E0',
    },
    content: {
        padding: '0 120px',
        maxWidth: 1440,
    },
    logo: {
        color: colors.footerText,
        fontWeight: 800,
        fontSize: 24,
        fontFamily: 'Montserrat',
    },
    copyright: {
        color: colors.footerText,
    }
}