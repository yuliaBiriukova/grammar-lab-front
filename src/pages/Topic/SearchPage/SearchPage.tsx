import {Grid, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {Topic} from "../../../models/Topic/Topic";
import {useLocation, useNavigate} from "react-router-dom";
import {routes} from "../../../constants/routes";
import {getTopicsByNameAsync} from "../../../services/topic.service";
import {SearchForm} from "../../../components/Forms/SearchForm/SearchForm";
import {TopicCardsList} from "../../../components/TopicCardsList/TopicCardsList";

export const SearchPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query');

    const [topics, setTopics] = useState<Topic[]>();
    const [searchQuery, setSearchQuery] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        if(query) {
            const fetchTopicsByName = async () => {
                const topicsData = await getTopicsByNameAsync(query);

                if(!topicsData) {
                    navigate(routes.home);
                    return;
                }

                setTopics(topicsData);
            };

            setSearchQuery(query);
            fetchTopicsByName();
        }
    }, [query]);

    const handleSubmit = () => {
        if(!!searchQuery) {
            navigate(routes.topics.search.byQuery(searchQuery));
        }
    }

    return (
        <Grid item container direction='column' rowSpacing={4} xs>
            <Grid item>
                <Typography variant='h1'>Search topics</Typography>
            </Grid>
            <Grid item>
                <SearchForm
                    query={searchQuery}
                    setQuery={setSearchQuery}
                    handleSubmit={handleSubmit}
                />
            </Grid>
            <Grid item>
                {
                    query && topics ? (
                        <Grid item container direction='column' rowSpacing={3}>
                            <Grid item>
                                <Typography variant='body1'>Search results for «{query}». Topics found: {topics.length}. </Typography>
                            </Grid>
                            {
                                topics.length ? (
                                    <Grid item>
                                        <TopicCardsList topics={topics}/>
                                    </Grid>
                                ) : null
                            }
                        </Grid>
                    ) : (
                        <Typography variant='body1'>Search results will appear here.</Typography>
                    )
                }
            </Grid>
        </Grid>
    )
}