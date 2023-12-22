import React, { useContext, useEffect, useState } from 'react';
import { Button, Container } from '@material-ui/core';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { multiStepContext } from '../Register/StepContext';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import './EmpDetail.css';

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

const EmpDetails: React.FC = () => {
  const navigate = useNavigate();
  const { deleteData } = useContext(multiStepContext);
  const { id } = useParams();
  const [showPass,setShowPass]=useState(false);
  const [data, setdata] = useState<EmployeeData | {}>({});

  useEffect(() => {
    axios(`http://localhost:3001/contacts/${id}`)
      .then((response) => {
        setdata(response.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div>
      <Link style={{ margin: '100px', marginTop: '40px', padding: '50px' }} to={'/listing'}>
        <ArrowBackIcon />
      </Link>
      <h3 style={{ textAlign: 'center' }}>Employee Detail for ID - <span style={{ color: 'red', textDecoration: 'underline' }}>{id}</span></h3>
      <Container className='empdetail'>
        <div>
          <label>FirstName : </label> <span>{(data as EmployeeData).firstname}</span>
        </div>
        <div>
          <label>LastName : </label> <span>{(data as EmployeeData).lastname}</span>
        </div>
        <div>
          <label>Contact : </label> <span>{(data as EmployeeData).contact}</span>
        </div>
        <div>
          <label>Email : </label> <span>{(data as EmployeeData).email}</span>
        </div>
        <div>
          <label>Country : </label> <span>{(data as EmployeeData).country}</span>
        </div>
        <div>
          {showPass && <><label style={{backgroundColor:'lightred'}}>password : </label><span>{(data as EmployeeData).password}</span></>}
          <button style={{display:'inline-block',width:'fit-content',marginLeft:'10px'}} onClick={()=>setShowPass(!showPass)}>{showPass?'Hide Password':'show Password'}</button>
        </div>
        <div>
          <label>City : </label> <span>{(data as EmployeeData).city}</span>
        </div>
        <div>
          <label>Landmark : </label> <span>{(data as EmployeeData).landmark}</span>
        </div>
        <div>
          <label>Pin code : </label> <span>{(data as EmployeeData).pincode}</span>
        </div>
      </Container>
      <div className='detailbtncontainer'>
        <Button startIcon={<EditIcon />} onClick={() => { navigate(`/edit/${id}`, { state: { data: data } }) }} color='primary' variant='outlined'>
          Edit
        </Button>
        <Button startIcon={<DeleteIcon />} onClick={() => { deleteData((data as EmployeeData).id); navigate('/listing'); }} color='secondary' variant='outlined'>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default EmpDetails;
