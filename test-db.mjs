import dns from "node:dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]); // Google ও Cloudflare এর DNS


import { MongoClient } from "mongodb";

const uri = process.env.DATABASE_URI;

if (!uri) {
  console.log("❌ DATABASE_URI পাওয়া যায়নি");
  process.exit(1);
}

console.log("শুরু হয়:", uri.split("://")[0] + "://");
console.log("<password> লেখা আছে?", uri.includes("<") ? "❌ হ্যাঁ" : "না");
console.log("ফাঁকা বা কোট আছে?", /[\s"']/.test(uri) ? "❌ হ্যাঁ" : "না");

const client = new MongoClient(uri, { serverSelectionTimeoutMS: 8000 });

try {
  await client.connect();
  console.log("✅ ১. সার্ভারে কানেক্ট হয়েছে");

  const db = client.db("bazar-dor-user");
  await db.command({ ping: 1 });
  console.log("✅ ২. ডাটাবেসে ping সফল");

  // Better Auth যা করতে চায়, সেটাই পরীক্ষা: ইনডেক্স বানানো
  await db.collection("test_tmp").createIndex({ x: 1 });
  await db.collection("test_tmp").drop();
  console.log("✅ ৩. ইনডেক্স বানানোর অনুমতি আছে");
} catch (e) {
  console.log("❌", e.name, "-", e.message);
} finally {
  await client.close();
}