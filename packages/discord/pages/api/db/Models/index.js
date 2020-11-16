import mongoose from "mongoose"

import UserSchema from "../Schemas/UserSchema"
import ChannelSchema from "../Schemas/ChannelSchema"
import MessagesSchema from "../Schemas/MessagesSchema"

let UserModel =
  mongoose.models.UserSchema ?? mongoose.model("UserSchema", UserSchema)
let ChannelModel =
  mongoose.models.ChannelSchema ??
  mongoose.model("ChannelSchema", ChannelSchema)
let MessageModel =
  mongoose.models.MessagesSchema ??
  mongoose.model("MessagesSchema", MessagesSchema)

export default function () {
  if (UserModel) return
  UserModel =
    mongoose.models.UserSchema ?? mongoose.model("UserSchema", UserSchema)
    
  ChannelModel =
    mongoose.models.ChannelSchema ??
    mongoose.model("ChannelSchema", ChannelSchema)

  MessageModel =
    mongoose.models.MessageModel ?? mongoose.model("MessageModel", MessageModel)
}

export { UserModel, ChannelModel, MessageModel }
