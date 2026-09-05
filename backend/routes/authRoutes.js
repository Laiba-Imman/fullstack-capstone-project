import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "../db.js";

const router = express.Router();

function createToken(user) {
  return jwt.sign(
    {
      id: user._id.toString(),
      email: user.email
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d"
    }
  );
}


// =============================
// REGISTER
// =============================

router.post("/register", async (req, res, next) => {
  try {
    const db = await connectToDatabase();

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required"
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await db.collection("users").findOne({
      email: normalizedEmail
    });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      createdAt: new Date()
    };

    const result = await db
      .collection("users")
      .insertOne(user);

    const savedUser = {
      _id: result.insertedId,
      ...user
    };

    res.status(201).json({
      message: "Registration successful",

      token: createToken(savedUser),

      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email
      }
    });

  } catch (error) {
    next(error);
  }
});


// =============================
// LOGIN
// =============================

router.post("/login", async (req, res, next) => {
  try {
    const db = await connectToDatabase();

    const { email, password } = req.body;

    const user = await db.collection("users").findOne({
      email: email?.trim().toLowerCase()
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const passwordMatches = await bcrypt.compare(
      password || "",
      user.password
    );

    if (!passwordMatches) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    res.json({
      message: "Login successful",

      token: createToken(user),

      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    next(error);
  }
});


// =============================
// UPDATE USER
// =============================

router.patch("/:id", async (req, res, next) => {
  try {
    const db = await connectToDatabase();

    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid user id"
      });
    }

    const updates = {};

    if (typeof req.body.name === "string") {
      updates.name = req.body.name.trim();
    }

    if (typeof req.body.email === "string") {
      updates.email = req.body.email.trim().toLowerCase();
    }

    const updatedUser =
      await db.collection("users").findOneAndUpdate(
        {
          _id: new ObjectId(req.params.id)
        },
        {
          $set: updates
        },
        {
          returnDocument: "after"
        }
      );

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json({
      message: "User information updated",

      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email
      }
    });

  } catch (error) {
    next(error);
  }
});

export default router;