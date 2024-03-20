import { Grid } from "@mui/material";
import React from "react";
import { Header } from "../Header/Header";
import { Outlet } from "react-router-dom";
import { Footer } from "../Footer/Footer";
import {layoutStyles} from "./layoutStyles";

export const MainLayout = () => (
    <Grid container justifyContent="space-between" direction='column' sx={layoutStyles.container}>
        <Grid item container direction='column'>
            <Header />
            <Outlet />
        </Grid>
        <Footer />
    </Grid>
)