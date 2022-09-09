require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("See documentation URL/api-docs/#/");
});

app.listen(port, () => {
  console.log("Server is up and running on port : " + port);
});