import mongoose from "../config/mongoose.js";

const fileSchema = new mongoose.Schema({
  owner: {
    type: String,
    required: true,
  },
  fileName: {
    type: String,
    required: true,
    unique: true,
  },
  size: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  aiType: {
    type: [{ type: String }],
  },
  comments: {
    type: [{ userName: { type: String }, comment: { type: String } }],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  expiredAt: {
    type: Date,
    default: Date.now,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  deletedAt: {
    type: Date,
    default: Date.now,
  },
});

const File = mongoose.model("File", fileSchema);

export default File;
