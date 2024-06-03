import mongoose from "../config/mongoose.js";

const testCommentSchema = mongoose.Schema({
  author: { type: String },
  content: { type: String },
  createAt: { type: Date, default: Date.now },
});

const comments = mongoose.model("Comments", testCommentSchema);

export default comments;
