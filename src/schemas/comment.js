import mongoose from "../config/mongoose.js";

const commentSchema = mongoose.Schema({
  author: { type: String },
  comment: { type: String },
  fileId: {},
  createAt: { type: Date, default: Date.now },
});

const comments = mongoose.model("Comments", commentSchema);

export default comments;
