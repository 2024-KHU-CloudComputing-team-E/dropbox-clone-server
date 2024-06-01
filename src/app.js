import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

dotenv.config();

const startServer = async () => {
  try {
    // const db = await connectDB();

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
