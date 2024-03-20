import {Typography} from "@mui/material";

interface HtmlDisplayProps {
    html: string;
}

export const HtmlDisplay = ({ html } : HtmlDisplayProps) => {
    return (
        <Typography dangerouslySetInnerHTML={{ __html: html }} />
    );
}