import React, { useContext, ChangeEvent } from 'react';
import { Button, TextField } from '@mui/material';
import { multiStepContext } from './StepContext';

const FirstStep = () => {
  const { setCurrentStep, userData, setUserData, isError, setIsError } = useContext(multiStepContext);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevUserData: any) => ({ ...prevUserData, id: Date.now(), [name]: value }));
  };

  return (
    <div className='app-header'>
      <div style={{ width: '70%' }}>
        <TextField
          error={typeof userData?.firstname === 'number'}
          label="First Name"
          fullWidth={true}
          value={userData?.firstname}
          helperText={typeof userData?.firstname === 'number' ? "Invalid firstname" : ""}
          required
          onChange={(e: any) => handleInputChange(e)}
          margin='normal'
          variant='outlined'
          color='secondary'
          name='firstname'
        />
      </div>
      <div style={{ width: '70%' }}>
        <TextField
          label="Last Name"
          fullWidth={true}
          value={userData?.lastname}
          margin='normal'
          onChange={(e: any) => handleInputChange(e)}
          variant='outlined'
          color='secondary'
          name='lastname'
        />
      </div>
      <div style={{ width: '70%' }}>
        <TextField
          label="Contact Number"
          type='number'
          fullWidth
          value={userData?.contact}
          onChange={(e: any) => handleInputChange(e)}
          margin='normal'
          variant='outlined'
          color='secondary'
          name='contact'
        />
      </div>
      <div style={{ width: '70%' }}>
        <Button variant='contained'
          disabled={!userData?.firstname || !userData?.lastname || !userData?.contact}
          onClick={() => {
            setCurrentStep(2);
          }
          }

          color='primary'>
          Next
        </Button>
      </div>
    </div>
  );
};

export default FirstStep;
