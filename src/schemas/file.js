import mongoose from "../config/mongoose.js";

const fileSchema = new mongoose.Schema({
  /*
  owner: {
    type: mongoose.Schema.Types.ObjecId,
    ref: "User",
    required: true,
  },
  */
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
  aiType: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updateAt: {
    type: Date,
    default: Date.now,
  },
  expiredAt: {
    type: Date,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  deletedAt: {
    type: Date,
  },
});

const File = mongoose.model("File", fileSchema);

export default File;
