import { MessageModel } from "./db/Models"
import startMongoose from "./db"
import { getSession } from "next-auth/client"

const clients = []

export default async function (req, res) {
  await startMongoose()
  const { user } = await getSession({ req })
  if (!user || !user._id) {
    res.status(404)
    return
  }
  if (req.method == "GET") {
   
    let response = {
      counter: counter++,
      dateString: new Date().toString()
    }

    startLiveUpdatesForBus(res)
  
    const data = `data: ${JSON.stringify(response)}\n\n`
    res.write(data)
    const clientId = addClient(res)
    removeClientOnceConnectionIsClosed(req, clientId)
  }
}


function addClient (res) {
  const clientId = Date.now()
  const newClient = {
    id: clientId,
    res
  }
  clients.push(newClient)
  return clientId
}

function startLiveUpdatesForBus (_) {
  setInterval(() => getNewResponseAndNotifyAllClients(), 1000)
}

function getNewResponseAndNotifyAllClients () {
  let response = {
    counter: counter++,
    dateString: new Date().toString()
  }
  console.log('sending message to :', clients.length)
  clients.forEach(c => c.res.write(`data: ${JSON.stringify(response)}\n\n`))
}