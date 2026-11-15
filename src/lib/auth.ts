import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const authUrl = process.env.BETTER_AUTH_URL;

console.log("AUTH URL:", authUrl);

if (!authUrl) {
  throw new Error("BETTER_AUTH_URL is missing from .env");
}

const client = new MongoClient(process.env.DATABASE_URI!);
const db = client.db();

export const auth = betterAuth({
  baseURL: authUrl,
  secret: process.env.BETTER_AUTH_SECRET,

  database: mongodbAdapter(db, {
    client,
  }),

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
});