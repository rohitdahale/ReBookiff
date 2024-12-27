import {FETCH_CONVERSATION} from '../actions/actionConstants'

const convReducer = (conversations = [],action) => {
  switch(action.type){
    case FETCH_CONVERSATION:
      return action.payload;
    default :
      return conversations;
  }
};

export default convReducer;

/*
1 . ...action.payload is useful when you want to create a new object with all the properties of action 
and possibly add or overwrite some properties. This is typically used in situations where you want to 
modify the properties of an object without directly mutating it.
*/