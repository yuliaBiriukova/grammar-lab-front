import { Grid } from "@mui/material";
import { LevelsMenu } from "../../../LevelsMenu/LevelsMenu";
import { Outlet } from "react-router-dom";
import {catalogStyles} from "./catalog.styles";

export const CatalogLayout = () => {
    return (
        <Grid item container justifyContent='center' sx={catalogStyles.container}>
            <Grid item container justifyContent='space-between' sx={catalogStyles.content}>
                <Grid item>
                    <LevelsMenu />
                </Grid>
                <Grid item xs>
                    <Outlet/>
                </Grid>
            </Grid>
        </Grid>
    );
}