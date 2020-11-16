import mongodb from "mongodb";

const _db = "__test__data";
const _url = `mongodb://localhost:27017/`;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

let _collection = null;
mongodb.MongoClient.connect(_url, options, (err, client) => {
  const db = client.db(_db);
  _collection = db.collection("messagesschemas");
});

async function getMessagesCollection() {
  return _collection;
}

export { getMessagesCollection };
