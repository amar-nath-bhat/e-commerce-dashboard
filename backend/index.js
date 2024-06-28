const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./db/config");
const bodyParser = require("body-parser");
const router = require("./routes/route");

const app = express();

app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});
app.use(cors());
app.use("/", router);
dotenv.config();

const PORT = process.env.PORT || 5000;

db.connect();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
