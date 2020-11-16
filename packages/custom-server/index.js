const Express = require("express");
const bodyParser = require("body-parser");
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

const clients = [];
let counter = 0;
app.get("/messages", (req, res) => {
  const headers = {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  };

  res.writeHead(200, headers);
  startLiveUpdatesForBus(res);

  let response = {
    counter: counter++,
    dateString: new Date().toString(),
  };

  const data = `data: ${JSON.stringify(response)}\n\n`;
  res.write(data);

  const clientId = addClient(res);
  removeClientOnceConnectionIsClosed(req, clientId);
});

function removeClientOnceConnectionIsClosed(req, clientId) {
  req.on("close", () => {
    console.log(`${clientId} Connection closed`);
    clients = clients.filter((c) => c.id !== clientId);
  });
}

function addClient(res) {
  const clientId = Date.now();
  const newClient = {
    id: clientId,
    res,
  };
  clients.push(newClient);
  return clientId;
}

function startLiveUpdatesForBus(_) {
  setInterval(() => getNewResponseAndNotifyAllClients(), 3000);
}

function getNewResponseAndNotifyAllClients() {
  let response = {
    counter: counter++,
    dateString: new Date().toString(),
  };
  console.log("sending message to :", clients.length);
  clients.forEach((c) => c.res.write(`data: ${JSON.stringify(response)}\n\n`));
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Custom server opened :", port));
