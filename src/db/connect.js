import mongoose from "mongoose";
mongoose // 몽구스를 이용해서 mongoDB에 연결
  .connect(
    "mongodb+srv://zackinthebox:qlqjs4wkfl!@cluster0.wsv9sfu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

export default mongoose;
