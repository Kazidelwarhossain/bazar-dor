import dns from "node:dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);
dns.setDefaultResultOrder("ipv4first");

import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const authUrl = process.env.BETTER_AUTH_URL;
const databaseUri = process.env.DATABASE_URI;
const authSecret = process.env.BETTER_AUTH_SECRET;

if (!authUrl) {
  throw new Error("BETTER_AUTH_URL is missing");
}

if (!databaseUri) {
  throw new Error("DATABASE_URI is missing");
}

if (!authSecret || authSecret.length < 32) {
  throw new Error(
    "BETTER_AUTH_SECRET must be at least 32 characters"
  );
}

const client = new MongoClient(databaseUri);
const db = client.db("bazar-dor-user");

export const auth = betterAuth({
  baseURL: authUrl,
  secret: authSecret,

  database: mongodbAdapter(db, {
    client,
  }),

 emailAndPassword: {
  enabled: true,
  autoSignIn: false, // 👈 সাইন আপের পর অটো লগইন নয়
},

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
});
