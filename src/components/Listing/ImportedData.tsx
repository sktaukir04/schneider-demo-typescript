import { DataGrid, GridColDef } from '@material-ui/data-grid';
import React from 'react'
import { useLocation } from 'react-router-dom';

type Props = {}

const ImportedData = (props: Props) => {
    const [pageSize, setPageSize] = React.useState<number>(5);

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

    return (
        <div style={{}}>
            Imported Data from File <span style={{color:'red'}}>{file?.name}</span> 
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