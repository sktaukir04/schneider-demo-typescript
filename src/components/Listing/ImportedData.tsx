import { Typography } from '@material-ui/core';
import { DataGrid, GridColDef } from '@material-ui/data-grid';
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import CancelIcon from '@material-ui/icons/Cancel';

type Props = {}

const ImportedData = (props: Props) => {
    const [pageSize, setPageSize] = React.useState<number>(5);
    const navigate = useNavigate();
    const location = useLocation();
    const uploadData = location.state && location.state.data
    const file = location.state && location.state.events
    console.log(file)

    const columns: GridColDef[] = uploadData.length > 0 ? [
        { field: 'id', headerName: 'ID', width: 70 },
        ...Object.keys(uploadData[0])
            .filter((key) => key !== 'ID' && key !== 'password')
            .map((key) => ({
                field: key,
                headerName: key.toUpperCase(),
                flex: 1,
            })),
    ] : [];


    console.log(columns);

    const fileDetails = {
        name: file?.name,
        fileSize: file?.size,
        path: file.type
    }



    return (
        <div style={{}}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '10px' }}>
                <Typography style={{ margin: '10px', textAlign: 'center' }}>
                    Imported Data from File: <span title={JSON.stringify(fileDetails)} style={{ color: 'red', textDecoration: 'underline' }}>{file?.name}</span>
                </Typography>
                <span style={{ cursor: 'pointer' }} onClick={() => { navigate('/listing') }}><CancelIcon /></span>
            </div>
            <DataGrid
                rows={uploadData}
                columns={columns}
                autoPageSize
                autoHeight
                pageSize={pageSize}
                headerHeight={50}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[5, 10, 15, 20]}
                pagination
                disableSelectionOnClick
            />
        </div>
    )
}

export default ImportedData