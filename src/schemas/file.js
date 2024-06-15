const mongoose = require("mongoose");

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
  url: {
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

module.exports = mongoose.model("File", fileSchema);
