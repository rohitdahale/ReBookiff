import React, { useState } from "react";
import {useDispatch, useSelector} from 'react-redux'
import "./Auth.css";
import logo from '../../images/logo.png'
import { logIn , signUp } from "../../actions/authActions";
import { Alert, Button, CircularProgress, Input, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import GoogleIcon from '@mui/icons-material/Google';
import LockOpenIcon from '@mui/icons-material/LockOpen';

function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [confirmPass,setConfirmPass] = useState(true)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user  = JSON.parse(localStorage.getItem('profile')); 
  const {errorMessage , isLoadingTrue} = useSelector((state)=> state?.auth);

  const [authData, setAuthData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

   const handleChange = (e) => {
    setAuthData({ ...authData, [e.target.name]: e.target.value });
  };
  
  const ToggleLogin = (e) => {
    e.preventDefault();
    setIsSignUp(!isSignUp);
    resetForm();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(isSignUp){
      (authData.password === authData.confirmpassword) ? dispatch(signUp(authData,navigate)) : setConfirmPass(false);
    }else{
      dispatch(logIn(authData,navigate));
    }
  }

  const resetForm = () => {
    setConfirmPass(true);
    setAuthData({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmpassword: "",
    });
  }

  if(isLoadingTrue) return (<div className='progress'><CircularProgress size='4em'/></div>)

  return (
    <div className="Auth">
      <div>
        <img src={logo} style={{height:'150px',width:'150px'}}/>
      </div>

      <div className="a-left">
        <div className="Webname">
          <h1 style={{fontSize:'60px',color:'#333333'}}>UniBooks</h1>
          <h2>&nbsp;Use it, resale it</h2>
        </div>
      </div>

      <div className="a-right">
        <form className="infoForm authForm" onSubmit={handleSubmit}>
          <h2 className="webname">{isSignUp ? `Sign Up` : `Log In`}</h2>

          {errorMessage?.length && <Alert severity="warning" style={{marginTop:'10px',width:'90%'}}>{errorMessage}</Alert>}

          {isSignUp && (
            <div>
              <input
                type="text"
                placeholder="First Name"
                className="infoInput"
                name="firstname"
                onChange={handleChange}
                value={authData.firstname}
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                className="infoInput"
                name="lastname"
                onChange={handleChange}
                value={authData.lastname}
                required
              />
            </div>
          )}

          <div>
            <input
              type="email"
              placeholder="Email"
              className="infoInput"
              name="email"
              onChange={handleChange}
              value={authData.email}
              required
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className="infoInput"
              name="password"
              onChange={handleChange}
              value={authData.password}
              required
            />
            {isSignUp && (
              <input
                type="password"
                placeholder="Confirm Password"
                className="infoInput"
                name="confirmpassword"
                onChange={handleChange}
                value={authData.confirmpassword}
                required
              />
            )}
          </div>
          <span
            style={{
              color: "black",
              fontSize: "12px",
              alignSelf: "flex-end",
              marginRight: "5px",
              display: confirmPass ? "none" : "block",
            }}
          >
            *Confirm password is not same
          </span>
          <Button  type='submit' fullWidth variant='contained' style={{ backgroundColor:'#ffbf00',color:'black',border: "2px solid #ffbf00;", marginTop:'15px'}}>
            <LockOpenIcon sx={{mr:'10px'}}/>{isSignUp ? 'Sign Up' : 'Log In'}
          </Button>
          {/* <Button fullWidth variant='contained' style={{ backgroundColor:'#ffbf00',color:'black',border: "2px solid #ffbf00;", marginTop:'-15px'}}>
            <GoogleIcon sx={{mr:'10px'}}/>{isSignUp ? 'Sign Up With Google' : 'Sign In With Google'}
          </Button> */}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
             <Button onClick={ToggleLogin} sx={{marginTop:'-10px'}}>
                {isSignUp ? 'Already have an account ? sign In' : `Don't have an account ? Sign Up`}
              </Button>
            </div>
        </form>
      </div>
    </div>
  );
}

export default Auth;
