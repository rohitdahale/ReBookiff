import { Grid, Paper, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getPosts } from '../../actions/postActions';
import MyPosts from '../Posts/MyPosts';

const MyPostsHome = ({setCurrentId}) => {
  const dispatch = useDispatch();

  useEffect(()=>{
    console.log("loading myposts");
    dispatch(getPosts());
  },[dispatch]);

  return (
    <Container maxWidth='xl' sx={{marginBottom:'50px'}} >
        <Grid container justifyContent='center'>
          <Grid item md={12}>
            <MyPosts setCurrentId={setCurrentId}/>
          </Grid>
        </Grid>
    </Container>
  );
};

export default MyPostsHome;