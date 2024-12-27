import React, { useState } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Button, Divider, FormControl, FormLabel, Paper, Radio, RadioGroup } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getPosts, getPostsBySearch } from '../../../actions/postActions';
import './SearchPosts.css'

const SearchPosts = () => {
  const [year,setYear] = useState("FE");
  const [branch,setBranch] = useState("CE");
  const [semester,setSemester] = useState("odd");

  const navigate = useNavigate();//to navigate to different locations
  const dispatch = useDispatch()

  const searchPost = () => {
    if(year || branch || semester){ //if search button is clicked and theres something entered in tags or search box
      dispatch(getPostsBySearch({year,branch,semester},navigate));//pasiing the parameters newwded //everything sent is a string
      navigate(`/books/search?year=${year || 'none'}&branch=${branch || 'none'}&semester=${semester || 'none'}`);
    }else{
      navigate(`/books/search`)
    }
  }

  const setTheYear = (e) => {
    setYear(e.target.value);
  }

  const setTheBranch = (e) => {
    setBranch(e.target.value);
  }

  const setTheSemester = (e) => {
    setSemester(e.target.value);
  }

  const searchByTags = () => {
    searchPost();
  }

  const reset = async() => {
    setYear("FE");setBranch("CE");setSemester("odd");
    await dispatch(getPosts());
  }

  return (
    <div  style={{width:'100%'}}>
      <Paper elevation={3} className='searchPosts' style={{backgroundColor: '#fcdc77' ,marginTop:'1.5%',position:'fixed',borderRadius:'10px'}}>
        <label style={{fontSize:'24px',color:'black'}}>Year : </label>
        <div style={{marginTop:'4%',marginLeft:'5px'}} >
          <FormControl>
              <RadioGroup name='year' value={year} onChange={setTheYear}>
                <FormControlLabel value="FE" control={<Radio sx={{'&, &.Mui-checked': {color: 'black',},color:'black',pt:0.75}}/>} label="FIRST" />
                <FormControlLabel value="SE" control={<Radio sx={{'&, &.Mui-checked': {color: 'black',},color:'black',pt:0.75}}/>} label="SECOND" />
                <FormControlLabel value="TE" control={<Radio sx={{'&, &.Mui-checked': {color: 'black',},color:'black',pt:0.75}}/>} label="THIRD" />
                <FormControlLabel value="BE" control={<Radio sx={{'&, &.Mui-checked': {color: 'black',},color:'black',pt:0.75}}/>} label="FOURTH" />
              </RadioGroup>
          </FormControl>
        </div>
        <hr style={{width:'100%',border:'0.1px solid grey',margin:'5% 0 8% 0'}}/>
        {/* <Divider variant='middle' sx={{color:'black',borderBottomWidth:'2px'}}/> */}
        <label style={{fontSize:'24px'}}>Branch : </label>
        <div style={{marginTop:'5%'}}>
        <FormControl>
              <RadioGroup name='branch' value={branch}>
                <FormControlLabel value="CE" control={<Radio sx={{'&, &.Mui-checked': {color: 'black',},color:'black',pt:0.75}}/>} onChange={setTheBranch} label="CE" />
                <FormControlLabel value="IT" control={<Radio sx={{'&, &.Mui-checked': {color: 'black',},color:'black',pt:0.75}}/>} onChange={setTheBranch} label="IT" />
                <FormControlLabel value="EnTC" control={<Radio sx={{'&, &.Mui-checked': {color: 'black',},color:'black',pt:0.75}}/>} onChange={setTheBranch} label="EnTC" />
              </RadioGroup>
          </FormControl>
        </div>
        <hr style={{width:'100%',border:'0.1px solid grey',marginBottom:'10%',margin:'5% 0 8% 0'}}/>
        <label style={{fontSize:'24px'}}>Semester : </label>
        <div style={{marginTop:'5%'}}>
        <FormControl>
              <RadioGroup name='semester' value={semester}>
                <FormControlLabel value="odd" control={<Radio sx={{'&, &.Mui-checked': {color: 'black',},color:'black',pt:0.75}}/>} onChange={setTheSemester} label="ODD (1st)" />
                <FormControlLabel value="even" control={<Radio sx={{'&, &.Mui-checked': {color: 'black',},color:'black',pt:0.75}}/>} onChange={setTheSemester} label="EVEN (2nd)" />
              </RadioGroup>
          </FormControl>
        </div>
        <hr style={{width:'100%',border:'0.1px solid grey',marginBottom:'10%',margin:'5% 0 8% 0'}}/>
        <Button sx={{color:'black',backgroundColor:'#ffbf00',mt:'0%','&:hover':{backgroundColor:'#ffbf00'}}} variant='contained' onClick={searchByTags}>Search</Button>
        <Button sx={{color:'black',backgroundColor:'#ffbf00',mt:'0%',ml:'15px','&:hover':{backgroundColor:'#ffbf00'}}} variant='contained' onClick={reset}>Reset</Button>
      </Paper>
    </div>

  );
};

export default SearchPosts;