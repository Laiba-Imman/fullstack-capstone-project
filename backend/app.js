import express from "express";
import cors from "cors";

import giftRoutes from "./routes/giftRoutes.js";
import searchRoutes from "./routes/searchRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    name: "GiftLink API",
    message: "Give useful household items a second life."
  });
});

// REQUIRED BY TASK 7
app.use("/api/search", searchRoutes);

app.use("/api/gifts", giftRoutes);

app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    message: "Internal server error"
  });
});

export default app;