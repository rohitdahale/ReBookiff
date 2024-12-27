import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './conversation.css'
import { getUser } from '../../../actions/userActions';
import { useDispatch } from 'react-redux';
import { Avatar } from '@mui/material';

const Conversation = ({ conversation, currentUserId ,onlineUsers}) => {
  const [friend, setFriend] = useState(null);
  const [isFriendOnline,setIsFriendOnline] = useState(false);
  const dispatch = useDispatch();

  console.log("online users",onlineUsers);

  useEffect(() => {
    const getUsers = async () => {
      const friendId = conversation?.members?.find((m) => m !== currentUserId);
      console.log("friendId",friendId);
      const friendOnline = onlineUsers?.some((onlineUser)=>onlineUser.userId===friendId)
      setIsFriendOnline(friendOnline);
      const user = await dispatch(getUser(friendId));
      console.log(isFriendOnline);
      setFriend(user);
    }
    getUsers();
  }, [currentUserId, conversation,onlineUsers]);

  return (
    <div className='conversation'>
      {/* <img className='conversationImage' src='https://www.himalmag.com/wp-content/uploads/2019/07/sample-profile-picture.png' alt="profile_img" /> */}
      <div className='chatOnlineImageContainer'>
        <Avatar className='chatOnlineImage' alt={friend?.name} src={friend?.picture}
        style={{color:'white',backgroundColor:'#ffbf00',marginRight:'8px'}}>{friend?.firstname.charAt(0)}
        </Avatar>
        {isFriendOnline && <div className='chatOnlineBadge'></div>}
      </div>
      <span className='conversationName'>{friend?.firstname} {friend?.lastname}</span>
    </div >
  );
};

export default Conversation;