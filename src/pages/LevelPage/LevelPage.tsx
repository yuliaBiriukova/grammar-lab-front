import {Grid, Typography} from "@mui/material";
import {Link as RouterLink, useNavigate, useParams} from "react-router-dom";
import {homeStyles} from "../HomePage/homeStyles";
import {LevelsMenu} from "../../components/LevelsMenu/LevelsMenu";
import {useEffect, useState} from "react";
import {Level} from "../../models/Level";
import {LevelService} from "../../services/LevelService";
import {routes} from "../../constants/routes";
import {TopicCardsList} from "../../components/TopicCardsList/TopicCardsList";
import {AuthService} from "../../services/AuthService";
import {UserRole} from "../../utils/enums/auth/UserRole";
import {ButtonVariant} from "../../utils/enums/button/ButtonVariant";
import {ButtonStyled} from "../../components/common/Button/ButtonStyled";

export const LevelPage = () => {
    const { levelId } = useParams();

    const [level, setLevel] = useState<Level>();
    const [isAdmin, setIsAdmin] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setIsAdmin(AuthService.checkHasRole(UserRole.Admin));
    }, []);

    useEffect(() => {
        const fetchLevel = async () => {
            const levelData = await LevelService.getLevelWithTopics(parseInt(levelId as string));
            if(!levelData) {
                navigate(routes.home);
                return;
            }
            setLevel(levelData);
        };

        fetchLevel();
    }, [levelId]);

    return (
        <Grid item container justifyContent='center' sx={homeStyles.container}>
            <Grid item container justifyContent='space-between' sx={homeStyles.content} >
                <Grid item>
                    <LevelsMenu />
                </Grid>
                <Grid item container direction='column' rowSpacing='40px' xs>
                    <Grid item container justifyContent='space-between' alignItems='center'>
                        <Grid item>
                            <Typography variant='h1'>{level?.code}: {level?.name}</Typography>
                        </Grid>
                        { isAdmin &&
                            <Grid item>
                                <RouterLink to={routes.topics.new.url(level?.id as number)}>
                                    <ButtonStyled variant={ButtonVariant.Contained}>Додати тему</ButtonStyled>
                                </RouterLink>
                            </Grid>
                        }
                    </Grid>
                    <TopicCardsList topics={level?.topics}/>
                </Grid>
            </Grid>
        </Grid>
    )
}