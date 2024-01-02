import React, { useContext, ChangeEvent } from 'react';
import { Button, TextField } from '@mui/material';
import { multiStepContext } from './StepContext';
import axios from 'axios';

const ThirdStep: React.FC = () => {
  const { setCurrentStep, userData, setUserData, submitData } = useContext(multiStepContext);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevUserData: any) => ({ ...prevUserData, [name]: value }));
  };

  return (
    <div className='app-header'>
      <div style={{ width: '70%' }}>
        <TextField
          label="City"
          margin='normal'
          fullWidth
          value={userData?.city}
          onChange={(e: any) => handleInputChange(e)}
          variant='outlined'
          color='secondary'
          name='city'
        />
      </div>
      <div style={{ width: '70%' }}>
        <TextField
          label="Landmark"
          margin='normal'
          fullWidth
          value={userData?.landmark}
          onChange={(e: any) => handleInputChange(e)}
          variant='outlined'
          color='secondary'
          name='landmark'
        />
      </div>
      <div style={{ width: '70%' }}>
        <TextField
          label="Postal Code"
          type='number'
          margin='normal'
          fullWidth
          value={userData?.pincode}
          onChange={(e: any) => handleInputChange(e)}
          variant='outlined'
          color='secondary'
          name='pincode'
        />
      </div>
      <div style={{ display: 'flex', gap: '10px', width: '70%' }}>
        <Button variant='contained' onClick={() => {
          setCurrentStep(2)
        }} color='secondary'>
          Back
        </Button>
        <Button variant='contained' onClick={() => {
          submitData()
        }} color='primary'>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default ThirdStep;
