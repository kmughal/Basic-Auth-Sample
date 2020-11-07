const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const UserSchema = new Schema({
  username: String,
  password: String,
  email: String,
  userId: ObjectId,
});

class UserClass {
  static findByEmail(email) {
    return this.findOne({ email });
  }
}

UserSchema.loadClass(UserClass);

export default UserSchema;
