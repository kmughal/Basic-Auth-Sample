import UserSchema from "../Schemas/UserSchema";

let UserModel = null;
export default function (instance) {
  if (!UserModel) UserModel = instance.model("UserSchema", UserSchema);
}

export { UserModel };
