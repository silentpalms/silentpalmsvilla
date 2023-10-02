import { Schema, model, models } from "mongoose";

const messageSchema = new Schema(
  {
    user_name: {
      type: String,
      
    },
    user_email: {
      type: String,
     
    },
    user_message: {
      type: String,
      required: true,
    },
    user_phone: {
      type: String,
     
    },
  },
  {
    timestamps: true,
  }
);

const Message = models.Message || model("Message", messageSchema);

export default Message;
