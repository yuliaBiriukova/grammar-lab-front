import {Grid, Link, Typography} from "@mui/material";
import {Level} from "../../models/Level/Level";
import {levelCardStyles} from "./level-card.styles";
import {ButtonStyled} from "../common/Button/ButtonStyled";
import {ButtonVariant} from "../../utils/enums/button/ButtonVariant";
import { ArrowForward } from "@mui/icons-material";
import { routes } from "../../constants/routes";
import { Link as RouterLink } from "react-router-dom";

interface LevelCardProps {
    level: Level;
}

export const LevelCard = ({ level } : LevelCardProps) => {
    return (
        <Grid item container justifyContent='space-between' alignItems='center' sx={levelCardStyles.container}>
            <Grid item container columnSpacing={3} alignItems='center' xs>
                <Grid item>
                    <Typography sx={levelCardStyles.code}>{level.code}</Typography>
                </Grid>
                <Grid item>
                    <Link variant='h3' component={RouterLink} to={routes.levels.view.url(level.id)}>
                        {level.name}
                    </Link>
                </Grid>
            </Grid>
            <Grid item>
                <RouterLink to={routes.levels.view.url(level.id)}>
                    <ButtonStyled variant={ButtonVariant.Text} endIcon={<ArrowForward />}>Go to level</ButtonStyled>
                </RouterLink>
            </Grid>
        </Grid>
    );
}