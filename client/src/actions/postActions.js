import * as api from '../api/post'
import {FETCH_ALL,CREATE,DELETE,FETCH_POST,UPDATE,FETCH_BY_SEARCH} from './actionConstants'
import { getSavedPosts } from './userActions';

export const getPosts = () => async(dispatch) => {
  try {
    const { data } = await api.getposts();
    console.log(data);
    dispatch({type : FETCH_ALL , payload:data});
  } catch (error) {
    console.log(error);
  }
}

export const getPost = (id) => async (dispatch) => {
  try{
    // dispatch({type:START_LOADING});
    const data = await api.fetchPost(id);//getting the post and storing it in data
    dispatch({ type: FETCH_POST, payload: data });
    // dispatch({type:STOP_LOADING});
  }catch(error){
    console.log(error);
  }
}

export const updatePost = (id,post,navigate) => async(dispatch) => {
  try {
    const { data } = await api.updatePost(id,post);
    navigate(`/books/${data._id}`)//returning to post_details page of post created
    dispatch({ type:UPDATE , payload:data})
    // dispatch(getPosts());
  }catch(error){
    console.log(error);
  }
}

export const createPost = (post,navigate) => async(dispatch) => {
  try {
    const {data} = await api.createPost(post);
    navigate(`/books/${data._id}`);
    dispatch({type : CREATE , payload:data});
  }catch(error){
    console.log(error);
  }
}

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: DELETE, payload: id });
    dispatch(getPosts());
  } catch (error) {
    console.log(error.message);
  }
};

export const getPostsBySearch = (searchQuery,navigate) => async(dispatch) => {
  try {
    const {data} = await api.fetchPostsBySearch(searchQuery);
    console.log("data is ", data );
    if(!data.length){//if posts are not available then it will redirect to nomatch page
      navigate(`/books/search/booknotfound`)
    }else{
      //second one is because we have send it as a object where {data:posts}
      dispatch({type:FETCH_BY_SEARCH , payload:data})
    }
  } catch (error) {
    console.log(error);
  }
}