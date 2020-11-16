import Express from "express";
import bodyParser from "body-parser";
import { MessageModel } from "./db/Models/index.js";
import startMongoose from "./db/index.js";

const app = Express();
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS,GET,POST,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  if (req.method === "OPTOINS") {
    return res.sendStatus(200);
  }
  next();
});

let clients = [];

app.get("/messages", async (req, res) => {
  await startMongoose();
  const { channelId } = req.query;

  if (!channelId)
    return res.status(500).send("Channel Id is required for live updates!");

  const headers = {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  };

  const messages = await getMessagesByChannelId(channelId);
  res.writeHead(200, headers);
  startLiveUpdates(channelId);
 console.log(messages)
  let response = {
    messages,
    dateString: new Date().toString(),
  };

  const data = `data: ${JSON.stringify(response)}\n\n`;
  res.write(data);

  const clientId = addClient(res, channelId);
  removeClientOnceConnectionIsClosed(req, clientId);
});

function removeClientOnceConnectionIsClosed(req, clientId) {
  req.on("close", () => {
    console.log(`${clientId} Connection closed`);
    clients = clients.filter((c) => c.id !== clientId);
  });
}

function addClient(res, channelId) {
  const clientId = Date.now();
  const newClient = {
    id: clientId,
    channelId,
    res,
  };
  clients.push(newClient);
  return clientId;
}

function startLiveUpdates(channelId) {
  setInterval(() => getNewResponseAndNotifyAllClients(channelId), 10000);
}

async function getMessagesByChannelId(channelId) {
 
  const messages = await MessageModel.find({
    channel: channelId,
  }).populate("user", "username");
  return messages;
}

async function getNewResponseAndNotifyAllClients(channelId) {
  const messages = await getMessagesByChannelId(channelId);
  let response = {
    messages,
    dateString: new Date().toString(),
  };
  console.log("sending message to :", clients.length);
  clients
    .filter((c) => c.channelId === channelId)
    .forEach((c) => c.res.write(`data: ${JSON.stringify(response)}\n\n`));
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Custom server opened :", port));
