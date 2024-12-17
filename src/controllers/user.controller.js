const User = require("../models/user.model");
const { genrateToken } = require("../utils/helper");

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log("", email, password);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else if (password !== user.password) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect Password" });
    }

    const token = genrateToken(user);

    res.status(201).json({
      success: true,
      data: user,
      token,
      message: "User registered successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  login,
};
