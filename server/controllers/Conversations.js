import ConversationModel from "../model/Conversation.js";

export const createConversation = async (req, res) => {
  console.log("hello");
  const newConversation = new ConversationModel({
    members: [req.body.senderId, req.body.receiverId],
  });
  try {
    const conversation = await ConversationModel.findOne({members:{ $all:[req.body.senderId,req.body.receiverId]}});
    if(conversation){
      console.log("conversation already exist");
      return res.status(200).json({message:'conversation already exist'});
    }
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (error) {
    res.status(409).json(error);
  }
};

export const getConversation = async (req, res) => {
  try {
    const conversations = await ConversationModel.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversations);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
