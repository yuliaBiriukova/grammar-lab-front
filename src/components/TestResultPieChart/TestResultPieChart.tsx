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
        data.push({ label: 'Correct answers', value: correctCount, color: colors.bg.success });
    }

    if(incorrectCount > 0) {
        data.push({ label: 'Incorrect answers', value: incorrectCount, color: colors.bg.error });
    }

    return (
        <Grid container columnSpacing={3} alignItems='center'>
            <Grid item>
                <PieChart
                    series={[
                        {
                            paddingAngle: 1,
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
                        <Typography variant='body2'>Correct asnwers</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant='body2'>{correctCount}</Typography>
                    </Grid>
                </Grid>
                <Grid item container justifyContent='space-between'>
                    <Grid item>
                        <Typography variant='body2'>Incorrect answers</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant='body2'>{incorrectCount}</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}