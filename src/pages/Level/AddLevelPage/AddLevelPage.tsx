import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {routes} from "../../../constants/routes";
import {Grid, Typography} from "@mui/material";
import {addLevelAsync} from "../../../services/level.service";
import {LevelForm} from "../../../components/Forms/LevelForm/LevelForm";

export const AddLevelPage = () => {
    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [apiError, setApiError] = useState('');
    const [validationErrors, setValidationErrors] = useState({
        code: false,
        name: false,
    });

    const navigate = useNavigate();

    const isEmpty = (value: string) => value.trim() === '';

    const handleSubmit = async () => {
        setApiError('');

        let isNameEmpty = isEmpty(name);
        let isCodeEmpty = isEmpty(code);

        setValidationErrors({
            name: isNameEmpty,
            code: isCodeEmpty,
        });

        if(isNameEmpty || isCodeEmpty) {
            return;
        }

        try {
            const response = await addLevelAsync({
                code: code.trim(),
                name: name.trim(),
            });

            if(response?.status === 400) {
                setApiError(response.data.error.message);
                return;
            }

            navigate(routes.levels.view.url(response?.data));
        } catch (err: any) {
            setApiError(err.message);
        }
    }

    return(
        <Grid item container direction='column' rowSpacing={4} xs>
            <Grid item>
                <Typography variant='h1'>Новий рівень</Typography>
            </Grid>
            <Grid item>
                <LevelForm
                    code={code}
                    setCode={setCode}
                    name={name}
                    setName={setName}
                    validationErrors={validationErrors}
                    setValidationErrors={setValidationErrors}
                    handleSubmit={handleSubmit}
                    goBackLink={routes.home}
                />
            </Grid>
        </Grid>
    );
}