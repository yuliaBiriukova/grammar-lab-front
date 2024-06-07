import {Grid, Typography} from "@mui/material";
import React, {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {routes} from "../../../constants/routes";
import {TopicForm} from "../../../components/Forms/TopicForm/TopicForm";
import {addTopicAsync} from "../../../services/topic.service";

export const AddTopicPage = () => {
    const { levelId } = useParams();

    const [name, setName] = useState<string>('');
    const [content, setContent] = useState<string>('');

    const [apiError, setApiError] = useState('');
    const [validationErrors, setValidationErrors] = useState({
        name: false,
        content: false,
    });

    const navigate = useNavigate();

    const handleSubmit = async () => {
        setApiError('');

        const isEmpty = (value: string) => value.trim() === '';

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
            const response = await addTopicAsync({
                levelId: parseInt(levelId as string),
                content: content.trim(),
                name: name.trim(),
            });

            if(response?.status === 400) {
                setApiError(response.data.message);
                return;
            }

            navigate(routes.levels.view.url(parseInt(levelId as string)));
        } catch (err: any) {
            setApiError(err.message);
        }
    }

    return (
        <Grid item container direction='column' rowSpacing={4} xs>
            <Grid item>
                <Typography variant='h1'>New topic</Typography>
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
                    goBackLink={routes.levels.view.url(parseInt(levelId as string))}
                />
            </Grid>
        </Grid>
    );
}