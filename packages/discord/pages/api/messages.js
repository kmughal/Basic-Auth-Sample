import { MessageModel } from "./db/Models";
import startMongoose from "./db";
import { getSession } from "next-auth/client";

export default async function (req, res) {
  await startMongoose();
  const { user } = await getSession({ req });
  if (!user || !user._id) {
    res.status(404);
    return;
  }
  if (req.method === "POST") {
    const { channelId, message } = req.body;

    if (!channelId || !message) {
      res.status(404);
      return;
    }
    const instance = new MessageModel();
    instance.user = user._id;
    instance.channel = channelId;
    instance.message = message;
    instance.save();
    res.status(302).send("message added to the selected channel");
    return;
  } else if (req.method == "GET") {
    const { channelId } = req.query;

    if (!channelId) {
      res.status(404).send("Bad request");
      return;
    }

    const result = await MessageModel.find({
      channel: channelId,
    }).populate("user", "username");

    res.json(result ?? []);
  } else if (req.method == "DELETE") {
    const { messageId } = req.body;

    if (!messageId) {
      res.status(404).send("Bad request");
      return;
    }

    const existingMessage = await MessageModel.find({ _id: messageId });
    const isOwner = user._id !== existingMessage.user;
    if (!isOwner) {
      res.status(404).send("Bad request");
      return;
    }

    await MessageModel.deleteOne({
      _id: messageId,
    });

    res.status(204).send("message deleted" + messageId);
  } else if (req.method == "PUT") {
    const { messageId, message } = req.body;
    if (!messageId && !message) {
      res.status(404).send("Bad request");
      return;
    }
    const existingMessage = await MessageModel.findOne({ _id: messageId });
    const isOwner = user._id !== existingMessage.user;
    if (!isOwner) {
      res.status(404).send("Bad request");
      return;
    }

    await MessageModel.updateOne(
      { _id: { $eq: messageId } },
      { message: message },
      { upsert: true }
    );

    res.status(204).send("message updated" + messageId);
  }
}
