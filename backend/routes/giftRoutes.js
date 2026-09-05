import express from "express";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "../db.js";

const router = express.Router();

// GET ALL GIFTS
// /api/gifts
router.get("/", async (req, res, next) => {
  try {
    const db = await connectToDatabase();

    const gifts = await db
      .collection("items")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    res.json(gifts);
  } catch (error) {
    next(error);
  }
});

// GET SINGLE GIFT
// /api/gifts/:id
router.get("/:id", async (req, res, next) => {
  try {
    const db = await connectToDatabase();

    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid item id"
      });
    }

    const gift = await db.collection("items").findOne({
      _id: new ObjectId(req.params.id)
    });

    if (!gift) {
      return res.status(404).json({
        message: "Item not found"
      });
    }

    res.json(gift);
  } catch (error) {
    next(error);
  }
});

export default router;