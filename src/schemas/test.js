import mongoose from "../db/connect.js";

const testSchema = mongoose.Schema({
  id: { type: String },
  email: { type: String },
  verified_email: { type: Boolean },
  name: { type: String },
  family_name: { type: String },
  picture: { type: String },
  locale: { type: String },
  hd: { type: String },
});

const User = mongoose.model("User", testSchema);

export default User;
