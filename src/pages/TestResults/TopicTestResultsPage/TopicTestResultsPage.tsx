import {Link as RouterLink, useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {TestResult} from "../../../models/TestResult/TestResult";
import {TestResultsFilter} from "../../../models/Filters/TestResultsFilter";
import {getTestResultsAsync} from "../../../services/testResult.service";
import {routes} from "../../../constants/routes";
import {GridColDef} from "@mui/x-data-grid";
import {Grid, Typography} from "@mui/material";
import {testResultsStyles} from "../test-results.styles";
import {formatDateToString} from "../../../utils/helpers/dates.helper";
import {ButtonStyled} from "../../../components/common/Button/ButtonStyled";
import {ArrowForward} from "@mui/icons-material";
import {DataTable} from "../../../components/common/DataTable/DataTable";
import {getTopicById} from "../../../services/topic.service";
import {Topic} from "../../../models/Topic/Topic";

export const TopicTestResultsPage = () => {
    const { topicId } = useParams();

    const [topic, setTopic] = useState<Topic>();
    const [testResults, setTestResults] = useState<TestResult[]>();

    const navigate = useNavigate();

    useEffect(() => {
        const fetchTopicAndTestResults = async () => {
            const filter: TestResultsFilter = {
                topicId: parseInt(topicId as string),
            };

            const [topicData, testResultsData] = await Promise.all([
                getTopicById(parseInt(topicId as string)),
                getTestResultsAsync(filter),
            ]);

            if(!topicData || !testResultsData) {
                navigate(routes.home);
                return;
            }

            setTopic(topicData);
            setTestResults(testResultsData);
        };

        fetchTopicAndTestResults();
    }, [topicId]);

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: '№',
            width: 64,
            /*renderCell: params => params.api.getRowIndexRelativeToVisibleRows(params.row.id) + 1,*/
        },
        {
            field: 'dateCompleted',
            headerName: 'Дата проходження',
            flex: 1,
            renderCell: params => formatDateToString(params.row.dateCompleted),
        },
        {
            field: 'percentage',
            headerName: 'Оцінка',
            width: 104,
            renderCell: params => `${params.row.percentage}%`,
        },
        {
            field: 'view',
            headerName: '',
            width: 168,
            sortable: false,
            align: 'center',
            renderCell: (params) => (
                <RouterLink to={routes.testResults.view.url(params.row.id)} >
                    <ButtonStyled endIcon={<ArrowForward />} sx={testResultsStyles.button}>Переглянути</ButtonStyled>
                </RouterLink>
            ),
        },
    ];

    return (
        testResults ? (
            <Grid item container direction='column' rowSpacing={4} xs>
                <Grid item>
                    <Typography variant='h1'>{topic?.name}</Typography>
                </Grid>
                <Grid item width='100%'>
                    {
                        testResults.length === 0 ? (
                            <Typography variant='body1'>Ви ще не проходити тести з цієї теми.</Typography>
                        ) : (
                            <Grid item container direction='column' rowSpacing={3}>
                                <Grid item>
                                    <Typography variant='body1'>Всі результати проходження тестів з теми.</Typography>
                                </Grid>
                                <Grid item>
                                    <DataTable rows={testResults} columns={columns}/>
                                </Grid>
                            </Grid>
                        )
                    }
                </Grid>
            </Grid>
        ) : null
    );
}