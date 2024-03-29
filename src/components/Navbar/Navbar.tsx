import React, { useContext, useEffect } from 'react';
import './Navbar.css';
import { multiStepContext } from '../Register/StepContext';
import { Button, IconButton, Menu, MenuItem, Popover, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
const Navbar: React.FC = () => {
  const { currentUser, setCurrentUser, setIsLoggedIn, isLoggedIn } = useContext(multiStepContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const sessionVal = sessionStorage.getItem("userData");
    if (sessionVal) {
      try {
        const userData = JSON.parse(sessionVal);
        setCurrentUser(userData);
        setIsLoggedIn(true)
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    } else {
      console.log("No data found in sessionStorage");
      setIsLoggedIn(false);
      navigate('/')
    }
  }, [])
  return (
    <nav style={{ display: 'flex', alignItems: "center", justifyContent: 'space-between' }}>
      <img
        src="https://se.file.force.com/servlet/servlet.ImageServer?id=0158V00000Doiff&amp;oid=00DA0000000abSm"
        alt="Schneider logo"
      />

      <div>

        {
          isLoggedIn ? (
            <div style={{ display: 'flex', alignItems: 'center' }} title={currentUser?.firstname +" "+ currentUser?.lastname}>

              <Typography style={{ whiteSpace: 'nowrap', color: 'green', fontWeight: 'bold' }}> Welcome {currentUser?.firstname}</Typography>
              <IconButton style={{ width: '40px' }} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <AccountCircleIcon />
              </IconButton>

              <Popover
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
              >
                <MenuItem
                  style={{ color: 'red' }}
                  onClick={() => {
                    setIsLoggedIn(false);
                    navigate('/');
                    sessionStorage.removeItem("userData");
                  }}>Logout  &nbsp; <ExitToAppIcon /></MenuItem>
              </Popover>
            </div>
          ) : (
            <div ><Link style={{ textDecoration: 'none' }} to={'/'}><Typography style={{ marginRight: '20px' }}>Please Log In </Typography></Link></div>
          )
        }
      </div>
    </nav>
  );
};

export default Navbar;
