const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  token: String,
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
