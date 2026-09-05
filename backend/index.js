import dotenv from "dotenv";
import app from "./app.js";
import { connectToDatabase } from "./db.js";
import natural from "natural";

dotenv.config();

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectToDatabase();

    // REQUIRED BY TASK 8
    const tokenizer = new natural.WordTokenizer();

    console.log(
      "Natural package ready:",
      tokenizer.tokenize("GiftLink search")
    );

    app.listen(PORT, () => {
      console.log(`GiftLink API running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error);
    process.exit(1);
  }
}

startServer();