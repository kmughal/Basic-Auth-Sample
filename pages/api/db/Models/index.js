import mongoose from "mongoose"

import UserSchema from "../Schemas/UserSchema"

let UserModel = mongoose.models.UserSchema ?? mongoose.model("UserSchema", UserSchema)
export default function() {
  if(UserModel) return;
  UserModel = mongoose.models.UserSchema ?? mongoose.model("UserSchema", UserSchema)
}

export { UserModel }
