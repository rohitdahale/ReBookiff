import UserModel from "../model/UserModel.js";
import mongoose from "mongoose";
import PostModel from "../model/post.js";

export const getUser = async(req,res) => {
  const {userId} = req.params;
  try {
    const user = await UserModel.findById(userId);
    if(user){
      const {password,...otherdetails} = user._doc;
      // here insteead of sending whole user we will exclude pasword field from it
      //user._doc is actually the doc of gicen user with give id from where
      //we have separeted password and otherdetails
      res.status(200).json(user) 
      } else { 
        res.status(404).json({message:"User doesn't exist with given ID"});
      }
  } catch (error) {
    res.status(500).json(error);
  }
}

export const saveBook = async(req,res) => {
  const {postId} = req.params;
  console.log(postId);
  if(!req.userId) return res.json({message:"Unauthenticated access"});
  if (!mongoose.Types.ObjectId.isValid(postId)) return res.status(404).send(`No post with id: ${postId}`);
  const user = await UserModel.findById(req.userId);
  const index = user.savedbooks.findIndex((id)=>id===String(postId));
  if(index===-1){
    console.log("hello");
    user.savedbooks.push(postId);
  }else{
    console.log("2ra hello");
    user.savedbooks = user.savedbooks.filter((id)=>id!==String(postId));
  }
  const savedPostUser = await UserModel.findByIdAndUpdate(req.userId,user,{new:true});
  const savedPosts = await PostModel.find({'_id':{$in:user.savedbooks}});
  res.status(200).json(savedPosts);
}

export const getSavedBooks = async(req,res) => {
  if(!req.userId) return res.json({message:"Unauthenticated access"});
  try {
    const user = await UserModel.findById(req.userId);
    const savedPosts = await PostModel.find({'_id':{$in:user.savedbooks}}).select('-book1_img -book2_img -book3_img -book4_img -book5_img');
    res.status(200).json(savedPosts);
  }catch(error){
    res.status(404).json(error);
  }
}