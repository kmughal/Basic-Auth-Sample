import mongoose from "mongoose"

import UserSchema from "../Schemas/UserSchema"
import ProjectSchema from "../Schemas/ProjectSchema"

let UserModel =
  mongoose.models.UserSchema ?? mongoose.model("UserSchema", UserSchema)
let ProjectModel =
  mongoose.models.ProjectSchema ??
  mongoose.model("ProjectSchema", ProjectSchema)
export default function () {
  if (UserModel) return
  UserModel =
    mongoose.models.UserSchema ?? mongoose.model("UserSchema", UserSchema)
    ProjectModel =
    mongoose.models.ProjectModel ?? mongoose.model("ProjectModel", ProjectModel)
}

export { UserModel, ProjectModel }
