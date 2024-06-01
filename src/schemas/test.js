import mongoose from "../config/mongoose.js";

const testSchema = mongoose.Schema({
  id: { type: String },
  email: { type: String, unique: true },
  verified_email: { type: Boolean },
  name: { type: String },
  family_name: { type: String },
  picture: { type: String },
  locale: { type: String },
  hd: { type: String },
  token: { type: String },
});

const User = mongoose.model("User", testSchema);

export default User;
