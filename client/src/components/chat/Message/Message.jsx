import React from 'react';
import './message.css'
import {format} from 'timeago.js'
import { Avatar } from '@mui/material';

const Message = ({own,message}) => {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        {/* <img className="messageImage"
        src='https://www.himalmag.com/wp-content/uploads/2019/07/sample-profile-picture.png'
        alt="message_image"/> */}
        <Avatar style={{color:'white',backgroundColor:'grey',marginRight:'10px',width:'37px',height:'37px'}}/>
        <p className="messageText">{message?.text}</p>
      </div>
      <div className="messageBottom">
        {format(message.createdAt)}
      </div>
    </div>
  );
};

export default Message;