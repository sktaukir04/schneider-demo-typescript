import React, { useContext, ChangeEvent } from 'react';
import { Button, TextField } from '@material-ui/core';
import { multiStepContext } from './StepContext';

const SecondStep: React.FC = () => {
  const { setCurrentStep, userData, setUserData } = useContext(multiStepContext);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevUserData:any) => ({ ...prevUserData, [name]: value }));
  };

  return (
    <div className='app-header'>
      <div style={{ width: '70%' }}>
        <TextField
          label="Email Address"
          fullWidth
          value={userData?.email}
          onChange={(e:any) => handleInputChange(e)}
          margin='normal'
          variant='outlined'
          color='secondary'
          name='email'
        />
      </div>
      <div style={{ width: '70%' }}>
        <TextField
          label="Country"
          fullWidth
          margin='normal'
          value={userData?.country}
          onChange={(e:any) => handleInputChange(e)}
          variant='outlined'
          color='secondary'
          name='country'
        />
      </div>
      <div style={{ width: '70%' }}>
        <TextField
          label="password"
          fullWidth
          type='password'
          margin='normal'
          value={userData?.password}
          onChange={(e:any) => handleInputChange(e)}
          variant='outlined'
          color='secondary'
          name='password'
        />
      </div>
      <div style={{ display: 'flex', gap: '10px', width: '70%' }}>
        <Button variant='contained' onClick={() => setCurrentStep(1)} color='secondary'>
          Back
        </Button>
        <Button variant='contained' onClick={() => setCurrentStep(3)} color='primary'>
          Next
        </Button>
      </div>
    </div>
  );
};

export default SecondStep;
