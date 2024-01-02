import React, { useContext } from 'react'
import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import ThirdStep from './ThirdStep';
import { Stepper, StepLabel, Step, Paper } from '@mui/material';
import { multiStepContext } from './StepContext';
import './Register.css'
import { Link } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
const Register = () => {
    const { currentStep } = useContext(multiStepContext);

    const showStep = (step: number) => {
        switch (step) {
            case 1:
                return <FirstStep />
            case 2:
                return <SecondStep />
            case 3:
                return <ThirdStep />
            default:
                break;
        }
    }

    return (
        <div className='app-header'>
            <Paper elevation={5} style={{ width: "800px", marginBottom: '20px', marginTop: '20px', padding: '20px' }}>
                <Paper style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
                    <Link to={'/'} style={{ textDecoration: 'none' }}><ArrowBack /> </Link>
                    <h3 style={{ color: 'green', textAlign: 'center', margin: 'auto', textDecoration: 'underline' }}>Registration Form</h3>
                </Paper>
                <div className="center-stepper" >
                    <Stepper style={{ width: '90%' }} activeStep={currentStep - 1} orientation='horizontal'>
                        <Step>
                            <StepLabel>Personal Info</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Email</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Address</StepLabel>
                        </Step>
                    </Stepper>
                </div>
                <div className='main_form'>

                    {showStep(currentStep)}
                </div>
            </Paper>
        </div>
    )
}

export default Register