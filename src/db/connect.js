import { MongoClient } from "mongodb";
let db;
const url =
  "mongodb+srv://admin:qwer1234@cluster0.htbq4dt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
new MongoClient(url)
  .connect()
  .then((client) => {
    console.log("DB연결성공"); // DB 연결 성공 여부 확인 메시지
    db = client.db("forum");
  })
  .catch((err) => {
    console.log(err);
  });
