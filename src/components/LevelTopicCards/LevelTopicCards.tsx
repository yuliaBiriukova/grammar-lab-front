import {Topic} from "../../models/Topic/Topic";
import {Grid, Typography} from "@mui/material";
import {TopicCardsList} from "../TopicCardsList/TopicCardsList";

interface LevelTopicCardsProps {
    topics: Topic[] | undefined;
}

export const LevelTopicCards = ({ topics } : LevelTopicCardsProps) => {
    return (
        topics ? (
            <Grid item container direction='column' rowSpacing={3}>
                <Grid item>
                    <Typography variant='h2'>Select topic</Typography>
                </Grid>
                { topics.length !== 0 ? (
                    <TopicCardsList topics={topics} />
                ) : (
                    <Grid item>
                        <Typography variant='body1'>There are no topic on this level.</Typography>
                    </Grid>
                )
                }
            </Grid>
        ) : null
    );
}