import express from "express";
// import { connectToDatabase } from "../db.js";

import { connectToDatabase } from "../db.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const db = await connectToDatabase();

    const { category, search } = req.query;

    const filter = {};

    // REQUIRED: FILTER BY CATEGORY
    if (category) {
      filter.category = {
        $regex: category,
        $options: "i"
      };
    }

    // SEARCH BY TITLE OR DESCRIPTION
    if (search) {
      filter.$or = [
        {
          title: {
            $regex: search,
            $options: "i"
          }
        },
        {
          description: {
            $regex: search,
            $options: "i"
          }
        }
      ];
    }

    const items = await db
      .collection("items")
      .find(filter)
      .sort({ createdAt: -1 })
      .toArray();

    res.json(items);
  } catch (error) {
    next(error);
  }
});

export default router;