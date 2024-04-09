import {Grid, Typography} from "@mui/material";

interface LabeledTextDisplay {
    label: string;
    value: string | undefined | null;
}

export const LabeledTextDisplay = ({ label, value } : LabeledTextDisplay) => {
    return (
        <Grid item container direction='column' rowSpacing={1}>
            <Grid item>
                <Typography variant='h4'>{label}</Typography>
            </Grid>
            <Grid item>
                <Typography variant='body1'>{value ?? 'Не визначено'}</Typography>
            </Grid>
        </Grid>
    );
}