const express = require("express");
const router = express.Router();
const { createCar } = require("../controllers/car.controller");
const validateJWT = require("../middleware/verifyToken.middleware");
const upload = require("../middleware/multer.middleware");

router.post("/submit", validateJWT, upload.array("images", 10), createCar);

module.exports = router;
