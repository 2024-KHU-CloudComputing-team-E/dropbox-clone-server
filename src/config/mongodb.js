import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.MONGO_URI;
let db;

const connectDB = async () => {
  if (db) return db; // 이미 연결되어 있는 경우, 동일한 DB 객체 반환

  try {
    const client = await new MongoClient(url).connect();
    console.log("DB 연결 성공");
    db = client.db("forum");
    return db;
  } catch (err) {
    console.error("DB 연결 실패:", err);
    throw err; // 에러를 던져 호출한 곳에서 처리할 수 있도록 함
  }
};

export default connectDB;
