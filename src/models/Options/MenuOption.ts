import {MouseEventHandler, ReactElement} from "react";

export interface MenuOption {
    name: string;
    link?: string;
    icon?: ReactElement;
    onClick?:  MouseEventHandler<HTMLAnchorElement>;
}