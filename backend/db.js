import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const client = new MongoClient(process.env.MONGODB_URI);

let db;

export async function connectToDatabase() {
  if (db) {
    return db;
  }

  // REQUIRED BY TASK 4
  await client.connect();

  db = client.db(process.env.DB_NAME || "giftlink");

  console.log("MongoDB connected");

  return db;
}