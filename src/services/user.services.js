const User = require("../models/auth.model");

const incrementUserPoints = async (data) => {
  try {
    const user = await User.findByIdAndUpdate(
      data.userId,
      { $inc: { coins: data.points }, currentLevel: data.level },
      { new: true }
    );
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  incrementUserPoints,
};
