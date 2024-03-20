import {Topic} from "../../models/Topic";
import {Grid, Typography} from "@mui/material";
import React from "react";
import {TopicCard} from "../TopicCard/TopicCard";

interface TopicCardsListProps {
    topics: Topic[] | undefined;
}

export const TopicCardsList = ({ topics } : TopicCardsListProps) => {

    const hasNoTopics = topics === undefined || topics.length === 0;

    let topicCards = topics?.map(topic => (
        <Grid item key={topic.id}>
            <TopicCard topic={topic} />
        </Grid>
    ));

    return (
        <Grid item container direction='column' rowSpacing={3}>
            <Grid item>
                <Typography variant='h2'>Оберіть тему</Typography>
            </Grid>
            { hasNoTopics &&
                <Grid item>
                    <Typography variant='body1'>На цьому рівні ще немає тем.</Typography>
                </Grid>
            }
            { !hasNoTopics &&
                <Grid item container direction='column' rowSpacing={2}>
                    {topicCards}
                </Grid>
            }
        </Grid>
    );
}