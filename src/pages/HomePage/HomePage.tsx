import {Grid, Link, Typography} from "@mui/material";
import { homeStyles } from "./home.styles";
import {Link as RouterLink} from "react-router-dom";
import { routes } from "../../constants/routes";
import {LevelCardsList} from "../../components/LevelCardsList/LevelCardsList";
import {useEffect, useState} from "react";
import { getCurrentAccount } from "../../services/account.service";

export const HomePage = () => {
    const [userLevelCode, setUserLevelCode] = useState<string>();

    useEffect(() => {
        const getUserLevelCode = async () => {
            const currentAccount = await getCurrentAccount();

            let levelDisplayName = 'Невизначений';
            if(currentAccount?.level) {
                levelDisplayName = `${currentAccount?.level?.code}: ${currentAccount?.level?.name}`;
            }

            setUserLevelCode(levelDisplayName);
        };

        getUserLevelCode();
    }, []);

    return (
        <Grid container direction='column' rowSpacing='40px'>
            <Grid item container direction='column' rowSpacing={3}>
                <Grid item>
                    <Typography variant='h1'>Граматика з GrammarLab</Typography>
                </Grid>
                <Grid item container rowSpacing={2}>
                    <Grid item>
                        <Typography variant='body1'>
                            Ваш поточний рівень володіння англійською мовою&nbsp;-&nbsp;<strong>{userLevelCode}</strong>.
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
                            Задовільна оцінка проходження тесту&nbsp;-&nbsp;<strong>90%</strong>.
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant='body1'>
                            У разі незадовільної для Вас оцінки Ви можете пройти тест ще раз. Результати пройдених тестів ви знайдете в розділі&nbsp;
                            <Link component={RouterLink} to={routes.testResults.all} sx={homeStyles.link}>
                                Мої результати.
                            </Link>
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <LevelCardsList />
            </Grid>
        </Grid>
    )
}