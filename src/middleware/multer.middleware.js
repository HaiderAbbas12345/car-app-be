const multer = require("multer");
const fs = require("fs").promises;
const { v4: uuidv4 } = require("uuid");

const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    const folderPath = `./public/kyc/${new Date().toISOString().slice(0, 10)}`;
    try {
      await fs.mkdir(folderPath, { recursive: true });
      cb(null, folderPath);
    } catch (err) {
      console.error("Error creating directory:", err);
      cb(err, folderPath);
    }
  },
  filename: function (req, file, cb) {
    const uniqueFileName = `${uuidv4()}_${file.originalname}`;
    cb(null, uniqueFileName);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
