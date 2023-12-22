import { Box, Button, TextField } from '@material-ui/core';
import React, { useContext } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';
import { multiStepContext } from '../Register/StepContext';

const EditDetails: React.FC = () => {
  const { editData, userData, setUserData } = useContext(multiStepContext);
  const { id } = useParams();

  const location = useLocation();
  const dataObject = location.state && location.state.data;
  console.log(dataObject);

  const handleUpdate = (e: any) => {
    setUserData((prev: any) => {
      return { ...prev, [e.defaultValue]: e.target.value }
    })
  }

  return (
    <>
      <Link to={'/listing'} style={{ textDecoration: 'none', fontSize: '30px', marginLeft: '100px' }}>
        <FaArrowLeft />
      </Link>
      <h1 style={{ textAlign: 'center' }}>
        Update Data for ID : <span style={{ color: 'red' }}>{id}</span>{' '}
      </h1>
      <div style={{ height: '400px', width: '60%', margin: 'auto', overflowY: 'auto', boxShadow: '1px 1px 10px ' }} className='app-header'>
        <div style={{ width: '70%' }}>
          <TextField label="First Name" fullWidth={true} defaultValue={dataObject?.firstname} required onChange={(e) => { setUserData((prevData: any) => ({ ...prevData, "firstname": e.target.value })) }} margin='normal' variant='outlined' color='secondary' />
        </div>
        <div style={{ width: '70%' }}>
          <TextField label="Last Name" fullWidth={true} defaultValue={dataObject?.lastname} margin='normal' onChange={(e) => { setUserData((prevData: any) => ({ ...prevData, "lastname": e.target.value })) }} variant='outlined' color='secondary' />
        </div>
        <div style={{ width: '70%' }}>
          <TextField label="Contact Number" fullWidth defaultValue={dataObject?.contact} onChange={(e) => { setUserData((prevData: any) => ({ ...prevData, "contact": e.target.value })) }} margin='normal' variant='outlined' color='secondary' />
        </div>
        <div style={{ width: '70%' }}>
          <TextField label="Email Address" fullWidth defaultValue={dataObject?.email} onChange={(e) => { setUserData((prevData: any) => ({ ...prevData, "email": e.target.value })) }} margin='normal' variant='outlined' color='secondary' />
        </div>
        <div style={{ width: '70%' }}>
          <TextField label="Country" fullWidth margin='normal' defaultValue={dataObject?.country} onChange={(e) => { setUserData((prevData: any) => ({ ...prevData, "country": e.target.value })) }} variant='outlined' color='secondary' />
        </div>
        <div style={{ width: '70%' }}>
          <TextField label="City" margin='normal' fullWidth defaultValue={dataObject?.city} onChange={(e) => { setUserData((prevData: any) => ({ ...prevData, "city": e.target.value })) }} variant='outlined' color='secondary' />
        </div>
        <div style={{ width: '70%' }}>
          <TextField label="Landmark" margin='normal' fullWidth defaultValue={dataObject?.landmark} onChange={(e) => { setUserData((prevData: any) => ({ ...prevData, "landmark": e.target.value })) }} variant='outlined' color='secondary' />
        </div>
        <div style={{ width: '70%' }}>
          <TextField label="Password" margin='normal' fullWidth defaultValue={dataObject?.password} onChange={(e) => { setUserData((prevData: any) => ({ ...prevData, "password": e.target.value })) }} variant='outlined' color='secondary' />
        </div>
        <div style={{ width: '70%' }}>
          <TextField label="Postal Code" margin='normal' fullWidth defaultValue={dataObject?.pincode} onChange={(e) => { setUserData((prevData: any) => ({ ...prevData, "pincode": e.target.value })) }} variant='outlined' color='secondary' />
        </div>
      </div>
      <div style={{ display: 'flex', gap: '10px', width: '50%', margin: 'auto', marginTop: '20px' }}>
        <Button variant='contained' onClick={() => editData(id)} color='primary'>
          Update
        </Button>
      </div>
    </>
  );
};

export default EditDetails;
