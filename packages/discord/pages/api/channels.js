import { getSession } from "next-auth/client"
import { ChannelModel } from "./db/Models"
import startMongoose from "./db"

export default async function (req, res) {
  await startMongoose()
  const { user } = await getSession({ req })
  if (!user || !user._id) {
    res.status(404)
    return
  }

  if (req.method === "POST") {
    const { channelName } = req.body
    if (!channelName) {
      res.status(404).send("Bad request")
      return
    }
    const instance = new ChannelModel()
    instance.user = user._id
    instance.channelName = channelName
    instance.save()
    res.status(200).send("Channel created!")
    return
  }

  if (req.method == "GET") {
    const result = await ChannelModel.find({  })
    res.json(result ?? [])
    return
  }
}
