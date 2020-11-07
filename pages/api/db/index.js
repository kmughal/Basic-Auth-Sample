import UserSchema from "./Schemas/UserSchema";


import Mongoose from "mongoose";
import configModels from "./Models";

const _db = "__test__data";
const _url = `mongodb://localhost:27017/${_db}`;
const _dbConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

let _mongooseInstance = null;

function startMongoose() {
  return new Promise((resolve, reject) => {
    if (_mongooseInstance) {
      resolve(_mongooseInstance);
      return;
    }

    Mongoose
      .connect(_url, _dbConfig)
      .then((instance) => {
        _mongooseInstance = instance;
        configModels(_mongooseInstance);
        resolve(_mongooseInstance);
      })
      .catch(reject);
  });
}

export default startMongoose;
