import mongoose from "mongoose";

const url = `${process.env.MONGO_URI}`;

mongoose // 몽구스를 이용해서 mongoDB에 연결
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB with Mongoose"))
  .catch((err) => console.log(err));

export default mongoose;
