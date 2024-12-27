import React, { useEffect, useState } from 'react';
import {Button, FormControl, FormControlLabel, InputLabel, MenuItem, Paper, Radio, RadioGroup, Select, TextField, Tooltip, Typography, useMediaQuery} from '@mui/material'
import {useDispatch, useSelector} from 'react-redux'
// import {useNavigate} from 'react-router-dom'
import {createPost, getPosts, updatePost} from '../../actions/postActions'
import { UseMediaQuery } from '@mui/material';
import FileBase from 'react-file-base64';
import './form.css'
import { useNavigate } from 'react-router-dom';
import BookComponent from './BookComponent';
import { FormHelperText } from '@mui/material';

const Form = ({currentId,setCurrentId}) => {
  
  const user  = JSON.parse(localStorage.getItem('profile'));
  const seller_name = `${user?.user?.firstname} ${user?.user?.lastname}`;
  const [postData,setPostData] = useState({college: "", year: "", branch:"", semester:"",original_price:"", resale_price: "", fix_nego: "", books_stack:"",
                                            book1:"",book1_pub:"",book1_img:"",book2:"",book2_pub:"",book2_img:"",book3:"",book3_pub:"",book3_img:"",book4:"",book4_pub:"",book4_img:"",book5:"",book5_pub:"",book5_img:"",
                                            whatsapp_number:"",seller_name:`${seller_name}`});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const post = useSelector((state) => currentId ?  state?.posts?.find((p)=>p._id === currentId) : null)

  const isMobileScreen = useMediaQuery('(max-width:600px)');

  // const isNotFilled = !postData.year || !postData.branch || !postData.semester || !postData.resale_price || !postData.original_price ||!postData.book1 ||!postData.book1_pub ||postData.books_stack;
  
  const handleSubmit = (e) => {
      e.preventDefault();
      if(currentId===0){
        dispatch(createPost(postData,navigate));
        clear();
      }else{
        dispatch(updatePost(currentId,postData,navigate));
        clear();
      }
  }
  const clear = () => {
    setCurrentId(0);
    setPostData({college: "", year: "", branch:"", semester:"",original_price:"", resale_price: "", fix_nego: "", books_stack:"",
    book1:"",book1_pub:"",book1_img:"",book2:"",book2_pub:"",book2_img:"",book3:"",book3_pub:"",book3_img:"",book4:"",book4_pub:"",book4_img:"",book5:"",book5_pub:"",book5_img:"",whatsapp_number:""})
  }

  const handleTextChange = (e, bookName) => {
    setPostData({ ...postData, [bookName]: e.target.value });
  };

  const handlePubChange = (e, bookName) => {
    setPostData({ ...postData, [`${bookName}_pub`]: e.target.value });
  };

  const handleImgDone = ({ base64 }, bookName) => {
    setPostData({ ...postData, [`${bookName}_img`]: base64 });
  };

  useEffect(()=>{
    if(post) {setPostData(post);}
  },[post])

  const isNotFilled = !postData.year || !postData.branch || !postData.semester || !postData.resale_price || !postData.original_price ||!postData.book1 ||!postData.book1_pub || !postData.books_stack;


  if(!user){
    return(
      <Paper elevation={5} className='paper' sx={{backgroundColor:'#fcda71',py:1,width:'50%',height:'50%',marginTop:'2%',marginX:'auto'}}>
        <Typography variant='h6' align='center'>
          Please sign in to <br/>
           fill the form <br/>
        </Typography>
      </Paper>
    )
  }

  return (
    <Paper className='paper' style={{padding: '10px 50px',margin:'30px 10% 2% 10%',borderRadius:'15px'}} elevation={4}>
      <form style={{marginTop:'12px'}} autoComplete="off" noValidate className='form' onSubmit={handleSubmit}>
        <Typography fontSize={28} align='center' sx={{fontWeight:'bold'}}>{!currentId ? `Books selling Form` : `Editing Book Post`}</Typography>

        <FormControl fullWidth sx={{mb:2,mt:2}} required={true}>
          <InputLabel id="college-name">College name</InputLabel>
            <Select
              labelId="college-name"
              value={postData.college}
              label="College name"
              onChange={(e)=> setPostData({...postData, college : e.target.value })}
              required={true}
            >
            <MenuItem value={'MIT Academy Of Engineering'}>MIT Academy of Engineering</MenuItem>
            <MenuItem value={'MIT Arts and Commerce'}>MIT Arts and Commerce</MenuItem>
          </Select>
          </FormControl>
          <div style={{display:'flex',justifyContent:'space-between'}}>
          <FormControl sx={{width:1/4}} required>
          <InputLabel id='year'>Year</InputLabel>
            <Select
              labelId="year"
              value={postData.year}
              label="year"
              onChange={(e)=> setPostData({...postData, year : e.target.value })}
              required
            >
            <MenuItem value={'FE'}>1st Year</MenuItem>
            <MenuItem value={'SE'}>2nd Year</MenuItem>
            <MenuItem value={'TE'}>3rd Year</MenuItem>
            <MenuItem value={'BE'}>4th Year</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{width:1/4}} required>
          <InputLabel id='branch'>Branch</InputLabel>
            <Select
              labelId="branch"
              value={postData.branch}
              label="branch"
              onChange={(e)=> setPostData({...postData, branch : e.target.value })}
            >
            <MenuItem value={'CE'}>Electronics and Telecommunication</MenuItem>
            <MenuItem value={'IT'}>Computer Engineering</MenuItem>
            <MenuItem value={'EnTC'}>Electronics</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{width:1/4}} required>
          <InputLabel id='semester'>Semester</InputLabel>
            <Select
              labelId="semester"
              value={postData.semester}
              label="semester"
              onChange={(e)=> setPostData({...postData, semester : e.target.value })}
            >
            <MenuItem value={'odd'}>Odd (1st)</MenuItem>
            <MenuItem value={'even'}>Even (2nd)</MenuItem>
          </Select>
        </FormControl>
        </div>

        <div style={{display:'flex',justifyContent:'space-between'}}>

          <TextField type='Number' name="original_price" variant="outlined" label="Original Price" fullWidth 
          value={postData.original_price} onChange={(e) => setPostData({ ...postData, original_price: e.target.value })} 
          sx={{width:1/4,mt:1}} required/>

          <TextField type='Number' name="resale_price" variant="outlined" label="Resale Price" fullWidth 
          value={postData.resale_price} onChange={(e) => setPostData({ ...postData, resale_price: e.target.value })} 
          sx={{width:1/4,mt:1}} required/>

          <FormControl style={{display:'flex',flexDirection:'row',justifyContaint:'space-between'}} sx={{width:1/4,mt:1}} required>
            <RadioGroup row name="fix_nego" 
              value={postData.fix_nego}
              onChange={(e)=>setPostData({...postData,fix_nego:e.target.value})}>
              <FormControlLabel value="fixed" control={<Radio sx={{'&, &.Mui-checked': {color: '#494F55'}}}/>} label="Fixed" />
              <FormControlLabel value="negotiable" control={<Radio sx={{'&, &.Mui-checked': {color: '#494F55'}}}/>} label="Negotiable" />
            </RadioGroup>
          </FormControl>
        </div>

        <div style={{display:'flex',width:'60%',justifyContent:'space-between'}}>
          <Typography sx={{mt:2.40,mr:2,fontSize:18,ml:1}}>Image of whole set of books to sell * :</Typography>
          <FileBase
            type='file'
            multiple={false}
            onDone = {({base64})=>{
              setPostData({...postData,books_stack:base64})
            }}/>
        </div>

          <Typography sx={{mt:2.40,mr:2,fontSize:18,ml:1}}>Books Information : </Typography>
          <div style={{display:'flex',justifyContent:'space-around'}}>
            <Typography sx={{mt:2.40,fontSize:18,mr:10}}>Book Name</Typography>
            <Typography sx={{mt:2.40,mr:2,fontSize:18,ml:1}}>Publication</Typography>
            <Typography sx={{mt:2.40,fontSize:18}}>Picture of Book</Typography>
          </div>
          <div>
          {[1, 2, 3, 4, 5].map((bookNum) => (
            <BookComponent
              key={bookNum}
              label={`Book ${bookNum}`}
              name={`book${bookNum}`}
              value={postData[`book${bookNum}`]}
              pubValue={postData[`book${bookNum}_pub`]}
              imgValue={postData[`book${bookNum}_img`]}
              onTextChange={(e) => handleTextChange(e, `book${bookNum}`)}
              onPubChange={(e) => handlePubChange(e, `book${bookNum}`)}
              onImgDone={(base64) => handleImgDone(base64, `book${bookNum}`)}
            />
            ))}
          </div>

          <Typography sx={{ml:'0.5rem', mt:'2%'}}> Whatsapp Number : </Typography>
          <TextField name="whatsapp_number" variant="outlined" label="whatsapp Number" fullWidth 
            value={postData.whatsapp_number} onChange={(e) => setPostData({ ...postData, whatsapp_number : e.target.value })} 
            sx={{width:1/4,mt:1}}/>
            <FormHelperText></FormHelperText>
            
            <Tooltip title={(isNotFilled) ? "Please fill all the necessary details before submitting" : ""}>
            <div>
            <Button variant="outlined" size="large" type="submit" fullWidth sx={{m:'2% 0 1% 0',backgroundColor:"#f9ca3d",color:'black',}}
             disabled={isNotFilled && !currentId}>
              Submit
            </Button>
            </div>
            </Tooltip>

            <Button
              variant="outlined"
              size="small"
              onClick={clear}
              fullWidth
              sx={{backgroundColor:'#f0c763',color:'black',mb:'0.5%'}}
            >
              Clear
            </Button>
      </form>
    </Paper>
  );
};

export default Form;