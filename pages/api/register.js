import argon2 from "argon2";
import { UserModel } from "./db/Models";
import startMongoose from "./db";

export default async function (req, res) {
  await startMongoose();
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400);
    return;
  }

  try {
    const instance = new UserModel();
    const hashPassword = await argon2.hash(password);
    instance.username = username;
    instance.password = hashPassword;

    instance.save();
    res.status(200).json({ username, password });
  } catch (error) {
    res.status(500).json({ error });
  }
}
