import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Snackbar } from '@material-ui/core';

interface UserData {
  firstname: string;
  lastname: string;
  email: string;
  country: string;
  city: string;
  landmark: string;
  pincode: number|string;
  contact: string;
  password: string;
}

interface MultiStepContext {
  currentStep: number;
  setCurrentStep: any;
  userData: UserData | undefined;
  setUserData: React.Dispatch<React.SetStateAction<UserData>> | any;
  finalData: UserData[];
  setFinalData: React.Dispatch<React.SetStateAction<UserData[]>>;
  editData: any;
  deleteData: (id: number) => void;
  submitData: () => any;
  isError:boolean;
  setIsError:any;
  isLoggedIn: boolean;
  setIsLoggedIn: any;
  currentUser:any,
  setCurrentUser:any
  authData: any;
  setAuthData: () => any;
  modalData:any;
  setModalData:any;
}
type HeadingProp = {
  children: React.ReactNode;
}

export const multiStepContext = createContext<MultiStepContext>({} as MultiStepContext);

const StepContext = (props: HeadingProp) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState<UserData>();
  const [finalData, setFinalData] = useState<UserData[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean);
  const [authData, setAUthData] = useState<UserData[]>();
  const [allData, setAllDAta] = useState([])
  const [isError,setIsError]=useState(false);
  const [currentUser,setCurrentUser]=useState<UserData>();
  const [modalData,setModalData]=useState({});

  const editData = (id: number) => {
    // console.log(userData);     
    if (modalData) {
      axios
        .put(`http://localhost:3001/contacts/${id}`, modalData)
        .then((res) => {
          alert('Updated Successfully...!');
          navigate('/listing');
          window.location.reload();
        })
        .catch((err) => console.log(err));
    } else {
      alert('Please fill in the details');
    }
  };

  const deleteData = (id: number) => {
    if (window.confirm('Do you want to Delete ?')) {
      fetch(`http://localhost:3001/contacts/${id}`, {
        method: 'DELETE',
      })
        .then((data) => alert('Removed Successfully'+data))
        .catch((err) => {
          console.log(err);
          window.location.reload();
          navigate('/listing');
        });
    } else {
      // Do nothing on cancel
    }
  };


  const fetchAllData: any = async () => {
    return await fetch('http://localhost:3001/contacts')
      .then((res) => res.json()).then((data) => setAllDAta(data))
      .catch((err) => console.log(err));
  }

  async function submitData() {
    try {
      if (userData?.firstname && userData.email && userData.password) {
        var alreadyExists = false;
        fetch('http://localhost:3001/contacts')
          .then((res) => res.json()).then((datas) => {
            datas.forEach((data: any) => {
              if (data.email===userData.email) {
                alreadyExists = true;
                alert("Email Already Exists")
              } else {
                sessionStorage.setItem('email', userData.email);
                if (!alreadyExists) {
                  console.log(alreadyExists);
                  axios.post('http://localhost:3001/contacts', userData).catch((err)=>console.log("You have a new Error : "+err)
                  );
                  sessionStorage.setItem('email', userData.email)
                  setUserData({ firstname: '', lastname: '', email: '', country: '', city: '', landmark: '', pincode: '', contact: '', password: '' });
                  setCurrentStep(1);
                  navigate("/success");
                  <Snackbar open={true}/>
                  // window.location.reload();
                }
              }
            });
          })
      } else {
        window.alert("Please enter all the fields..!");
      }
    } catch (error) {
      console.error(error);
    }
  }

  const contextValue: MultiStepContext = {
    currentStep,
    setCurrentStep,
    userData,
    setUserData,
    finalData,
    setFinalData,
    editData,
    deleteData,
    submitData,
    isLoggedIn,
    setIsLoggedIn,
    isError,
    setIsError,
    authData,
    currentUser,
    modalData,
    setModalData,
    setCurrentUser,
    setAuthData: function () {
      throw new Error('Function not implemented.');
    }
  };

  return <multiStepContext.Provider value={contextValue}>{props.children}</multiStepContext.Provider>;
};

export default StepContext;
