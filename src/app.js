import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import connectDB from "./config/mongoClient.js";

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const startServer = async () => {
  try {
    const db = connectDB;

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log(`✅ Server Listening on port http://localhost:${PORT} 🚀`);
    });
  } catch (err) {
    console.error("Failed to start server", err);
  }
};

startServer();

export default app;