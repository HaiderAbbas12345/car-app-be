const router = require("express").Router();

const userRouter = require("./user.routes");
const carRouter = require("./car.routes");

router.use("/user", userRouter);
router.use("/car", carRouter);

module.exports = router;
