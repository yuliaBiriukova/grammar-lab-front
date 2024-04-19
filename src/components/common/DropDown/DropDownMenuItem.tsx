import {Link, MenuItem} from "@mui/material";
import {MenuOption} from "../../../models/Options/MenuOption";
import {MouseEventHandler} from "react";
import {Link as RouterLink} from "react-router-dom";

export interface DropDownMenuItemProps  {
    option: MenuOption;
    onClick: MouseEventHandler<HTMLLIElement>
}

export const DropDownMenuItem = ({ option, onClick } : DropDownMenuItemProps) => {
    return (
        option.link
            ? (
                <Link to={option.link} component={RouterLink}>
                    <MenuItem onClick={onClick}>
                        {option.icon}
                        {option.name}
                    </MenuItem>
                </Link>
            )
            : (
                <Link onClick={option.onClick}>
                    <MenuItem onClick={onClick}>
                        {option.icon}
                        {option.name}
                    </MenuItem>
                </Link>
            )
    );
}
