import mongoose from "../config/mongoose.js";

const userSchema = new mongoose.Schema({
  userId: {
    type: Number,
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
  Followers: { type: Array },
  Followings: { type: Array },
  token: { type: String },
});

const User = mongoose.model("User", userSchema);

export default User;
