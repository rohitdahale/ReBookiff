import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv'
import PostRoutes from './routes/post.js'
import AuthRoutes from './routes/Auth.js'
import UserRoutes from './routes/User.js'
import ConversationRoutes from './routes/Conversation.js'
import MessageRoutes from './routes/Message.js'
import path from 'path'
import { Server } from 'socket.io';

const app = express();

const __dirname = path.resolve();/*require for deployment*/
dotenv.config();

app.use(bodyParser.json({limit:'50mb',extended:true}));
app.use(bodyParser.urlencoded({limit:'50mb',extended:true}));
app.use(cors());

app.use('/api/posts',PostRoutes);
app.use('/api/auth',AuthRoutes);
app.use('/api/user',UserRoutes);
app.use('/api/conversations',ConversationRoutes);
app.use('/api/messages',MessageRoutes);

app.use(express.static(path.join(__dirname,"../client/build")));
app.get("/*",function(req,res){
  res.sendFile(
    path.join(__dirname,"../client/build/index.html"),
  );
});

mongoose.set("strictQuery",false);
const PORT = process.env.PORT || 5000;

let server1;
const server = mongoose.connect(process.env.CONNECTION_URL,{useNewUrlParser: true,useUnifiedTopology:true})
	.catch((error) => console.log(`${error} did not connect`));

	server1 = app.listen(PORT,()=>console.log(`Server is running on a PORT : ${PORT}`));
  console.log(server1);
  const io = new Server(server1, {
    cors: {
      origin: ["http://localhost:3000","https://unibooks.onrender.com"],
    },
  });

  let users = [];

  const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
      users.push({ userId, socketId });
  };
  
  const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
  };
  
  const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
  };
  
  io.on("connection", (socket) => {
    console.log("User connected");
  
    socket.on("addUser", (userId) => {
      addUser(userId, socket.id);
      io.emit("getUsers", users);
    });
  
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
      const user = getUser(receiverId);
      console.log("mera");
      io.to(user?.socketId).emit("getMessage", {
        senderId,
        text,
      });
    });
  
    socket.on("disconnect", () => {
      console.log("User disconnected");
      removeUser(socket.id);
      io.emit("getUsers", users);
    });
  });
  