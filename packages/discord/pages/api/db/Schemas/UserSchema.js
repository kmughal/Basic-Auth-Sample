const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  password: String,
});

class UserClass {
  static findByUsername(username) {
    return this.findOne({ username });
  }
}

UserSchema.loadClass(UserClass);

export default UserSchema;
