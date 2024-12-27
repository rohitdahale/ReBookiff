import { CircularProgress, Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import Post from './Post/Post';
import './Posts.css'

const SavedPosts = () => {
  const { savedposts } = useSelector((state)=>state.posts);
  const user = JSON.parse(localStorage?.getItem('profile'));
  console.log("savedposts are : ",savedposts);
  
  if(!savedposts?.length) {return  (<div style={{height:'100vh',width:'100%',margin:'25vh 90vh'}}><CircularProgress color='inherit' size='5em'/></div>);}
  return (
    <div className='PostsPage'>
      <Grid container maxWidth='xl' spacing={3} marginTop='5px' display='flex'>
        {savedposts?.map((post)=>{
          return ( user?.user?._id !== post.creator &&
          <Grid item sm={6} md={4} lg={3} key={post._id} >
            <Post post={post}/>
          </Grid>
          );
         })}
      </Grid>
    </div>
  );
};

export default SavedPosts;