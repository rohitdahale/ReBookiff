import React from "react";
import "./LandingPage.css";
import landing_page_girl from "../../images/bg_overlay_4.png";
import { Button, Typography } from "@mui/material";
import StoreIcon from '@mui/icons-material/Store';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const LandingPage = () => {
  const user = useSelector(state=>state.auth.authData)

  const navigate = useNavigate();

  const handleClick = () => {
    if(user){
      navigate('/form');
    }else{
      navigate('/auth');
    }
  }
  return (
    <div className="main_container">
      <div className="left_container">
        <Typography
          color="#333333"
          textAlign="start"
          fontFamily={"Open Sans, sans-serif"}
          fontSize={50}
          fontWeight={700}
          marginTop={0}
          gutterBottom
        >
          BUY AND SELL <br/>
          UNIVERSITY BOOKS
          {/* BUY AND SELL YOUR BOOKS FOR BEST PRICE */}
        </Typography>
        <Typography color="#555555" textAlign="start">
          Your one-stop platform for affordable,
          second-hand University Textbooks. Connect with fellow students, buy and sell with
          ease. Join us today and save money on your college textbooks!
        </Typography>
        <div className="landButtons">
          <Button
            variant="outlined"
            sx={{
              px: "5px",
              py: "8px",
              // boxShadow: "0.5px 0.5px 0.5px 0.5px #8a795d",
              backgroundColor: "#ffbf00",
              color: "black",
              mt: "5%",
              background: "transperant",
              borderRadius: "8px",
              width:"25%"
            }}
            onClick={() => {
              navigate("/books");
            }}
          >
            <StoreIcon sx={{mr:"6px",fontSize:25}}/> 
            <Typography  fontSize={15} fontWeight={500}>
              BookStore
            </Typography>
          </Button>
          <Button
            variant="outlined"
            sx={{
              px: "5px",
              py: "8px",
              // boxShadow: "0.5px 0.5px 0.5px 0.5px #8a795d",
              backgroundColor: "#ffbf00",
              color: "black",
              mt: "5%",
              background: "transperant",
              borderRadius: "8px",
              width:"26.5%"
            }}
            onClick={handleClick}
          >
            {!user?.token ? <LockOpenIcon sx={{mr:"7px"}}/> : <LibraryBooksIcon sx={{mr:"6px"}}/>}
            <Typography fontSize={15} fontWeight={500}>
              {!user?.token ? `Sign In` : `Sell Books`}
            </Typography>
          </Button>
        </div>
      </div>
      <div>
        <img className="right_container" src={landing_page_girl} width={530} />
      </div>
    </div>
  );
};

export default LandingPage;
