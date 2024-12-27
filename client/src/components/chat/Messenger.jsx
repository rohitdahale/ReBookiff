import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMessages, getConversation} from '../../actions/chatActions';
import { sendMessage } from '../../api/post';
import Conversation from './Conversation/Conversation';
import Message from './Message/Message';
import './Messenger.css'

import {io} from 'socket.io-client'
import { Paper, Typography } from '@mui/material';

const Messenger = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  // const [socket,setSocket] = useState(null);
  const socket = useRef();
  const scrollRef = useRef();
  const conversations = useSelector((state) => state.conversations);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));
  const userId = user?.user?._id;

  // console.log(userId);
  // console.log(conversations);

  useEffect(() => {
    socket.current = io("https://unibooks.onrender.com");
    // socket.current = io("http://localhost:5000");
    socket.current.emit("addUser", userId);
    socket.current.on("getMessage", (data) => {
      console.log("heeeee");
      console.log(data);
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(users);
    });
    socket.current.on("welcome", (message) => {
      console.log(message);
    });
  
    return () => {
      socket.current.disconnect(); // Clean up the socket connection when the component unmounts
    };
  }, [userId]);
  
  useEffect(() => {
    if (arrivalMessage && currentChat?.members.includes(arrivalMessage.sender)) {
      setMessages((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage, currentChat]);
  
  useEffect(() => {
    dispatch(getConversation(userId));
  }, [userId, dispatch]);
  
  useEffect(() => {
    if (currentChat) {
      const getMessages = async () => {
        const messages = await dispatch(fetchMessages(currentChat._id));
        setMessages(messages);
      };
      getMessages();
    } else {
      setMessages([]); // Clear messages when there is no active chat
    }
  }, [currentChat, dispatch]);
  
  const handleSendMessage = async (e) => {
    e.preventDefault();
    const message = {
      conversationId: currentChat?._id,
      sender: userId,
      text: newMessage,
    };
  
    const receiverId = currentChat?.members.find((member) => member !== userId);
  
    socket.current.emit("sendMessage", {
      senderId: userId,
      receiverId: receiverId,
      text: newMessage,
    });
  
    try {
      const { data } = await sendMessage(message);
      setMessages([...messages, data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  // console.log("messages are :" , messages);

  if(!user){
    return(
      <Paper elevation={5} className='paper' sx={{backgroundColor:'#fcda71',py:1,width:'50%',height:'50%',marginTop:'2%',marginX:'auto'}}>
        <Typography variant='h6' align='center'>
          Please sign in to <br/>
           access the chat feature <br/>
        </Typography>
      </Paper>
    )
  }

  return (
    <div className="messenger">
      <div className="chatMenu">
        <div className="chatMenuWrapper">
          <input placeholder='Search for friends' className='chatMenuInput' />
          {conversations?.map((convo) => (
            <div onClick={() =>{ setCurrentChat(convo);}} className={convo===currentChat ? 'clickedConversation' : ''}>
              <Conversation key={userId} conversation={convo} currentUserId={userId} onlineUsers={onlineUsers}/>
            </div>
          ))}
          {/* <Conversation/> */}
        </div>
      </div>

      <div className="chatBox">
        {/* this div is for top bar of messenger like ehatsapp showing recivers name */}
      {/* <div style={{position:'fixed', width:'60%',zIndex:'3',color:'inherit', backgroundColor: 'rgb(234, 229, 229)',borderRadius:'20px'}}>
          <Conversation key={userId} conversation={currentChat} currentUserId={userId} onlineUsers={onlineUsers}></Conversation>
            </div> */}
      {/* <div className='backDiv' style={{height:'80px'}}></div> */}
        <div className="chatBoxWrapper">
          <div className="chatBoxTop">
            {currentChat ? (
              <>

                {messages?.map((message) => (
                  <div ref={scrollRef}>
                    <Message key={message._id} own={message?.sender === userId} message={message} />
                  </div>
                ))}
              </>
            ) : <h2 style={{ textAlign: 'center', cursor: 'default' }}>Open Chat to start conversation</h2>
            }
          </div>
          {currentChat &&
          <div className="chatBoxBottom">
            <textarea 
              className="chatMessageInput" 
              placeholder='write something' 
              onChange={(e) => setNewMessage(e.target.value)}
              value={newMessage}
            ></textarea>
              <button className="chatSubmitButton" onClick={handleSendMessage} disabled={!newMessage}>send</button>
              </div>
            }
        </div>

      </div>
    </div>
  );
};

export default Messenger;