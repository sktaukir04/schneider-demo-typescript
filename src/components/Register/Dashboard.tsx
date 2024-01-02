import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { DataGrid, GridColDef, GridRowClassNameParams } from '@mui/x-data-grid';


import '../Listing/Listing.css'
import { useNavigate } from 'react-router-dom';
import { IconButton, TextField, Slide, Box } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import { multiStepContext } from './StepContext';
import CustomModal from './CustomModal';
import { CloudUploadOutlined, GetApp, Height } from '@mui/icons-material';
import * as XLSX from 'xlsx';
import LinearProgress from '@mui/material/LinearProgress';



type Props = {}



const Dashboard = (props: Props) => {
    const navigate = useNavigate()
    const [datas, setData] = useState([]);
    const [pageSize, setPageSize] = React.useState<number>(5);
    const [input, setInput] = useState('');
    const [toogleInput, setToggleInput] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedRows, setSelectedRows] = useState<any[]>([]);
    const [showProgress, setShowProgress] = useState(true);




    const { setCurrentUser, modalData, deleteData, setModalData } = useContext(multiStepContext);
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

    useEffect(() => {
        setTimeout(() => {
          setShowProgress(false)
        }, 400);
      })

    const filteredDatas = datas.filter((data) =>
        Object.values(data).some(
            (value) => typeof value === 'string' && value.toLowerCase().includes(input.toLowerCase())
        )
    );

    const columns: GridColDef[] = datas.length > 0
        ? [
            {
                field: 'id',
                headerName: 'ID',
                width: 200,
            },
            ...Object.keys(datas[0])
                .filter((key) => key !== 'ID' && key !== 'password' && key !== 'id')
                .map((key) => ({
                    field: key,
                    headerName: key.toUpperCase(),
                    flex: 1,
                })),
        ]
        : [];





    const handleCellClick = (params: any) => {
        const clickedFiled = params.field;
        if (clickedFiled === '__check__') {
            const selectedId = params.row.id;
            console.log(selectedId);
            // handleMultiSelect(selectedId)
            return
        } else {
            // navigate(`/details/${selectedId}`);
            setModalOpen(true);
            setModalData(params.row);
            console.log(params.row);
        }
    };

    const getRowClassName = (params: any) => {
        const rowIndex = params.id && params.id;
        const baseClassName = rowIndex % 2 === 0 ? 'even-row' : 'odd-row';
        const additionalClassName = rowIndex && rowIndex % 2 === 0 ? 'green-background' : '';
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
            console.log("Confirm to download first");

            //   ws = XLSX.utils.json_to_sheet(data)
        }

    }


    const handleImportFile = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const data = event.target?.result;
                const workBook = XLSX.read(data, { type: 'binary' });
                const sheetName = workBook.SheetNames[0];
                const worksheet = workBook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet);
                navigate('/importedData', { state: { data: jsonData, events: file } });
            };

            reader.readAsBinaryString(file);
        }
    };

    const handleMultiSelect = (params: any) => {
        setSelectedRows((prev: any) => {
            return [...prev, params]
        })
    };

    if (showProgress) {
        return (
          <>
            <LinearProgress style={{ color: 'gold', backgroundColor: 'green', height: '10px' }} variant='query' color='primary' />
          </>
        )
      }

    return (
        <>
            <div className="dashboard-container">


                <div className="input" style={{ width: '90vw', margin: '10px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '2px' }}>
                    {toogleInput && (
                        <Slide direction='left' in={toogleInput} mountOnEnter unmountOnExit>
                            <TextField
                                style={{ maxWidth: '200px' }}
                                label="Search Data"
                                type='text'
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
                        </Slide>
                    )}
                    {!input && (
                        <>
                            <IconButton type='submit' style={{ margin: '2px', padding: '3px', width: '40px' }}
                                onClick={() => { setInput(''); setToggleInput(!toogleInput) }}><SearchIcon />
                            </IconButton>
                            <IconButton onClick={() => { exportToExcel(datas, "Employee List") }} style={{ width: '40px' }}>
                                <GetApp />
                            </IconButton>
                            <IconButton style={{ width: '40px' }}>
                                <input
                                    type="file"
                                    accept=".xlsx, .xls"
                                    id="fileInput"
                                    style={{ display: 'none' }}
                                    onChange={handleImportFile}
                                />
                                <label htmlFor="fileInput">
                                    <IconButton component="span">
                                        <CloudUploadOutlined />
                                    </IconButton>
                                </label>
                            </IconButton>
                        </>
                    )
                    }
                </div>

                <CustomModal modalOpen={modalOpen} setModalOpen={setModalOpen} modalData={modalData} setModalData={setModalData} />

                <Box className={`newList`} sx={{ m: '5px', height: '80vh', width: '99vw' }} >

                    <DataGrid
                        rows={filteredDatas}
                        columns={columns}
                        getRowClassName={getRowClassName}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 10,
                                },
                            },
                        }}
                        onCellClick={handleCellClick}
                        pageSizeOptions={[5, 10, 20,datas.length]}
                        // checkboxSelection
                        disableRowSelectionOnClick
                    />
                </Box>
            </div>
        </>
    )
}


export default Dashboard