require("dotenv").config();

const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const SECRET_KEY = process.env.SECRET_KEY;

const checkForMissingKeysInObject = (object, keys) => {
  const missingFields = [];
  for (let key of keys) {
    if (!(key in object)) {
      missingFields.push(key);
    }
  }
  return missingFields.length > 0 ? missingFields : null;
};

const genrateOtp = (len) => {
  return crypto
    .randomBytes(Math.ceil(len / 2))
    .toString("hex") // convert to hexadecimal format
    .slice(0, len)
    .toLowerCase(); // return required number of characters
};

const genrateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
    },
    SECRET_KEY
    // {
    //   expiresIn: "1d",
    // }
  );
};

// Function to remove an image file
const removeImage = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Error deleting file:", err);
    } else {
      console.log("File deleted successfully");
    }
  });
};

const abortDbSession = async (session) => {
  try {
    await session.abortTransaction();
    await session.endSession();
  } catch (error) {
    console.error("Error aborting transaction:", error.message);
  }
};

const isValidBase64Image = (base64String) => {
  const base64Pattern =
    /^data:image\/(jpeg|png|gif|bmp|webp);base64,([A-Za-z0-9+/=]+)$/;
  return base64Pattern.test(base64String);
};

const readDataFromFile = (filePath) => {
  if (!fs.existsSync(filePath)) {
    return null;
  }
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data);
};

const writeDataToFile = (data, file) => {
  const dirPath = path.join("public", "files");
  const filePath = path.join(dirPath, file);
  // Ensure the directory exists
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  // Write the data to the file
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
};

module.exports = {
  checkForMissingKeysInObject,
  genrateOtp,
  genrateToken,
  abortDbSession,
  removeImage,
  isValidBase64Image,
  readDataFromFile,
  writeDataToFile,
};
