import {Grid, Typography} from "@mui/material";
import {homeStyles} from "../HomePage/homeStyles";
import {LevelsMenu} from "../../components/LevelsMenu/LevelsMenu";
import {ButtonStyled} from "../../components/common/Button/ButtonStyled";
import {ButtonVariant} from "../../utils/enums/button/ButtonVariant";
import {Link as RouterLink, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Topic} from "../../models/Topic";
import {routes} from "../../constants/routes";
import {TopicService} from "../../services/TopicService";
import {HtmlDisplay} from "../../components/common/HtmlDisplay/HtmlDisplay";
import {AuthService} from "../../services/AuthService";
import {UserRole} from "../../utils/enums/auth/UserRole";

export const TopicPage = () => {
    const { id } = useParams();

    const [topic, setTopic] = useState<Topic>();
    const [isAdmin, setIsAdmin] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setIsAdmin(AuthService.checkHasRole(UserRole.Admin));
    }, []);

    useEffect(() => {
        const fetchTopic = async () => {
            const topicData = await TopicService.getTopic(parseInt(id as string));
            if(!topicData) {
                navigate(routes.home);
                return;
            }
            setTopic(topicData);
        };

        fetchTopic();
    }, [id]);

    return (
        <Grid item container justifyContent='center' sx={homeStyles.container}>
            <Grid item container justifyContent='space-between' sx={homeStyles.content} >
                <Grid item>
                    <LevelsMenu />
                </Grid>
                <Grid item container direction='column' rowSpacing='40px' xs>
                    <Grid item container justifyContent='space-between' alignItems='center'>
                        <Grid item>
                            <Typography variant='h1'>{topic?.name}</Typography>
                        </Grid>
                        <Grid item container xs justifyContent='end' columnSpacing={2}>
                            { isAdmin &&
                                <Grid item>
                                    <RouterLink to={routes.exercises.list.url(parseInt(id as string))}>
                                        <ButtonStyled variant={ButtonVariant.Outlined}>Завдання</ButtonStyled>
                                    </RouterLink>
                                </Grid>
                            }
                            <Grid item>
                                <ButtonStyled variant={ButtonVariant.Contained}>Пройти тест</ButtonStyled>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <HtmlDisplay html={topic?.content as string} />
                    </Grid>
                    <Grid item container direction='column' rowSpacing={3}>
                        <Grid item>
                            <Typography variant='h2'>Тест</Typography>
                        </Grid>
                        <Grid item container direction='column' rowSpacing={2}>
                            <Grid item>
                                <Typography variant='body1'>Пройдіть цей тест, щоб перевірити вивчену граматику.</Typography>
                            </Grid>
                            <Grid item>
                                <ButtonStyled variant={ButtonVariant.Contained}>Пройти тест</ButtonStyled>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}