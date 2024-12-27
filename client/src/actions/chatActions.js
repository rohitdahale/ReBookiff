import * as api from '../api/post'
import {FETCH_CONVERSATION} from './actionConstants'

export const getConversation = (userId) => async(dispatch) => {
  try {
    console.log("hello1");
    const {data} = await api.fetchConversations(userId);
    dispatch({type:FETCH_CONVERSATION,payload:data});
  } catch (error) {
    console.log(error);
  }
}

export const fetchMessages = (conversationId) => async(dispatch) => {
  try {
    const {data} = await api.fetchMessages(conversationId);
    if(data) return data;
  } catch (error) {
    console.log(error);
  }
}

export const sendMessage = (message) => async(disatch) => {
  try {
    const {data} = await api.sendMessage(message);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}