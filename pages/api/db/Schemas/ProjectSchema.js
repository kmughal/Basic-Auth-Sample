const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ProjectSchema = new Schema({
  projectName: String,
  user: { required: true, ref: "UserSchema", type: mongoose.Types.ObjectId },
})

class ProjectClass {
  static findByUsername(username) {
    return this.findOne({ username })
  }
}

ProjectSchema.loadClass(ProjectClass)

export default ProjectSchema
