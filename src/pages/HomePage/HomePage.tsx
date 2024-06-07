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
        userLevelCode ? (
            <Grid container direction='column' rowSpacing='40px'>
                <Grid item container direction='column' rowSpacing={3}>
                    <Grid item>
                        <Typography variant='h1'>Grammar from GrammarLab</Typography>
                    </Grid>
                    <Grid item container rowSpacing={2}>
                        <Grid item>
                            <Typography variant='body1'>
                                Your current level of English: <strong>{userLevelCode}</strong>.
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant='body1'>
                                Choose your level from the level catalog and study the grammar topics defined in it.
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant='body1'>
                                Take a test on each topic to practice what you have learned. After each test, you will see your score in percentage, correct and incorrect answers.
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant='body1'>
                            Satisfactory grade of passing the test: <strong>90%</strong>.
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant='body1'>
                                If you are not satisfied with the grade, you can take the test again. You will find the results of the passed tests in the&nbsp;
                                <Link component={RouterLink} to={routes.testResults.all} sx={homeStyles.link}>
                                    My results
                                </Link>
                                &nbsp;section
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <LevelCardsList />
                </Grid>
            </Grid>
        ) : null
    );
}