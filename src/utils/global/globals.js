const mongoose = require("mongoose");

const bankSchema = new mongoose.Schema({
  fullName: String,
  name: String,
  accountNumber: String,
  IBAN: String,
});

const cookieOptions = {
  httpOnly: false,
  secure: true,
  sameSite: "None",
  path: "/",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

// {
//   httpOnly: true,
//   secure: process.env.NODE_ENV === "production",
//   sameSite: "strict",
//   maxAge: 7 * 24 * 60 * 60 * 1000,
// }

module.exports = { cookieOptions, bankSchema };
