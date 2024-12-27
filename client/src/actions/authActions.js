import * as api from '../api/post'
import { AUTH_FAIL, AUTH_START, AUTH_SUCCESS ,ERROR} from './actionConstants';

export const logIn = (authData,navigate) => async(dispatch) => {
  dispatch({type:AUTH_START});
  try{
    const {data} = await api.logIn(authData);
    dispatch({type:AUTH_SUCCESS,payload:data});
    console.log("aurhrr");
    navigate('/');
  }catch(error){
    console.log(error);
    dispatch({type:ERROR,payload:error?.response?.data?.message});
  }
}

export const signUp = (authData,navigate) => async(dispatch) => {
  dispatch({type:AUTH_START});
  try{
    const {data:data} = await api.signUp(authData);
    console.log("HEllo");
    console.log(data);
    dispatch({type:AUTH_SUCCESS,payload:data});
    navigate('/');
  }catch(error){
    console.log(error);
    dispatch({type:ERROR,payload:error?.response?.data?.message});
  }
}
