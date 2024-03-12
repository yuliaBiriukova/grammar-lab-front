import React from "react";
import {Grid, Typography} from "@mui/material";
import {footerStyles} from "./footerStyles";

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <Grid item container justifyContent='center' sx={footerStyles.container}>
            <Grid container sx={footerStyles.content} alignItems='center' justifyContent='space-between'>
                <Grid item>
                    <Typography sx={footerStyles.logo}>
                        GrammarLab
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography sx={footerStyles.copyright}>
                        &#169; {currentYear} GrammarLab. All Rights Reserved.
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );
}