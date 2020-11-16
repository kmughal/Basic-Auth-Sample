import mongoose from "mongoose";
const Schema = mongoose.Schema

const ChannelSchema = new Schema({
  channelName: String,
  user: { required: true, ref: "UserSchema", type: mongoose.Types.ObjectId },
})

class ChannelClass {
  static findByName(channelName) {
    return this.findOne({ channelName })
  }
}

ChannelSchema.loadClass(ChannelClass)

export default ChannelSchema
