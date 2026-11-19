import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import dns from "node:dns";

// শুধু লোকাল ডেভেলপমেন্টে: তোমার ইন্টারনেটের DNS সমস্যা এড়াতে
if (process.env.NODE_ENV === "development") {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
  dns.setDefaultResultOrder("ipv4first");
}

const authUrl = process.env.BETTER_AUTH_URL;
const databaseUri = process.env.DATABASE_URI;
const authSecret = process.env.BETTER_AUTH_SECRET;

if (!authUrl) throw new Error("BETTER_AUTH_URL is missing");
if (!databaseUri) throw new Error("DATABASE_URI is missing");
if (!authSecret || authSecret.length < 32) {
  throw new Error("BETTER_AUTH_SECRET must be at least 32 characters");
}

// হট রিলোডে বারবার নতুন সংযোগ না বানিয়ে একটাই ব্যবহার করে
const globalForMongo = globalThis as unknown as { _mongoClient?: MongoClient };
const client = globalForMongo._mongoClient ?? new MongoClient(databaseUri);
if (process.env.NODE_ENV !== "production") {
  globalForMongo._mongoClient = client;
}

const db = client.db("bazar-dor-user");

// GitHub এর ID/Secret থাকলেই চালু হবে, না থাকলে ওয়ার্নিং আসবে না
const githubEnabled =
  !!process.env.GITHUB_CLIENT_ID && !!process.env.GITHUB_CLIENT_SECRET;

export const auth = betterAuth({
  baseURL: authUrl,
  secret: authSecret,

  database: mongodbAdapter(db, { client }),

  emailAndPassword: {
    enabled: true,
    autoSignIn: false, // সাইন আপের পর লগইন পেজে যাবে
  },

  // একই ইমেইলের পুরনো অ্যাকাউন্টে Google/GitHub জোড়া লাগবে
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "github"],
    },
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    ...(githubEnabled
      ? {
          github: {
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
          },
        }
      : {}),
  },
});