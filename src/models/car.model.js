const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    carModel: {
      type: String,
      required: [true, "Car Model is required"],
      minlength: [3, "Car Model must be at least 3 characters long"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [1, "Price must be greater than 0"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone Number is required"],
      match: [/^\d{11}$/, "Phone Number must be exactly 11 digits"],
    },
    maxPictures: {
      type: Number,
      required: [true, "Max Pictures is required"],
      min: [1, "At least 1 picture is required"],
      max: [10, "Max Pictures cannot exceed 10"],
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Car", carSchema);
