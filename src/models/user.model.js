const mongoose = require("mongoose");

const authSchema = new mongoose.Schema(
  {
    email: { type: String },
    password: { type: String },
  },
  { timestamps: true }
);

const Auth = mongoose.model("user", authSchema);
module.exports = Auth;
