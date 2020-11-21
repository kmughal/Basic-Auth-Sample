const mongoose = require("mongoose")
const Schema = mongoose.Schema

const MessagesSchema = new Schema({
  message: {required: true, type: String},
  user: { required: true, ref: "UserSchema", type: mongoose.Types.ObjectId },
  channel: { required: true, ref: "ChannelSchema", type: mongoose.Types.ObjectId },
  messageType: {required : true, type : String},
})

class MessagesClass {
   
}

MessagesSchema.loadClass(MessagesClass)

export default MessagesSchema
