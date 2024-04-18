import React, {useEffect, useState} from "react";
import {TestResult} from "../../../models/TestResult/TestResult";
import {Grid, Link, Typography} from "@mui/material";
import {getTestResultsAsync} from "../../../services/testResult.service";
import {routes} from "../../../constants/routes";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import {GridColDef} from "@mui/x-data-grid";
import {ButtonStyled} from "../../../components/common/Button/ButtonStyled";
import {ArrowForward} from "@mui/icons-material";
import { DataTable } from "../../../components/common/DataTable/DataTable";
import {formatDateToString} from "../../../utils/helpers/dates.helper";
import {testResultsStyles} from "../test-results.styles";

export const AllTestResultsPage = () => {
    const [testResults, setTestResults] = useState<TestResult[]>();

    const navigate = useNavigate();

    useEffect(() => {
        const fetchTestResults = async () => {
            const testResultsData = await getTestResultsAsync();
            if(!testResultsData) {
                navigate(routes.home);
                return;
            }
            setTestResults(testResultsData);
        };

        fetchTestResults();
    }, []);

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: '№',
            width: 64,
            /*renderCell: params => params.api.getRowIndexRelativeToVisibleRows(params.row.id) + 1,*/
        },
        {
            field: 'topicName',
            headerName: 'Тема',
            flex: 1,
            sortable: false,
            renderCell: (params) => (
                <Link component={RouterLink} to={routes.testResults.byTopic.url(params.row.topicId)} sx={testResultsStyles.link}>
                    {params.row.topicName}
                </Link>
            ),
        },
        {
            field: 'dateCompleted',
            headerName: 'Дата проходження',
            width: 200,
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
                    <Typography variant='h1'>Результати пройдених тестів</Typography>
                </Grid>
                <Grid item width='100%'>
                    {
                        testResults.length === 0 ? (
                            <Typography variant='body1'>Ви ще не проходили тестів.</Typography>
                        ) : (

                            <Grid item container direction='column' rowSpacing={3}>
                                <Grid item>
                                    <Typography variant='body1'>Всі результати проходження тестів.</Typography>
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