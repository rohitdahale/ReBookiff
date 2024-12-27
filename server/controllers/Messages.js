import MessageModel from '../model/Message.js'

export const createMessage = async(req,res) => {
  const message = new MessageModel(req.body);
  try {
    console.log(message.text);
    const newMessage = await message.save();
    res.status(200).json(newMessage);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
}

export const getMessages = async(req,res) => {
  const {conversationId} = req.params;
  try {
    const messages = await MessageModel.find({
      conversationId:conversationId
    })
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);    
  }
}