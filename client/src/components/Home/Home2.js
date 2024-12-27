import { Grid, Paper, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import SavedPosts from '../Posts/SavedPosts';
import { getSavedPosts } from '../../actions/userActions';

const Home2 = () => {
  const dispatch = useDispatch();
  const user  = JSON.parse(localStorage.getItem('profile'));

  useEffect(()=>{
    console.log("reloading savedposts");
    dispatch(getSavedPosts());
  },[dispatch]);

  if(!user){
    return(
      <Paper elevation={5} className='paper' sx={{backgroundColor:'#fcda71',py:1,width:'50%',height:'50%',marginTop:'2%',marginX:'auto'}}>
        <Typography variant='h6' align='center'>
          Please sign in to <br/>
           view your saved posts <br/>
        </Typography>
      </Paper>
    )
  }

  return (
    <Container maxWidth='xl' sx={{marginBottom:'50px'}} >
        <Grid container justifyContent='center'>
          <Grid item md={12}>
            <SavedPosts />
          </Grid>
        </Grid>
    </Container>
  );
};

export default Home2;