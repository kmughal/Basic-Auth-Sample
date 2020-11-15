import argon2 from "argon2"
import { UserModel, ProjectModel } from "./db/Models"
import startMongoose from "./db"

export default async function (req, res) {
  await startMongoose()

  if (req.method === "POST") {
    const { username, projectName } = req.body
    if (!username || !projectName) {
      res.status(404)
      return
    }

    const existingUser = await UserModel.findByUsername(username)
    if (!existingUser) {
      res.status(404)
      return
    }
    const instance = new ProjectModel()
    instance.user = existingUser
    instance.projectName = projectName
    instance.save()
    res.status(302).send("project created")
    return
  }

  if (req.method == "GET") {
    const { username } = req.query
    if (!username) {
      res.status(404)
      return
    }
    const existingUser = await UserModel.findByUsername(username)
    if (!existingUser) {
      res.status(404)
      return
    }

    const result = await ProjectModel.find({ user: existingUser })
    res.json(result ?? [])
    return
  }
}
