import {Topic} from "../../models/Topic/Topic";
import {Grid} from "@mui/material";
import {TopicCard} from "../TopicCard/TopicCard";

interface TopicCardsListProps {
    topics: Topic[] | undefined;
}

export const TopicCardsList = ({ topics } : TopicCardsListProps) => {
    let topicCards = topics?.map(topic => (
        <Grid item key={topic.id}>
            <TopicCard topic={topic} />
        </Grid>
    ));

    return (
        <Grid item>
            <Grid container direction='column' rowSpacing={2}>
                {topicCards}
            </Grid>
        </Grid>
    );
}