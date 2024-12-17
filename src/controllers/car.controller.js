const Car = require("../models/car.model");
const { removeImage } = require("../utils/helper");

const createCar = async (req, res) => {
  try {
    const userId = req.user.id;
    const { carModel, price, phoneNumber, maxPictures } = req.body;

    // Validate that all required fields are present
    if (!carModel || !price || !phoneNumber || !maxPictures) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Validate image upload count
    if (req.files.length > maxPictures) {
      return res.status(400).json({
        error: `You can only upload a maximum of ${maxPictures} images.`,
      });
    }

    // Prepare image URLs for storage
    const images = req.files.map((file) => file.path);

    // Create a new car entry in the database
    const newCar = new Car({
      userId,
      carModel,
      price,
      phoneNumber,
      maxPictures,
      images,
    });

    // Save to the database
    await newCar.save();

    res.status(200).json({
      message: "Car details submitted successfully!",
      carData: newCar,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong." });
  }
};

module.exports = {
  createCar,
};
