const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const port = 8000;
const app = express();

app.use((err, req, res, next) => {
  console.log(err);
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/json" }));

app.get("/", (req, res) => res.json({ message: "Server is running." }));

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});

module.exports = app;
