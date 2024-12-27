import PostModel from "../model/post.js";
import mongoose from "mongoose";

export const getPosts = async(req,res) => {
  try{
    const posts = await PostModel.find().select('-book1_img -book2_img -book3_img -book4_img -book5_img');
    res.status(200).json(posts);
  }catch(error){
    res.status(404).json(error);
  }
}

export const getPost = async(req,res) => {
  const {id} = req.params; //getting a id from parameter of request url
  try{
    const post = await PostModel.findById(id); //finding the post of id in the url using model created using mongoose from database  
    res.status(200).json(post); //sending the response as a json post
  }catch(error){
    res.status(404).json({message:error});//page/resource not found
  }
}

export const createPost = async(req,res) => {
    const post = req.body;
    const newPost = new PostModel({...post,creator:req.userId});
    console.log("creating a new post");
    // const newPost = new PostModel(post);
    try{
      const newpost = await newPost.save();
      res.json(newpost);
    }catch(error){
      res.status(409).json(error);
  }
}

export const updatePost = async(req,res) => {
  const {id} = req.params;
  const post = req.body //we are receiving the whole updated post via the request body
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
  
  const updatedPost = await PostModel.findByIdAndUpdate(id,{...post,creator:req.userId,id},{new:true});
  console.log("hello");
  res.json(updatedPost);
  console.log(updatedPost);
}

export const deletePost = async(req,res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
  
    await PostModel.findByIdAndRemove(id); //removind the post with a given id
  
    res.json({ message: "Post deleted successfully." });
}

export const getPostsBySearch = async(req,res) => {
  const {year,branch,semester} = req.query;
  try {
    const posts = await PostModel.find({year:year,branch:branch,semester:semester});
    res.json(posts);
  } catch (error) {
    res.status(404).json({message:error})
  }
}