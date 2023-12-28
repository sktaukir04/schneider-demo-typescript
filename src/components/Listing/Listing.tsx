import React, { useState, useContext, useEffect } from 'react';
import { TableContainer, TableHead, TableBody, TableCell, TableRow, Table, Button, TextField, TableSortLabel, Container, TablePagination, LinearProgress } from '@material-ui/core';
import { multiStepContext } from '../Register/StepContext';
import { Link, useNavigate } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import InfoIcon from '@material-ui/icons/Info';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Pagination from '@material-ui/lab';
import './Listing.css';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { ArrowForwardRounded, FlashAuto, Restore, Search } from '@material-ui/icons';
import { CircularProgress } from '@material-ui/core';
import Modal from 'react-modal';
import { FaDownload } from 'react-icons/fa';

interface EmployeeData {
  id: number;
  firstname: string;
  lastname: string;
  contact: string;
  email: string;
  country: string;
  password: string;
  city: string;
  landmark: string;
  pincode: string;
}



const sortOptions = ["Name", "address", "contact", "Email", "Country"]

const Listing: React.FC = () => {
  const { deleteData, setIsLoggedIn } = useContext(multiStepContext);
  const navigate = useNavigate();
  const [empData, setEmpData] = useState<EmployeeData[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [pageLimit, setPageLimit] = useState(5);
  const [sortFilterValue, setSorFilterValue] = useState("");
  const [operation, setOperation] = useState("");
  const [showProgress, setShowProgress] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [downloadingAll, setDownloadingAll] = useState(false);
  const [downloadingCurrent, setDownloadingCurrent] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowProgress(false)
    }, 1500);
  })

  const loadUserData = async (start: number = 0, end: number = 4, increase: any = 1, optType?: any, filterorSortValue?: any) => {
    switch (optType) {
      case 'search':
        setOperation(optType);
        setSearchValue("");
        try {
          const response = await axios.get(`http://localhost:3001/contacts?q=${searchValue}&_start=${start}&_end=${end}`);
          setEmpData(response.data);
          setCurrentPage(currentPage + increase);
          setSearchValue('');
        } catch (err) {
          console.log(err);
        }
        break;

      case 'sort':
        setOperation(optType);
        setSorFilterValue(filterorSortValue);
        try {
          let response;
          if (filterorSortValue === 'Name') {
            response = await axios.get(`http://localhost:3001/contacts?_sort=firstname&_order=asc&_start=${start}&_end=${end}`);
          } else if (filterorSortValue === 'address') {
            response = await axios.get(`http://localhost:3001/contacts?_sort=landmark&_order=asc&_start=${start}&_end=${end}`);
          } else if (filterorSortValue === 'contact') {
            response = await axios.get(`http://localhost:3001/contacts?_sort=contact&_order=asc&_start=${start}&_end=${end}`);
          } else if (filterorSortValue === 'Email') {
            response = await axios.get(`http://localhost:3001/contacts?_sort=email&_order=asc&_start=${start}&_end=${end}`);
          } else if (filterorSortValue === 'Country') {
            response = await axios.get(`http://localhost:3001/contacts?_sort=country&_order=asc&_start=${start}&_end=${end}`);
          }
          console.log(filterorSortValue);

          setEmpData(response?.data);
          setCurrentPage(currentPage + increase)
        } catch (err) {
          console.log(err);
        }
        break;

      default:
        try {
          const response = await fetch(`http://localhost:3001/contacts?_start=${start}&_end=${end}`);
          const data = await response.json();
          setEmpData(data);
          if (increase === 0) {
            setCurrentPage(0);
          } else {
            setCurrentPage(currentPage + increase);
          }
        } catch (err) {
          console.log(err);
        }
        break;
    }
  };






  useEffect(() => {
    loadUserData(0, 4, 0);
  }, []);

  // const confirmDownload = () => {
  //   return confirm("Download Full DAta instead ?")
  // }

  const exportToExcel = async (data: any, fileName: string, confrimed: boolean) => {
    // const confrimed = window.confirm("Download all Data instead ?")
    const res = await fetch("http://localhost:3001/contacts").then((res) => res.json())
    let ws;
    if (confrimed) {
      ws = XLSX.utils.json_to_sheet(res)
    } else {
      ws = XLSX.utils.json_to_sheet(data)
    }
    const wb = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }

  const renderPagination = () => {
    if (empData.length < 4 && currentPage === 0) {
      return null;
    }
    if (currentPage === 0) {
      return (
        <div style={{ display: 'flex', justifyContent: 'flex-end', margin: 'auto', width: '400px', alignItems: 'center', gap: '20px', marginTop: '30px' }}>
          <Button disabled>Prev</Button>
          <label style={{ flex: 1 }} htmlFor="">1</label>
          <Button endIcon={<ArrowForwardRounded />} variant='outlined' color='primary' onClick={() => {
            loadUserData(4, 8, 1, operation, sortFilterValue); console.log("CurrentPage is " + currentPage);
          }}>Next</Button>
        </div>
      )
    } else if (currentPage <= pageLimit - 1 && empData.length < pageLimit) {
      return (
        <div style={{ display: 'flex', justifyContent: 'space-around', margin: 'auto', width: '400px', alignItems: 'center', gap: '20px', marginTop: '30px' }}>
          <Button startIcon={<ArrowBackIcon />} variant='outlined' color='primary' onClick={() => { loadUserData((currentPage - 1) * 4, currentPage * 4, -1, operation, sortFilterValue); console.log("Current Page is " + currentPage + "and pagelimit is  " + pageLimit) }}>Prev</Button>
          <label htmlFor="">{currentPage + 1}</label>
          <Button endIcon={<ArrowForwardRounded />} variant='outlined' color='primary' onClick={() => { loadUserData((currentPage + 1) * 4, (currentPage + 2) * 4, 1, operation, sortFilterValue); console.log("Current Page is " + currentPage) }}>Next</Button>
        </div>
      )
    }
    else {
      return (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-around', margin: 'auto', width: '400px', alignItems: 'center', gap: '20px', marginTop: '30px' }}>
            <Button startIcon={<ArrowBackIcon />} variant='outlined' color='primary' onClick={() => { loadUserData((currentPage - 1) * 4, currentPage * 4, -1, operation, sortFilterValue); console.log("Current page is " + currentPage + "and pagelimit is  " + pageLimit) }}>Prev</Button>
            <label htmlFor="">{currentPage + 1}</label>
            <Button disabled>Next</Button>
          </div>
        </>
      )
    }

  }




  useEffect(() => {
    let userName = sessionStorage.getItem('email');
    if (userName == "" || userName == null) {
      navigate('/')
    }
  })

  const handleSearch = async (e: any) => {
    e.preventDefault();
    loadUserData(0, 4, 0, 'search')
  }


  const handleReset = () => {
    setOperation("");
    setSearchValue("")
    setSorFilterValue("");
    loadUserData(0, 4, 0);
    setSelectedValue("Select a value");

  }

  const handleSort = async (e: any) => {
    const value = e.target.value;
    setSelectedValue(value);
    loadUserData(0, 4, 0, 'sort', value);
  };

  if (showProgress) {
    return (
      <>
        <LinearProgress style={{ color: 'gold', backgroundColor: 'green', height: '10px' }} variant='query' color='primary' />
        {/* <CircularProgress color="secondary" style={{ marginTop: 'auto', display:'flex',justifyContent:'center' }} size={400} thickness={3} /> */}
      </>
    )
  }



  return (
    <div className='listing'  >
      <Link style={{ marginLeft: '50px', fontSize: '20px' }} to={'/'}>
        <ArrowBackIcon />
      </Link>
      <Container style={{ margin: "auto", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

        <div style={{ margin: '20px', display: 'flex', alignItems: 'center', boxShadow: '0px 0px 10px green', padding: '10px' }}>
          <form action="" onSubmit={handleSearch}>
            <div style={{ display: 'flex', justifyContent: 'center', width: "500px", flex: 1, margin: 'auto', alignItems: 'center' }}>
              <TextField fullWidth label="Search by Name" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
              <Button endIcon={<Search />} type='submit' variant='contained' style={{ border: '1px solid black', margin: '10px' }} color='secondary'>Search</Button>
              <Button endIcon={<Restore />} type='reset' variant='outlined' onClick={() => handleReset()} style={{ border: '1px solid black', margin: '10px' }} color='primary'>Reset</Button>
            </div>
          </form>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <TableSortLabel>Sort By:</TableSortLabel>
            <select
              style={{ width: '150px', height: '40px' }}
              value={selectedValue}
              onChange={handleSort}
            >
              <option value={selectedValue} disabled>
                {selectedValue ? selectedValue : 'Select a Value'}
              </option>
              {
                sortOptions.map((item, index) => {
                  return (
                    <>
                      <option style={{ fontSize: '15px', textAlign: 'start', fontWeight: 'bold' }} key={index} value={item}>
                        {item}
                      </option>
                    </>
                  )
                })
              }
            </select>
          </div>

          <Modal isOpen={modalOpen} className='customModal'
            onRequestClose={() => setModalOpen(false)}
            ariaHideApp={false}
            contentLabel="Custom Modal">
            <div>
              <span className='cancelModal' onClick={() => setModalOpen(false)}>&times;</span>
              <h3>Download Options ?</h3>
              <Button color='primary' variant='contained' onClick={() => {
                setDownloadingAll(true);
                setTimeout(() => {
                  setDownloadingAll(false);
                  exportToExcel(empData, "Full Employee List", true);
                  setModalOpen(false);
                }, 1000);
              }}>
                {downloadingAll ?
                  <CircularProgress style={{ backgroundColor: 'yellow', color: 'red' }} size={24} /> :
                  "All Data"
                }
              </Button>
              <Button color='secondary' variant='outlined' onClick={() => {
                setDownloadingCurrent(true);
                setTimeout(() => {
                  setDownloadingCurrent(false)
                  exportToExcel(empData, `Employee Page ${currentPage + 1}`, false);
                  setModalOpen(false);
                }, 1000);
              }}>
                {
                  downloadingCurrent ? <CircularProgress size={24} /> : "Current Page Only"
                }
              </Button>
            </div>
          </Modal>
          <Button endIcon={<FaDownload />} color='primary' size='small' variant='contained' onClick={() => {
            // exportToExcel(empData, "Employee Data File")
            setModalOpen(true);
          }} style={{ margin: '10px' }}>Export</Button>
        </div>
      </Container>
      <TableContainer style={{ display: 'flex', justifyContent: 'center' }}>
        <Table className='tableDisplay' size='small'>
          <TableHead className='tableHead'>
            <TableRow className='tableHead' style={{ backgroundColor: 'rgb(101 178 67)', color: 'white', textAlign: 'center' }}>
              <TableCell>ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Contact Number</TableCell>
              <TableCell>Email Address</TableCell>
              <TableCell>Country</TableCell>
              {/* <TableCell>Password</TableCell> */}
              <TableCell>City</TableCell>
              <TableCell>Landmark</TableCell>
              <TableCell>Postal Code</TableCell>
              <TableCell>Actions</TableCell>
              <TableCell>View</TableCell>
            </TableRow>
          </TableHead>

          <TableBody className='empdisplaybody'>
            {empData ?
              empData.map((data) => (
                <TableRow key={data.id} className='emptablerow'>
                  <TableCell>{data.id}</TableCell>
                  <TableCell>{data.firstname}</TableCell>
                  <TableCell>{data.lastname}</TableCell>
                  <TableCell style={{whiteSpace:'nowrap'}}>{data.contact}</TableCell>
                  <TableCell>{data.email}</TableCell>
                  <TableCell>{data.country}</TableCell>
                  {/* <TableCell>{data.password}</TableCell> */}
                  <TableCell>{data.city}</TableCell>
                  <TableCell>{data.landmark}</TableCell>
                  <TableCell>{data.pincode}</TableCell>
                  <TableCell style={{ display: 'flex', gap: '4px' }}>
                    <Button startIcon={<EditIcon />} onClick={() => navigate('/edit/' + data.id, { state: { data: data } })} color='primary' variant='outlined'></Button>
                    <Button startIcon={<DeleteIcon />} onClick={() => deleteData(data.id)} color='secondary' variant='outlined'></Button>
                  </TableCell>
                  <TableCell>
                    <Button startIcon={<InfoIcon />} onClick={() => navigate('/details/' + data.id)} variant='outlined'>
                      INFO
                    </Button>
                  </TableCell>
                </TableRow>
              )) : <TableCell>No Data Found</TableCell>
            }
          </TableBody>
        </Table>
        {/* <TablePagination component={'children'}/> */}
      </TableContainer>
      <div>{renderPagination()}</div>

      <br />



      <div className="logoutBtn" style={{ display: 'flex', position: "fixed", bottom: "20px", right: '20px' }}>
        <Button style={{ backgroundColor: 'red', color: 'white' }} startIcon={<ExitToAppIcon />} onClick={() => { setIsLoggedIn(false); navigate('/') }} color='primary' variant='outlined' className='logoutbtn'> <span className='logoutText'>Log Out</span></Button>
      </div>
    </div>
  );
};

export default Listing;
