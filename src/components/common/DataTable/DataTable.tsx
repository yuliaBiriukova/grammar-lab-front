import React from "react";
import {DataGrid} from "@mui/x-data-grid";
import {theme} from "../../../utils/theme";

interface DataTableProps {
    rows: any[];
    columns: any[];
}

export const DataTable = ( { rows, columns } : DataTableProps) => {
    const style = {
        backgroundColor: theme.palette.common.white,
        fontFamily: 'Inter',
        fontSize: 16,
        '& .MuiDataGrid-cell:focus': {
            outline: 'none',
        },
        '& .MuiDataGrid-columnHeader:focus': {
            outline: 'none',
        },
        '& .MuiDataGrid-cell:focus-within': {
            outline: 'none',
        },
        '& .MuiDataGrid-columnHeader:focus-within': {
            outline: 'none',
        },
        "& .MuiDataGrid-row:hover": {
            backgroundColor: 'inherit'
        },
        "& .MuiDataGrid-row.Mui-hovered": {
            backgroundColor: 'inherit'
        },
    }

    return(
        <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
                pagination: {
                    paginationModel: { page: 0, pageSize: 10 },
                },
            }}
            pageSizeOptions={[5, 10, 15, 20]}
            disableRowSelectionOnClick
            showCellVerticalBorder
            sx={style}
            rowCount={rows.length}
            disableColumnMenu
        />
    )
}