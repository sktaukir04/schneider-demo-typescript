import React, { useContext, useEffect, useState } from 'react'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom'
import { multiStepContext } from '../Register/StepContext';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [datas, setDatas] = useState([]);

  const { setIsLoggedIn,setUserData,setCurrentStep } = useContext(multiStepContext);

  useEffect(() => {
    sessionStorage.clear();
    setUserData([]);
    setCurrentStep(1)
  }, [])

  const validate = () => {
    let result = true;
    if (email === '' || email === null) {
      result = false;
      alert("Please enter Email or username")
    }
    if (password === "" || password === null) {
      result = false;
      alert("Please Enter password")
    }
    return result;
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (validate()) {
      try {
        const response = await fetch("http://localhost:3001/contacts/");
        const datas = await response.json();

        const user = datas.find((data: any) => data.email === email && data.password === password);

        if (user) {
          console.log("Success....!");
          sessionStorage.setItem('userData', JSON.stringify(user));
          setIsLoggedIn(true);
          navigate('/listing');
        } else {
          console.log("Not Found");
        }
      } catch (err:any) {
        console.error("Login Failed due to - ", err.message);
      }
    }
  }

  return (
    <div>
      <div className='maindiv'>

      </div>
      <div className="hero-content">
        <div className="leftside">
          <h1>mySchneider</h1>
          <p className='leftSide__text'>My Account. My personalized experience. mySchneider is your one destination which provides 24/7 access to all the content, software, tools, and services to help manage your business.</p>
        </div>
        <div className="rightside">
          <h3>Login or Register</h3>
          <form action="" onSubmit={handleSubmit}>
            <input type="text" placeholder='Email ' required value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <div className="rememberbox">
              <input type="checkbox" id='checkbox' />
              <label htmlFor="checkbox" style={{ whiteSpace: 'nowrap' }}>Remember me</label> &nbsp;
              <img src="https://secureidentity.schneider-electric.com/identity/resource/1698631876000/IDMSUIV1/image/Remembe-me-icon.svg" alt="" />
            </div><br />
            <button type='submit' className='nextbtn'>Next</button>
          </form>
          <p>or continue with</p>
          <a href="#" title='Schneider-Electric Employee Login' style={{ border: '0px solid black', width: 'fit-content', borderRadius: '50%', padding: '2px' }} ><img style={{ objectFit: 'contain', padding: '2px' }} src={'https://companieslogo.com/img/orig/SCHNEIDER.NS-499a33a2.png?t=1604232067'} width={'30px'} alt="logo" /></a>
          <div className='newText' style={{ fontWeight: 'bold' }}>New to Schneider Electric?</div>
          <button className='registerbtn' onClick={() => navigate('/register')}>Register</button><br />
          <p style={{ fontStyle: 'normal', color: 'gray', fontSize: '15px', marginTop: '5px' }}>We process account registration information and connection logs for authentication and application access management.</p>
          <Link to="#">Privacy notice</Link>
        </div>
      </div>
    </div>
  )
}

export default Login