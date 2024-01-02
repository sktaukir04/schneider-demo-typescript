import React, { useContext, ChangeEvent, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { multiStepContext } from './StepContext';

const SecondStep: React.FC = () => {
  const { setCurrentStep, userData, setUserData } = useContext(multiStepContext);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState(false)
  const [isValidEmailFormat,setISValidEmailFormat]=useState(false);




  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevUserData: any) => ({ ...prevUserData, [name]: value }));
  };

  let emailTimeout: NodeJS.Timeout;
  const checkEmailExits = async (email: any) => {
    try {
      clearInterval(emailTimeout);
      if (!isValidFormat(email)) {
        setEmailError(true)
        setISValidEmailFormat(true);
      }
      setTimeout(async () => {
        const datas = await fetch("http://localhost:3001/contacts").then((res) => res.json());
        const checkIfExists = datas.some((data: any) => data.email === email);
        setEmailError(checkIfExists);
        console.log(checkIfExists);
      }, 1500);

    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const isValidFormat = (email: string) => {
    const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailFormat.test(email);
  }

  const checkValidPassword = (password: string) => {
    const isValidPassword = password.length > 8 && /^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]+$/.test(password);
    setPasswordError(!isValidPassword);
  };


  return (
    <div className='app-header'>
      <div style={{ width: '70%' }}>
        <TextField
          label="Email Address"
          fullWidth
          value={userData?.email}
          onChange={(e: any) => {
            handleInputChange(e);
            checkEmailExits(e.target.value)
          }
          }
          margin='normal'
          variant='outlined'
          color='secondary'
          name='email'
          error={emailError}
          helperText={
            emailError
              ? "Email Already Exists"
              : isValidEmailFormat
              ? "Invalid Email Format"
              : ""
          }
                  />
      </div>
      <div style={{ width: '70%' }}>
        <TextField
          label="Country"
          fullWidth
          margin='normal'
          value={userData?.country}
          onChange={(e: any) => handleInputChange(e)}
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
          onChange={(e: any) => {
            handleInputChange(e);
            checkValidPassword(e.target.value)
          }}
          error={passwordError}
          helperText={passwordError ? "Password too short" : ""}
          variant='outlined'
          color='secondary'
          name='password'
        />
      </div>
      <div style={{ display: 'flex', gap: '10px', width: '70%' }}>
        <Button variant='contained' onClick={() => setCurrentStep(1)} color='secondary'>
          Back
        </Button>
        <Button
          variant='contained'
          disabled={(emailError || passwordError || !userData?.email || !userData?.password)}
          onClick={() => {
            if (!emailError && !passwordError && userData?.password && userData?.email) {
              setCurrentStep(3);
            }
          }}
          color='primary'
        >
          Next
        </Button>

      </div>
    </div>
  );
};

export default SecondStep;
