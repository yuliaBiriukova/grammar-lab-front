import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {getTopicById, updateTopicAsync} from "../../../services/topic.service";
import {routes} from "../../../constants/routes";
import {Grid, Typography} from "@mui/material";
import {TopicForm} from "../../../components/TopicForm/TopicForm";
import {Topic} from "../../../models/Topic/Topic";

export const EditTopicPage = () => {
    const { id } = useParams();

    const [topic, setTopic] = useState<Topic>();
    const [name, setName] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [apiError, setApiError] = useState('');
    const [validationErrors, setValidationErrors] = useState({
        name: false,
        content: false,
    });
    const [isTopicLoaded, setIsTopicLoaded] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchTopic = async () => {
            const topicData = await getTopicById(parseInt(id as string));
            if(!topicData) {
                navigate(routes.home);
                return;
            }
            setTopic(topicData);
        };

        fetchTopic();
    }, [id]);

    useEffect(() => {
        if(topic) {
            setName(topic.name);
            setContent(topic.content);
            setIsTopicLoaded(true);
        }
    }, [topic]);

    const isEmpty = (value: string) => value.trim() === '';

    const handleSubmit = async () => {
        setApiError('');

        let isNameEmpty = isEmpty(name);
        let isContentEmpty = isEmpty(content);

        setValidationErrors({
            name: isNameEmpty,
            content: isContentEmpty,
        });

        if(isNameEmpty || isContentEmpty) {
            return;
        }

        try {

            const newTopic: Topic = {
                ...topic!,
                content: content.trim(),
                name: name.trim(),
            };

            const response = await updateTopicAsync(newTopic);

            if(response?.status === 400) {
                setApiError(response.data.message);
                return;
            }

            navigate(routes.topics.view.url(parseInt(id as string)));
        } catch (err: any) {
            setApiError(err.message);
        }
    }

    return (
        topic && isTopicLoaded ? (
            <Grid item container direction='column' rowSpacing={4} xs>
                <Grid item>
                    <Typography variant='h1'>Редагування теми</Typography>
                </Grid>
                <Grid item>
                    <TopicForm
                        name={name}
                        setName={setName}
                        content={content}
                        setContent={setContent}
                        validationErrors={validationErrors}
                        setValidationErrors={setValidationErrors}
                        handleSubmit={handleSubmit}
                        goBackLink={routes.levels.view.url(topic.id)}
                    />
                </Grid>
            </Grid>
        ) : null
    );
}