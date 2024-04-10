import { PieChart } from '@mui/x-charts/PieChart';
import {PieChartCenterLabel} from "../common/PieChartCenterLabel/PieChartCenterLabel";
import {Grid, Typography} from "@mui/material";
import React from "react";
import {colors} from "../../constants/colors";

interface TestResultPieChartProps {
    correctCount: number;
    incorrectCount: number;
    percentage: number;
}

export const TestResultPieChart = ({ correctCount, incorrectCount, percentage } : TestResultPieChartProps) => {
    const data = [];

    if(correctCount > 0) {
        data.push({ label: 'Правильні відповіді', value: correctCount, color: colors.success });
    }

    if(incorrectCount > 0) {
        data.push({ label: 'Неправильні відповіді', value: incorrectCount, color: colors.error });
    }

    return (
        <Grid container columnSpacing={3} alignItems='center'>
            <Grid item>
                <PieChart
                    series={[
                        {
                            innerRadius: 32,
                            outerRadius: 48,
                            data,
                        },
                    ]}
                    margin={{ right: 5 }}
                    width={96}
                    height={96}
                    slotProps={{
                        legend: { hidden: true },
                    }}
                >
                    <PieChartCenterLabel>{percentage}&#37;</PieChartCenterLabel>
                </PieChart>
            </Grid>
            <Grid item container direction='column' rowSpacing={2} width={208}>
                <Grid item container justifyContent='space-between'>
                    <Grid item>
                        <Typography variant='body2'>Правильні відповіді</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant='body2'>{correctCount}</Typography>
                    </Grid>
                </Grid>
                <Grid item container justifyContent='space-between'>
                    <Grid item>
                        <Typography variant='body2'>Неправильні відповіді</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant='body2'>{incorrectCount}</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}