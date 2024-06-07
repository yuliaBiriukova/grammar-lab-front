import {Grid, Link, Typography} from "@mui/material";
import {Link as RouterLink, useNavigate, useParams} from "react-router-dom";
import {routes} from "../../../constants/routes";
import {ButtonStyled} from "../../../components/common/Button/ButtonStyled";
import {DataTable} from "../../../components/common/DataTable/DataTable";
import React, {useEffect, useState} from "react";
import {useAppSelector} from "../../../app/hooks";
import {selectLevelById} from "../../../features/levels/levelsSlice";
import {TestResult} from "../../../models/TestResult/TestResult";
import {EntityId} from "@reduxjs/toolkit";
import {getBestTestResultsAsync} from "../../../services/testResult.service";
import {TestResultsFilter} from "../../../models/Filters/TestResultsFilter";
import {GridColDef} from "@mui/x-data-grid";
import {testResultsStyles} from "../test-results.styles";
import {formatDateToString} from "../../../utils/helpers/dates.helper";
import {ArrowForward} from "@mui/icons-material";

export const LevelTestResultsPage = () => {
    const { levelId } = useParams();
    const [testResults, setTestResults] = useState<TestResult[]>();

    const level = useAppSelector(state => selectLevelById(state, levelId as EntityId));

    const navigate = useNavigate();

    useEffect(() => {
        const fetchTestResults = async () => {
            const filter: TestResultsFilter = {
                levelId: parseInt(levelId as string),
            };

            const testResultsData = await getBestTestResultsAsync(filter);
            if(!testResultsData) {
                navigate(routes.home);
                return;
            }
            setTestResults(testResultsData);
        };

        fetchTestResults();
    }, [levelId]);

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: '№',
            width: 64,
        },
        {
            field: 'topicName',
            headerName: 'Topic',
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
            headerName: 'Pass date',
            width: 200,
            renderCell: params => formatDateToString(params.row.dateCompleted),
        },
        {
            field: 'percentage',
            headerName: 'Best grade',
            width: 160,
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
                    <ButtonStyled endIcon={<ArrowForward />} sx={testResultsStyles.button}>Review</ButtonStyled>
                </RouterLink>
            ),
        },
    ];

    return (
        testResults ? (
            <Grid item container direction='column' rowSpacing={4} xs>
                <Grid item>
                    <Typography variant='h1'>{level?.code}: {level?.name}</Typography>
                </Grid>
                <Grid item width='100%'>
                    {
                        testResults.length === 0 ? (
                            <Typography variant='body1'>You have not taken any tests at this level yet.</Typography>
                        ) : (
                            <Grid item container direction='column' rowSpacing={3}>
                                <Grid item>
                                    <Typography variant='body1'>The best test results on level topics.</Typography>
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