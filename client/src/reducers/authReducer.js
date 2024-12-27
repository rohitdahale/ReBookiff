import {AUTH_START,AUTH_SUCCESS,AUTH_FAIL,ERROR} from '../actions/actionConstants'

const authReducer = (state = {authData:null,loading:false,error:false},action) => {
  switch(action.type){
    case AUTH_START :
      return {...state,loading:true,error:false} ;
    case AUTH_SUCCESS :
      localStorage.setItem('profile',JSON.stringify({...action?.payload}));
      return {...state,authData:action.payload,loading:false,error:false};
    case AUTH_FAIL :
      return {...state,loading:false,error:true};
    case "LOGOUT" :
      return {...state,authData:null};
    case ERROR :
      console.log(action?.payload);
      return {authData:null,errorMessage:action.payload,isLoadingTrue:false};
    default :
      return state;
  }
};

export default authReducer;

/*
1 . ...action.payload is useful when you want to create a new object with all the properties of action 
and possibly add or overwrite some properties. This is typically used in situations where you want to 
modify the properties of an object without directly mutating it.
*/