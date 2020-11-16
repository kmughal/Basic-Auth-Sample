import { MessageModel } from "./db/Models"
import startMongoose from "./db"
import { getSession } from "next-auth/client"
import MessagesSchema from "./db/Schemas/MessagesSchema"

export default async function (req, res) {
  await startMongoose()
  const { user } = await getSession({ req })
  if (!user || !user._id) {
    res.status(404)
    return
  }

  if (req.method === "POST") {
    const { channelId, message } = req.body

    if (!channelId || !message) {
      res.status(404)
      return
    }
    const instance = new MessageModel()
    instance.user = user._id
    instance.channel = channelId
    instance.message = message
    instance.save()
    res.status(302).send("message added to the selected channel")
    return
  }

  if (req.method == "GET") {
    const { channelId } = req.query

    if (!channelId) {
      res.status(404).send("Bad request")
      return
    }

    const result = await MessageModel.find({
      channel: channelId,
    }).populate("user", "username")


    res.json(result ?? [])
  }
}
