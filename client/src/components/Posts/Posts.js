import { CircularProgress, Grid } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import Post from './Post/Post';
import './Posts.css'

const Posts = ({setCurrentId}) => {
  const posts = useSelector((state)=>state.posts);
  const user = JSON.parse(localStorage?.getItem('profile'));
  console.log(posts);
  if(!posts?.length) {return  (<div style={{height:'100vh',width:'100%',margin:'30vh 70vh'}}><CircularProgress color='inherit' size='5em'/></div>);}
  return (
    <div className='postsPage'>
      <Grid container spacing={3} marginTop='0px'>
        {posts?.map((post)=>{
          return (user?.user?._id !== post?.creator &&
            <Grid item sm={6} md={4} lg={4} key={post._id} >
            <Post post={post} setCurrentId={setCurrentId}/>
          </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default Posts;


/*
import { CircularProgress, Grid } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import Post from './Post/Post';
import './Posts.css'

const Posts = ({isSavedPosts}) => {
  const posts = useSelector((state)=>state.posts);
  console.log("is saved post section : ", isSavedPosts);
  const { savedposts } = useSelector((state)=>state.posts);
  console.log("In post section");
  var posts;
  if(isSavedPosts){
    posts = savedposts;
  }else{
    posts = posts;
  }
  console.log(posts);
  if(!posts?.length) {return  (<div style={{height:'100vh',width:'100%',margin:'30vh 70vh'}}><CircularProgress color='inherit' size='5em'/></div>);}
  return (
    <div className='postsPage'>
      <Grid container spacing={3} marginTop='10px'>
        {posts?.map((post)=>(
          <Grid item sm={4} key={post._id} >
            <Post post={post}/>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Posts;
*/