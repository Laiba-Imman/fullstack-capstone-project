import dotenv from "dotenv";
import { connectToDatabase } from "../db.js";

dotenv.config();

const data = [
  ["Wooden Study Table", "Furniture", "Solid wooden study table."],
  ["Office Chair", "Furniture", "Comfortable office chair."],
  ["Bookshelf", "Furniture", "Five shelf wooden bookshelf."],
  ["Table Lamp", "Electronics", "Working LED table lamp."],
  ["Microwave Oven", "Electronics", "Working microwave oven."],
  ["Electric Kettle", "Electronics", "Small electric kettle."],
  ["School Backpack", "Bags", "Durable school backpack."],
  ["Winter Jacket", "Clothing", "Warm winter jacket."],
  ["Coffee Mugs Set", "Kitchen", "Reusable ceramic mugs."],
  ["Cooking Pan", "Kitchen", "Non-stick cooking pan."],
  ["Novel Collection", "Books", "Collection of English novels."],
  ["Children Story Books", "Books", "Story books for children."],
  ["Indoor Plant Pot", "Home", "Decorative plant pot."],
  ["Floor Mat", "Home", "Reusable floor mat."],
  ["Sports Bag", "Sports", "Large sports bag."],
  ["Yoga Mat", "Sports", "Exercise and yoga mat."]
];

const items = data.map(
  ([title, category, description]) => ({
    title,
    category,
    description,
    condition: "Good",
    location: "Rawalpindi",
    ownerName: "GiftLink User",
    createdAt: new Date()
  })
);

const db = await connectToDatabase();

// Clear old items
await db.collection("items").deleteMany({});

// Insert exactly 16
const result = await db
  .collection("items")
  .insertMany(items);

console.log("inserted_items");
console.log(`Inserted ${result.insertedCount} documents`);
console.log(result.insertedIds);

process.exit(0);