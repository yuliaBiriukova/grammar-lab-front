import {Topic} from "../../models/Topic";
import {Grid, Link} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import {routes} from "../../constants/routes";
import {ButtonStyled} from "../common/Button/ButtonStyled";
import {ButtonVariant} from "../../utils/enums/button/ButtonVariant";
import {ArrowForward} from "@mui/icons-material";
import {topicCardStyles} from "./topicCardStyles";

interface TopicCardProps {
    topic: Topic;
}

export const TopicCard = ({ topic } : TopicCardProps) => {
    return (
        <Grid item container justifyContent='space-between' alignItems='center' sx={topicCardStyles.container}>
            <Grid item>
                <Link variant='h3' component={RouterLink} to={routes.topics.view.url(topic.id)}>
                    {topic.name}
                </Link>
            </Grid>
            <Grid item>
                <RouterLink to={routes.topics.view.url(topic.id)}>
                    <ButtonStyled variant={ButtonVariant.Text} endIcon={<ArrowForward />}>До теми</ButtonStyled>
                </RouterLink>
            </Grid>
        </Grid>
    );
}