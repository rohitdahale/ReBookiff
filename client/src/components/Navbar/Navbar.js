import { AppBar, Button, Divider, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import decode from 'jwt-decode';
import './Navbar.css'
import logo from '../../images/logo.png'
import AccountButton from './AccountButton';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const user = useSelector(state=>state.auth.authData)
  const navigate = useNavigate();
  return (
    <>
    <div style={{position:'fixed',zIndex:'2',width:'92rem'}}>
    <AppBar elevation={0} position="static" color='inherit' sx={{borderRadius:2 ,px:1,pt:2,pb:0}} style={{display:'flex',flexDirection:'row',justifyContent:'space-between',backgroundColor:'#fffdf7'}}>

    <div>
      <Link to='/' style={{display:'flex',alignItems:'center',textDecoration:'none',color:'black'}}>
      <img className='image' src={logo} alt='pict_logo' height="60px" style={{margin:'5px 15px',border:'0px'}}></img>
      <Typography fontFamily={"Merriweather"} sx={{fontSize:'49px',fontWeight:'bold',letterSpacing:'2px'}} align='center'>ReBookify</Typography>
      {/* <span className='smiley-face' fontFamily={"Merriweather"} style={{fontSize:'55px',fontWeight:'bold',letterSpacing:'2px',transform:'rotate(90deg',marginTop:'100px',marginLeft:'-110px'}}>)</span> */}
      </Link>
    </div>
    
      <div style={{ display:'flex',flexDirection:'row',justifyContent:'flex-end',gap:35,height:'100%',margin:'auto 5px auto 50px'}}>
        <Button  sx={{color:'black',backgroundColor:'#ffbf00'}} variant='outlined' onClick={()=>{navigate('/')}}> Home</Button>
        <Button  sx={{color:'black',backgroundColor:'#ffbf00 '}} variant='outlined' onClick={()=>{navigate('/books')}}> Book Store</Button>
        <Button  sx={{color:'black',backgroundColor:'#ffbf00'}} variant='outlined' onClick={()=>{navigate('/form')}}> Form</Button>
        <Button  sx={{color:'black',backgroundColor:'#ffbf00'}} variant='outlined' onClick={()=>{navigate('/chat')}}> chat</Button>
        <Button  sx={{color:'black',backgroundColor:'#ffbf00'}} variant='outlined' onClick={()=>{navigate('/savedBooks')}}> saved books</Button>
        <AccountButton key={user?.token}/>
      </div>
    </AppBar>
    <Divider variant='middle' sx={{color:'black',borderBottomWidth:'2px'}}/>
    </div>
    <div style={{height:'110px',width:'100px'}}> </div>
    </>
  );
};

export default Navbar;