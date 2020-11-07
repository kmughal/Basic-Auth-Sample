import startMongoose from "./db";
import { UserModel } from "./db/Models";



export default async function (req, res) {
  await startMongoose();
  const { query } = req;
  if (!query.email) {
    res.status(400).send("bad request");
    return;
  }
  const result = await UserModel.findByEmail(query.email);
  if (result) res.status(200).json(result);
  res.status(404).send("not found");
}
