import { Grid } from '@mui/material';
import { Container } from '@mui/system';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getPosts } from '../../actions/postActions';
import Posts from '../Posts/Posts';
import { getSavedPosts } from '../../api/post';
import SavedPosts from '../Posts/SavedPosts';
import SearchPosts from '../Posts/searchPosts/SearchPosts';

const Home = ({setCurrentId}) => {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getPosts());
  },[dispatch]);
  
  return (
    <Container maxWidth='xl' sx={{marginBottom:'200px'}}>
        <Grid container justifyContent='space-between' alignItems="stretch" >
          <Grid item xs={2} sm={2} md={1.5}>
            <SearchPosts/>
          </Grid>
          <Grid item xs={12} sm={6} md={9.5}>
            <Posts setCurrentId={setCurrentId}/>
          </Grid>
        </Grid>
    </Container>
  );
};

export default Home;