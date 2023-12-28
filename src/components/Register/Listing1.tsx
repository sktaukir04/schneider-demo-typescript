import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { DataGrid, GridColDef } from '@material-ui/data-grid';
import '../Listing/Listing.css'
import { useNavigate } from 'react-router-dom';
import { IconButton, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import { multiStepContext } from './StepContext';
import CustomModal from './CustomModal';
import { GetApp } from '@material-ui/icons';
import * as XLSX from 'xlsx';
import {makeStyles} from '@material-ui/core';


type Props = {}

const useStyles = makeStyles((theme:any) => ({
    dataListContainer: {
      height: '70vh',
      margin: theme.spacing(2), 
      overflowX: 'hidden',
      overflowY:'scroll'
    },
  }));

const Listing1 = (props: Props) => {
    const navigate = useNavigate()
    const [datas, setData] = useState([]);
    const [pageSize, setPageSize] = React.useState<number>(5);
    const [input, setInput] = useState('');
    const [toogleInput, setToggleInput] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const classes = useStyles()


    const { setCurrentUser,modalData,setModalData } = useContext(multiStepContext);
    const fetchData = async () => {
        const { data } = await axios.get(`http://localhost:3001/contacts`);
        setData(data)
    }

    useEffect(() => {
        fetchData();
        const sessionVal = sessionStorage.getItem("userData");
        if (sessionVal) {
            try {
                const userData = JSON.parse(sessionVal);
                setCurrentUser(userData)
                // console.log(userData);
            } catch (error) {
                console.error("Error parsing JSON:", error);
            }
        } else {
            console.log("No data found in sessionStorage");
            navigate('/')
        }
    }, []);


    const filteredDatas = datas.filter((data) =>
        Object.values(data).some(
            (value) => typeof value === 'string' && value.toLowerCase().includes(input.toLowerCase())
        )
    );
    const columns: GridColDef[] = datas.length > 0 ? [
        { field: 'id', headerName: 'ID', width: 70 },
        ...Object.keys(datas[0])
            .filter((key) => key !== 'ID' && key !== 'password')
            .map((key) => ({
                field: key,
                headerName: key.toUpperCase(),
                flex: 1,
            })),
    ] : [];


    const handleCellClick = (params: any) => {
        const selectedId = params.row.id;
        // navigate(`/details/${selectedId}`);
        setModalOpen(true);
        setModalData(params.row);
        console.log(params.row);

    };

    const getRowClassName = (params: any, index: any) => {
        const baseClassName = params.rowIndex % 2 === 0 ? 'even-row' : 'odd-row';
        const additionalClassName = index && index % 2 === 0 ? 'green-background' : '';
        return `${baseClassName} ${additionalClassName}`;
    };


    const getRowId = (row: any) => row.id;

    const exportToExcel = async (data: any, fileName: string, confrime?: boolean) => {
        const confrimed = window.confirm("Download Data ?")
        let ws;
        if (confrimed) {
          ws = XLSX.utils.json_to_sheet(datas)
          const wb = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
          XLSX.writeFile(wb, `${fileName}.xlsx`);
        } else {
        //   ws = XLSX.utils.json_to_sheet(data)
        }

      }


    return (
        <>
            <div className="input" style={{width:'90vw',margin:'10px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '2px' }}>
                {toogleInput && (
                    <TextField
                        label="Search Data"
                        value={input}
                        onChange={(e: any) => setInput(e.target.value)}
                        InputProps={{
                            endAdornment: input && (
                                <IconButton
                                    style={{ width: '40px' }}
                                    onClick={() => setInput('')}
                                    edge="end"
                                >
                                    <ClearIcon />
                                </IconButton>
                            ),
                        }}
                    />
                )}
                {!input && (
                    <>
                        <IconButton type='submit' style={{ width: '40px' }}
                            onClick={() => { setInput(''); setToggleInput(!toogleInput) }}><SearchIcon />
                        </IconButton>
                        <IconButton onClick={()=>{exportToExcel(datas,"Employee List")}} style={{ width: '40px' }}>
                            <GetApp />
                        </IconButton>
                    </>
                )
                }
            </div>

            <CustomModal modalOpen={modalOpen} setModalOpen={setModalOpen} modalData={modalData} setModalData={setModalData}/>

            <div className={`newList ${classes.dataListContainer}`} style={{ height: '70vh' }} >
                <DataGrid
                    rows={filteredDatas}
                    onCellClick={handleCellClick}
                    columns={columns}
                    autoPageSize
                    getRowClassName={getRowClassName}
                    getRowId={getRowId}
                    autoHeight
                    pageSize={pageSize}
                    headerHeight={50}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    rowsPerPageOptions={[5, 10, 15, 20]}
                    pagination
                    disableSelectionOnClick
                />
            </div>
        </>
    )
}

export default Listing1