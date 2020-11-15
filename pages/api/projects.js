import argon2 from "argon2"
import { UserModel, ProjectModel } from "./db/Models"
import startMongoose from "./db"
import { getSession } from "next-auth/client"

export default async function (req, res) {
  await startMongoose()
  const { user } = await getSession({ req })
  if (!user || !user._id) {
    res.status(404)
    return
  }

  if (req.method === "POST") {
    const { projectName } = req.body
    if (!projectName) {
      res.status(404)
      return
    }

    const instance = new ProjectModel()
    instance.user = user._id
    instance.projectName = projectName
    instance.save()
    res.status(302).send("project created")
    return
  }

  if (req.method == "GET") {
    const result = await ProjectModel.find({ user: user._id })
    res.json(result ?? [])
    return
  }
}
