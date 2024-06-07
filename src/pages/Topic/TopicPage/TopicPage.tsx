import {Grid, Typography} from "@mui/material";
import {ButtonStyled} from "../../../components/common/Button/ButtonStyled";
import {ButtonVariant} from "../../../utils/enums/button/ButtonVariant";
import {Link as RouterLink, useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Topic} from "../../../models/Topic/Topic";
import {routes} from "../../../constants/routes";
import {deleteTopicById, getTopicById} from "../../../services/topic.service";
import {HtmlDisplay} from "../../../components/common/HtmlDisplay/HtmlDisplay";
import {checkUserHasRole} from "../../../services/auth.service";
import {UserRoleString} from "../../../utils/enums/auth/UserRoleString";
import {MoreDropDownMenu} from "../../../components/common/DropDown/MoreDropDownMenu";
import {MenuOption} from "../../../models/Options/MenuOption";
import {Delete, Edit} from "@mui/icons-material";

export const TopicPage = () => {
    const { id } = useParams();

    const [topic, setTopic] = useState<Topic>();
    const [isAdmin, setIsAdmin] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setIsAdmin(checkUserHasRole(UserRoleString.Admin));
    }, []);

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

    const handleDeleteClick = async () => {
        const isSuccess = await deleteTopicById(topic?.id as number);
        if(isSuccess) {
            navigate(routes.levels.view.url(topic?.levelId as number));
        }
    }

    const topicMenuOptions: MenuOption[] = [
        {
            name: 'Edit',
            link: routes.topics.edit.url(topic?.id as number),
            icon: <Edit/>
        },
        {
            name: 'Delete',
            icon: <Delete/>,
            onClick: handleDeleteClick,
        }
    ];

    return (
        topic ? (
            <Grid container direction='column' rowSpacing='40px'>
                <Grid item container justifyContent='space-between' alignItems='start'>
                    <Grid item xs>
                        <Typography variant='h1'>{topic.name}</Typography>
                    </Grid>
                    <Grid item container justifyContent='end' columnSpacing={2} xs={6}>
                        { isAdmin &&
                            <Grid item>
                                <RouterLink to={routes.exercises.list.url(topic.id)}>
                                    <ButtonStyled variant={ButtonVariant.Outlined}>Exercises</ButtonStyled>
                                </RouterLink>
                            </Grid>
                        }
                        <Grid item>
                            <RouterLink to={routes.topics.test.url(topic.id)}>
                                <ButtonStyled variant={ButtonVariant.Contained}>Take test</ButtonStyled>
                            </RouterLink>
                        </Grid>
                        { isAdmin &&
                            <Grid item>
                                <MoreDropDownMenu options={topicMenuOptions} />
                            </Grid>
                        }
                    </Grid>
                </Grid>
                <Grid item>
                    <HtmlDisplay html={topic.content} />
                </Grid>
                <Grid item>
                    <Grid container direction='column' rowSpacing={3}>
                        <Grid item>
                            <Typography variant='h2'>Test</Typography>
                        </Grid>
                        <Grid item container direction='column' rowSpacing={2}>
                            <Grid item>
                                <Typography variant='body1'>Take this test to check the grammar you have learned.</Typography>
                            </Grid>
                            <Grid item>
                                <RouterLink to={routes.topics.test.url(topic.id)}>
                                    <ButtonStyled variant={ButtonVariant.Contained}>Take test</ButtonStyled>
                                </RouterLink>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        ) : null
    );
}