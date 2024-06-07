import {Grid, Typography} from "@mui/material";
import {catalogStyles} from "../../../components/common/Layout/CatalogLayout/catalog.styles";
import {LabeledTextDisplay} from "../../../components/common/LabledTextDisplay/LabeledTextDisplay";
import {accountPageLabels} from "./configs";
import {useEffect, useState} from "react";
import {getCurrentAccount} from "../../../services/account.service";
import {User} from "../../../models/User/User";
import {useNavigate} from "react-router-dom";
import {routes} from "../../../constants/routes";

export const AccountPage = () => {
    const [user, setUser] = useState<User>();
    const [levelDisplayName, setLevelDisplayName] = useState<string>();

    const navigate = useNavigate();

    useEffect(() => {
        const getAccount = async () => {
            const currentAccount = await getCurrentAccount();

            if(!currentAccount) {
                navigate(routes.home);
                return;
            }
            setUser(currentAccount);

            if(currentAccount?.level) {
                let levelName = `${currentAccount?.level?.code}: ${currentAccount?.level?.name}`;
                setLevelDisplayName(levelName);
            }
        };

        getAccount();
    }, []);

    return (
        user ? (
            <Grid item container justifyContent='center' sx={catalogStyles.container}>
                <Grid item container direction='column' rowSpacing={4} sx={catalogStyles.content}>
                    <Grid item>
                        <Typography variant='h1'>My account</Typography>
                    </Grid>
                    <LabeledTextDisplay label={accountPageLabels.email} value={user.email} />
                    <LabeledTextDisplay label={accountPageLabels.firstName} value={user.firstName} />
                    <LabeledTextDisplay label={accountPageLabels.lastName} value={user.lastName} />
                    <LabeledTextDisplay label={accountPageLabels.level} value={levelDisplayName} />
                    <LabeledTextDisplay label={accountPageLabels.role} value={user.roles.toString()} />
                </Grid>
            </Grid>
        ) : null
    );
}