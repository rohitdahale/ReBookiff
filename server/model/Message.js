import mongoose from "mongoose";

const messageSchema = mongoose.Schema(
  {
    conversationId: String,
    sender: String,
    text: String,
  },
  { timestamps: true }
);

const MessageModel = mongoose.model("messageModel", messageSchema);

export default MessageModel;
