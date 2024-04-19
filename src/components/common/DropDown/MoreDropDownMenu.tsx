import {Grid, IconButton} from "@mui/material";
import {MoreVert} from "@mui/icons-material";
import {useState} from "react";
import {StyledMenu} from "./StyledMenu";
import {DropDownMenuItem} from "./DropDownMenuItem";
import {MenuOption} from "../../../models/Options/MenuOption";

interface MoreDropDownProps {
    options: MenuOption[];
}

export const MoreDropDownMenu = ({ options } : MoreDropDownProps) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Grid item>
            <IconButton
                id="more-button"
                aria-label="more"
                aria-controls={open ? 'more-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVert />
            </IconButton>
            <StyledMenu
                id="more-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                disableScrollLock
            >
                {options.map((option) => (
                    <DropDownMenuItem key={option.name} option={option} onClick={handleClose} />
                ))}
            </StyledMenu>
        </Grid>
    );
}
