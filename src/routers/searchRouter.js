import express from "express";
import User from "../schemas/user.js";
import File from "../schemas/file.js";

const searchRouter = express.Router();

searchRouter.get("/:keyword", async (req, res) => {
  try {
    const userArray = await User.find({
      userName: new RegExp(req.params.keyword),
    });
    const fileArray = await File.find({
      fileName: new RegExp(req.params.keyword),
    });
    res.send({ users: userArray, files: fileArray });
  } catch (err) {
    res.send(err);
  }
});

export default searchRouter;
