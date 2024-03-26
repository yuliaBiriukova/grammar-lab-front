import {Grid, Link, Typography} from "@mui/material";
import { homeStyles } from "./homeStyles";
import {LevelsMenu} from "../../components/LevelsMenu/LevelsMenu";
import {Link as RouterLink} from "react-router-dom";
import { routes } from "../../constants/routes";
import {LevelCardsList} from "../../components/LevelCardsList/LevelCardsList";
import {useEffect, useState} from "react";
import {AccountService} from "../../services/AccountService";
import { apiEndpoints } from "../../constants/apiEndpoints";

export const HomePage = () => {
    const [userLevelCode, setUserLevelCode] = useState<string>();

    useEffect(() => {
        const getUserLevelCode = async () => {
            const currentAccount = await AccountService.getCurrentAccount();
            setUserLevelCode(currentAccount?.levelCode ?? 'Невизначений');
        };

        console.log(apiEndpoints.topics.search("bla"));

        getUserLevelCode();
    }, []);

    return (
        <Grid item container justifyContent='center' sx={homeStyles.container}>
            <Grid item container justifyContent='space-between' sx={homeStyles.content}>
                <Grid item>
                    <LevelsMenu />
                </Grid>
                <Grid item container direction='column' rowSpacing='40px' xs>
                    <Grid item container direction='column' rowSpacing={3}>
                        <Grid item>
                            <Typography variant='h1'>Граматика з GrammarLab</Typography>
                        </Grid>
                        <Grid item container rowSpacing={2}>
                            <Grid item>
                                <Typography variant='body1'>
                                    Ваш поточний рівень володіння англійською мовою:&nbsp;<strong>{userLevelCode}</strong>
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant='body1'>
                                    Оберіть з каталогу рівнів ваш рівень та вивчайте теми граматики, визначені в ньому.
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant='body1'>
                                    Проходьте тест з кожної теми для практики вивченого. Після кожного тесту ви побачите свою оцінку у відсотках, правильні та неправильні відповіді.
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant='body1'>
                                    Задовільна оцінка проходження тесту:&nbsp;<strong>90%</strong>.
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant='body1'>
                                    У разі незадовільної для Вас оцінки Ви можете пройти тест ще раз. Результати пройдених тестів ви знайдете в розділі&nbsp;
                                    <Link to={routes.home} component={RouterLink} sx={homeStyles.link}>
                                        Мої результати.
                                    </Link>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <LevelCardsList />
                </Grid>
            </Grid>
        </Grid>
    )
}