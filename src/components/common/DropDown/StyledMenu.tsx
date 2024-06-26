import {Menu, styled} from "@mui/material";
import {colors} from "../../../constants/colors";

export const StyledMenu = styled(Menu)(() => ({
    '& .MuiPaper-root': {
        borderRadius: '8px',
        boxShadow: '4px 2px 12px 0 rgba(0, 0, 0, 0.06), 0 0 8px 0 rgba(0, 0, 0, 0.04)',
        marginTop: 8,
    },
    '& .MuiList-root': {
        padding: 0,
    },
    '& .MuiMenuItem-root': {
        padding: '16px 24px',
        height: 48,
        '&:hover': {
            background: colors.bg.hover,
        },
    },
    '& .MuiSvgIcon-root': {
        marginRight: 8,
    },
}));