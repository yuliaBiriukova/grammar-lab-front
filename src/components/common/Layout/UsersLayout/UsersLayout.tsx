import {Grid} from "@mui/material";
import {catalogStyles} from "../CatalogLayout/catalog.styles";
import {Outlet} from "react-router-dom";
import {UsersMenu} from "../../../Menu/UsersMenu/UsersMenu";

export const UsersLayout = () => {
    return (
        <Grid item container justifyContent='center' sx={catalogStyles.container}>
            <Grid item container justifyContent='space-between' sx={catalogStyles.content}>
                <Grid item>
                    <UsersMenu />
                </Grid>
                <Grid item xs>
                    <Outlet/>
                </Grid>
            </Grid>
        </Grid>
    );
}