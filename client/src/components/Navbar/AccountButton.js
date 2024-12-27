import React, { useState ,useEffect} from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import decode from 'jwt-decode';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import './Navbar.css'
import { useLocation, useNavigate } from 'react-router-dom';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { Tooltip } from '@mui/material';

const AccountButton = () => {
  const navigate = useNavigate();
  const user1 = useSelector(state=>state.auth.authData)
  const [user,setUser] = useState(user1);
  const location = useLocation();
  const dispatch = useDispatch();
  
  const logoutHandler = () => {
    
    localStorage.clear();
    dispatch({type:"LOGOUT"});
    navigate('/auth')
  }

  useEffect(()=>{
    setUser(JSON.parse(localStorage.getItem('profile')));//
    //it convers the string into JS object and sets it as a user
    const token = user?.token;
    
    if(token){
      const decoded_token = decode(token);
      if((decoded_token.exp*1000)<(new Date().getTime())){//exp time is in milisecond thats why multiplying by 1000
        logoutHandler();//if token has expired we are logging out of the system
      }
    }
  },[location])

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if(!user?.token){
    return (
      (<Button  sx={{color:'black',backgroundColor:'#ffbf00'}} variant='outlined' onClick={()=>{navigate('/auth')}}> Sign In</Button>)
    )
  }

  return (
    <div>
      <Tooltip title={`${user?.user?.firstname} ${user?.user?.lastname}`}>
      <Button sx={{color:'black',backgroundColor:'#ffbf00'}} variant='outlined'
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        // endIcon={<KeyboardArrowDownIcon/>}
      >
        Account
      </Button>
      </Tooltip>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        >
        <MenuItem onClick={()=>{navigate('/mybooks');handleClose()}}><LibraryBooksOutlinedIcon sx={{mr:1.7}}/> My Posts</MenuItem>
        <MenuItem onClick={()=>{logoutHandler(); handleClose()}}><ExitToAppIcon sx={{mr:1.7}}/> Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default AccountButton;
