import {Grid, Typography} from "@mui/material";
import {Link as RouterLink, useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {deleteLevelById, getLevelByIdWithTopics} from "../../../services/level.service";
import {routes} from "../../../constants/routes";
import {checkUserHasRole} from "../../../services/auth.service";
import {UserRoleString} from "../../../utils/enums/auth/UserRoleString";
import {ButtonVariant} from "../../../utils/enums/button/ButtonVariant";
import {ButtonStyled} from "../../../components/common/Button/ButtonStyled";
import {MoreDropDownMenu} from "../../../components/common/DropDown/MoreDropDownMenu";
import {MenuOption} from "../../../models/MenuOption";
import {Delete, Edit} from "@mui/icons-material";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {upsertLevel, removeLevel, selectLevelById} from "../../../features/levels/levelsSlice";
import {LevelTopicCards} from "../../../components/LevelTopicCards/LevelTopicCards";

export const LevelPage = () => {
    const { levelId } = useParams();

    const level = useAppSelector(state => selectLevelById(state, levelId as string));
    const [isAdmin, setIsAdmin] = useState(false);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        setIsAdmin(checkUserHasRole(UserRoleString.Admin));
    }, []);

    useEffect(() => {
        const fetchLevel = async () => {
            const levelData = await getLevelByIdWithTopics(parseInt(levelId as string));
            if(levelData.error || levelData.errors) {
                navigate(routes.home);
                return;
            }
            dispatch(upsertLevel(levelData));
        };

        fetchLevel();
    }, [levelId]);

    const handleDeleteClick = async () => {
        const isSuccess = await deleteLevelById(level?.id as number);
        if(isSuccess) {
            dispatch(removeLevel(levelId));
            navigate(routes.home);
        }
    }

    const levelMenuOptions: MenuOption[] = [
        {
            name: 'Редагувати',
            link: routes.levels.edit.url(level?.id as number),
            icon: <Edit/>
        },
        {
            name: 'Видалити',
            icon: <Delete/>,
            onClick: handleDeleteClick,
        }
    ];

    return (
        level ? (
            <Grid container direction='column' rowSpacing='40px'>
                <Grid item container justifyContent='space-between' alignItems='start'>
                    <Grid item xs>
                        <Typography variant='h1'>{level.code}: {level.name}</Typography>
                    </Grid>
                    { isAdmin &&
                        <Grid item container justifyContent='end' xs={3} columnSpacing={1}>
                            <Grid item>
                                <RouterLink to={routes.topics.new.url(level.id)}>
                                    <ButtonStyled variant={ButtonVariant.Contained}>Додати тему</ButtonStyled>
                                </RouterLink>
                            </Grid>
                            <Grid item>
                                <MoreDropDownMenu options={levelMenuOptions} />
                            </Grid>
                        </Grid>
                    }
                </Grid>
                <Grid item>
                    <LevelTopicCards topics={level.topics}/>
                </Grid>
            </Grid>
        ) : null
    );
}