import React from "react";
import {Grid, Typography, Link} from "@mui/material";
import {footerStyles} from "./footer.styles";
import {Link as RouterLink} from "react-router-dom";
import {routes} from "../../../constants/routes";

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <Grid item container justifyContent='center' sx={footerStyles.container}>
            <Grid container sx={footerStyles.content} alignItems='center' justifyContent='space-between'>
                <Grid item>
                    <Link to={routes.home} component={RouterLink}>
                        <Typography sx={footerStyles.logo}>
                            GrammarLab
                        </Typography>
                    </Link>
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