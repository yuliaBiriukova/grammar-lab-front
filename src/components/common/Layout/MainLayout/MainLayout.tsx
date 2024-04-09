import { Grid } from "@mui/material";
import React from "react";
import { Header } from "../../Header/Header";
import { Outlet } from "react-router-dom";
import { Footer } from "../../Footer/Footer";
import {mainLayoutStyles} from "./main-layout.styles";

export const MainLayout = () => (
    <Grid container justifyContent="space-between" direction='column' sx={mainLayoutStyles.container}>
        <Grid item container direction='column'>
            <Header />
            <Outlet />
        </Grid>
        <Footer />
    </Grid>
)