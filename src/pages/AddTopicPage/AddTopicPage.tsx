import {Grid, Typography} from "@mui/material";
import {TextInputLabel} from "../../components/common/TextField/TextFieldLabel";
import {TextInputField} from "../../components/common/TextField/TextFieldInput";
import {loginStyles} from "../LoginPage/loginPageStyles";
import {ButtonStyled} from "../../components/common/Button/ButtonStyled";
import {ButtonVariant} from "../../utils/enums/button/ButtonVariant";
import React, {ChangeEvent, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {Api} from "../../utils/axiosApi";
import {apiEndpoints} from "../../constants/apiEndpoints";
import {routes} from "../../constants/routes";
import {homeStyles} from "../HomePage/homeStyles";
import {LevelsMenu} from "../../components/LevelsMenu/LevelsMenu";

export const AddTopicPage = () => {
    const { levelId } = useParams();

    const [name, setName] = useState<string>('');
    const [content, setContent] = useState<string>('');

    const [apiError, setApiError] = useState('');
    const [validationErrors, setValidationErrors] = useState({
        name: false,
        content: false,
    });

    const navigate = useNavigate();

    const handleSubmit = async () => {
        setApiError('');

        const isEmpty = (value: string) => value.trim() === '';

        let isNameEmpty = isEmpty(name);
        let isContentEmpty = isEmpty(content);

        setValidationErrors({
            name: isNameEmpty,
            content: isContentEmpty,
        });

        if(isNameEmpty || isContentEmpty) {
            return;
        }

        try {
            const response = await Api.post(
                apiEndpoints.topics.main,
                {
                    levelId,
                    name,
                    content,
                },
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            if(response.status === 400) {
                setApiError(response.data.message);
                return;
            }

            navigate(routes.levels.view.url(parseInt(levelId as string)));
        } catch (err: any) {
            setApiError(err.message);
        }
    }

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        setName(inputValue);
    };

    const handleContentChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        setContent(inputValue);
    };

    return (
        <Grid item container justifyContent='center' sx={homeStyles.container}>
            <Grid item container justifyContent='space-between' sx={homeStyles.content} >
                <Grid item>
                    <LevelsMenu />
                </Grid>
                <Grid item container direction='column' rowSpacing={4} xs>
                    <Grid item>
                        <Typography variant='h1'>Нова тема</Typography>
                    </Grid>
                    <Grid item>
                        <form>
                            <Grid item container direction='column' justifyContent="center" rowSpacing={3}>
                                <Grid item container rowSpacing={1}>
                                    <TextInputLabel required={true}>
                                        Назва
                                    </TextInputLabel>
                                    <TextInputField
                                        type="text"
                                        placeholder="Введіть назву теми"
                                        value={name}
                                        onChange={handleNameChange}
                                        required={true}
                                        sx={loginStyles.textField}
                                        error={validationErrors.name}
                                        helperText={validationErrors.name ? 'Назва теми обов\'язкова' : ''}
                                    />
                                </Grid>
                                <Grid item>
                                    <TextInputLabel required={true}>
                                        Контент
                                    </TextInputLabel>
                                    <TextInputField
                                        type="text"
                                        placeholder="Введіть контент теми"
                                        value={content}
                                        onChange={handleContentChange}
                                        required={true}
                                        sx={loginStyles.textField}
                                        error={validationErrors.content}
                                        helperText={validationErrors.content ? 'Контент теми обов\'язковий' : ''}
                                    />
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                    <Grid item container columnSpacing={3}>
                        <Grid item>
                            <Link to={routes.levels.view.url(parseInt(levelId as string))}>
                                <ButtonStyled variant={ButtonVariant.Outlined}>
                                    Назад
                                </ButtonStyled>
                            </Link>
                        </Grid>
                        <Grid item>
                            <ButtonStyled variant={ButtonVariant.Contained} onClick={handleSubmit}>
                                Зберегти
                            </ButtonStyled>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>

    );
}