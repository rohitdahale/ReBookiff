import * as api from '../api/post'
import { SAVED_POSTS ,SAVE_USER} from './actionConstants';
// import {FETCH_USER} from './actionConstants'


export const getUser = (id) => async(dispatch) => {
  try {
    console.log(id);
    const {data}  = await api.getUser(id);
    dispatch({type:SAVE_USER,payload:data});
    return data;
  } catch (error) {
    console.log(error);
  }
}

export const savePost = (postId) => async(dispatch) => {
  try {
    const {data} = await api.savePost(postId);
    // dispatch({type:SAVED_POSTS,payload:data})
    console.log("saved posts are : ",{data});
    // dispatch({type:SAVED_POSTS,payload:data});
    // console.log(data);
  } catch (error) {
    console.log(error);
  }
}

export const getSavedPosts = () => async(dispatch) => {
  try {
    const { data } = await api.getSavedPosts();
    console.log("from action",data);
    dispatch({type:SAVED_POSTS,payload:data});
  } catch (error) {
    console.log(error);
  }
}