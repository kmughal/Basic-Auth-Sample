import { verify } from "argon2";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { UserModel } from "../../api/db/Models";
import * as db from "../db";

db.default();
const options = {
  pages: {
    signIn: "/login",
    signOut: "/register",
  },
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  // Configure one or more authentication providers
  providers: [
    Providers.Credentials({
      name: "Credentials",
      credentials: {
        username: {
          label: "username",
          type: "text",
          placeholder: "username",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        await db.default();
        const existingUser = await UserModel.findOne({
          username: credentials.username,
        });
        if (await verify(existingUser.password, credentials.password)) {
          return { name: existingUser.username };
        }
        return null;
      },
    }),
  ],

  // A database is optional, but required to persist accounts in a database
  database: db.databaseUrl,
};

export default (req, res) => NextAuth(req, res, options);
