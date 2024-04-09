import React, {ReactNode} from "react";
import {useDrawingArea} from "@mui/x-charts";
import {styled} from "@mui/material/styles";

interface PieChartCenterLabelProps {
    children: ReactNode;
}

const CenteredText = styled('text')(({ theme }: any) => ({
    fill: theme.palette.common.black,
    textAnchor: 'middle',
    dominantBaseline: 'central',
    fontSize: 18,
}));

export const PieChartCenterLabel = ({ children }: PieChartCenterLabelProps) => {
    const { width, height, left, top } = useDrawingArea();
    return (
        <CenteredText x={left + width / 2} y={top + height / 2}>
            {children}
        </CenteredText>
    );
}