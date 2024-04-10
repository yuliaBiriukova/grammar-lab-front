import {Grid} from "@mui/material";
import {catalogStyles} from "../CatalogLayout/catalog.styles";
import {Outlet} from "react-router-dom";
import {TestResultsMenu} from "../../../TestResultsMenu/TestResultsMenu";

export const TestResultsLayout = () => {
    return (
        <Grid item container justifyContent='center' sx={catalogStyles.container}>
            <Grid item container justifyContent='space-between' sx={catalogStyles.content}>
                <Grid item>
                    <TestResultsMenu />
                </Grid>
                <Grid item xs>
                    <Outlet/>
                </Grid>
            </Grid>
        </Grid>
    );
}