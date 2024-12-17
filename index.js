const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const DB = require("./config/db");

const app = express();

const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: "*",
};

app.use(morgan("tiny"));
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static("public"));

app.get("/", async (req, res) => {
  res.json("Server Running Successfully");
});

app.use("/api", require("./src/routes/index"));

DB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
