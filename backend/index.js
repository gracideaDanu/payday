const express = require("express");
require("dotenv").config();

const port = 8000;
const app = express();

app.use((err, req, res, next) => {
  console.log(err);
  next();
});

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
