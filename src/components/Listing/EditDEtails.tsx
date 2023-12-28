import { Button, TextField } from '@material-ui/core';
import React, { useContext } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { multiStepContext } from '../Register/StepContext';

const EditDetails: React.FC = () => {
  const { editData, setUserData } = useContext(multiStepContext);
  const { id } = useParams();

  const location = useLocation();
  const dataObject = location.state && location.state.data;


  // console.log(dataObject);

  // const handleUpdate = (e: any) => {
  //   setUserData((prev: any) => {
  //     return { ...prev, [e.defaultValue]: e.target.value }
  //   })
  // }
  
  const handleUpdate = (e: any) => {
    e.preventDefault();
    editData(id)
  }

  return (
    <>
      <Link to={'/listing'} style={{ textDecoration: 'none', fontSize: '30px', marginLeft: '100px' }}>
        <FaArrowLeft />
      </Link>
      <h1 style={{ textAlign: 'center' }}>
        Update Data for ID : <span style={{ color: 'red' }}>{id}</span>{' '}
      </h1>
      <form action="" onSubmit={handleUpdate}>

        <div style={{ height: '400px', width: '60%', margin: 'auto', overflowY: 'auto', boxShadow: '1px 1px 10px ' }} className='app-header'>
          <div style={{ width: '70%' }}>
            <TextField fullWidth={true}  label={`FirstName - ${dataObject?.firstname}`} required onChange={(e) => { setUserData((prevData: any) => ({ ...prevData, "firstname": e.target.value })) }} margin='normal' variant='outlined' color='secondary' />
          </div>
          <div style={{ width: '70%' }}>
            <TextField fullWidth={true} required label={`LastName - ${dataObject?.lastname}`} margin='normal' onChange={(e) => { setUserData((prevData: any) => ({ ...prevData, "lastname": e.target.value })) }} variant='outlined' color='secondary' />
          </div>
          <div style={{ width: '70%' }}>
            <TextField fullWidth required type='number' label={`Contact - ${dataObject?.contact}`} onChange={(e) => { setUserData((prevData: any) => ({ ...prevData, "contact": e.target.value })) }} margin='normal' variant='outlined' color='secondary' />
          </div>
          <div style={{ width: '70%' }}>
            <TextField fullWidth required type='email' label={`Email - ${dataObject?.email}`} onChange={(e) => { setUserData((prevData: any) => ({ ...prevData, "email": e.target.value })) }} margin='normal' variant='outlined' color='secondary' />
          </div>
          <div style={{ width: '70%' }}>
            <TextField fullWidth required  margin='normal' label={`Country - ${dataObject?.country}`} onChange={(e) => { setUserData((prevData: any) => ({ ...prevData, "country": e.target.value })) }} variant='outlined' color='secondary' />
          </div>
          <div style={{ width: '70%' }}>
            <TextField margin='normal' required fullWidth label={`City - ${dataObject?.city}`} onChange={(e) => { setUserData((prevData: any) => ({ ...prevData, "city": e.target.value })) }} variant='outlined' color='secondary' />
          </div>
          <div style={{ width: '70%' }}>
            <TextField margin='normal' required fullWidth label={`Landmark - ${dataObject?.landmark}`} onChange={(e) => { setUserData((prevData: any) => ({ ...prevData, "landmark": e.target.value })) }} variant='outlined' color='secondary' />
          </div>
          <div style={{ width: '70%' }}>
            <TextField margin='normal' type='password' required fullWidth label={`Password - ${dataObject?.password}`} onChange={(e) => { setUserData((prevData: any) => ({ ...prevData, "password": e.target.value })) }} variant='outlined' color='secondary' />
          </div>
          <div style={{ width: '70%' }}>
            <TextField margin='normal' type='number' required fullWidth label={`Pincode - ${dataObject?.pincode}`} onChange={(e) => { setUserData((prevData: any) => ({ ...prevData, "pincode": e.target.value })) }} variant='outlined' color='secondary' />
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px', width: '50%', margin: 'auto', marginTop: '20px' }}>
          <Button variant='contained' type='submit' color='primary'>
            Update
          </Button>
        </div>
      </form>
    </>
  );
};

export default EditDetails;
