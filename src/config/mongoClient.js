import { MongoClient } from "mongodb";

let db;

const connectDB = async () => {
  if (db) return db; // 이미 연결되어 있는 경우, 동일한 DB 객체 반환
  const url = `${process.env.MONGO_URI}`;

  try {
    // mongoDB client 연결
    const client = await new MongoClient(url).connect();
    console.log("Connected to MongoDB with MongoClient");
    // test 이라는 이름의 데이터베이스 선택
    db = client.db("test");
    return db;
  } catch (err) {
    console.error("Failed to connect MongoDB with MongoClient : ", err);
    throw err; // 에러를 던져 호출한 곳에서 처리할 수 있도록 함
  }
};

export default connectDB;
