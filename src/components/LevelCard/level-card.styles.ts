import {colors} from "../../constants/colors";

export const levelCardStyles = {
    container: {
        backgroundColor: colors.white,
        borderRadius: '8px',
        padding: '32px',
        boxShadow: '4px 2px 12px 0 rgba(0, 0, 0, 0.06), 0 0 8px 0 rgba(0, 0, 0, 0.04)',
    },
    code: {
        minWidth: 45,
        fontWeight: 700,
        fontSize: 32,
        color: colors.primary.main,
        lineHeight: '24px',
    },
}