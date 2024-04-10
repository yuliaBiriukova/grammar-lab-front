import {colors} from "../../../constants/colors";

export const footerStyles = {
    container: {
        background: colors.bg.default,
        height: 72,
        borderTop: `1px solid ${colors.border.default}`,
    },
    content: {
        padding: '0 120px',
        maxWidth: 1440,
    },
    logo: {
        color: colors.text.tertiary,
        fontWeight: 800,
        fontSize: 24,
        fontFamily: 'Montserrat',
    },
    copyright: {
        color: colors.text.secondary,
    }
}