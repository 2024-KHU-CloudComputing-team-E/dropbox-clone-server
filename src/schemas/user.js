import mongoose from "../config/mongoose.js";

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  provider: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  token: { type: String },
  followers: {
    type: [
      {
        userId: { type: String, required: true },
        userName: { type: String, required: true },
      },
    ],
    default: [],
  },
  followings: {
    type: [
      {
        userId: { type: String, required: true },
        userName: { type: String, required: true },
      },
    ],
    default: [],
  },
});

const User = mongoose.model("User", userSchema);

export default User;
