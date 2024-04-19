import {useNavigate, useParams} from "react-router-dom";
import {useAppSelector} from "../../../app/hooks";
import {selectLevelById} from "../../../features/levels/levelsSlice";
import React, {useEffect, useState} from "react";
import {routes} from "../../../constants/routes";
import {updateLevelAsync} from "../../../services/level.service";
import {Grid, Typography} from "@mui/material";
import {LevelForm} from "../../../components/Forms/LevelForm/LevelForm";
import {SliceState} from "../../../utils/enums/states/SliceState";
import {checkIsStringEmpty} from "../../../utils/helpers/helpers";

export const EditLevelPage = () => {
    const { levelId } = useParams();

    const level = useAppSelector(state => selectLevelById(state, levelId as string));
    const levelsState = useAppSelector(state => state.levels.status);
    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [apiError, setApiError] = useState('');
    const [validationErrors, setValidationErrors] = useState({
        code: false,
        name: false,
    });
    const [isLevelLoaded, setIsLevelLoaded] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if(!level && levelsState == SliceState.Succeeded) {
            navigate(routes.home);
            return;
        }

        if(level) {
            setCode(level.code);
            setName(level.name);
            setIsLevelLoaded(true);
        }
    }, [level, levelsState]);

    const handleSubmit = async () => {
        setApiError('');

        let isNameEmpty = checkIsStringEmpty(name as string);
        let isCodeEmpty = checkIsStringEmpty(code as string);

        setValidationErrors({
            name: isNameEmpty,
            code: isCodeEmpty,
        });

        if(isNameEmpty || isCodeEmpty) {
            return;
        }

        try {
            const response = await updateLevelAsync({
                id: parseInt(levelId as string),
                code: code.trim(),
                name: name.trim(),
            });

            if(response?.status === 400) {
                setApiError(response.data.error.message);
                return;
            }

            navigate(routes.levels.view.url(level?.id as number));
        } catch (err: any) {
            setApiError(err.message);
        }
    }

    return (
        level && isLevelLoaded ? (
            <Grid item container direction='column' rowSpacing={4} xs>
                <Grid item>
                    <Typography variant='h1'>Редагування рівня</Typography>
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
                        goBackLink={routes.levels.view.url(level.id)}
                    />
                </Grid>
            </Grid>
        ) : null
    );
}