const express = require("express");
const bodyParser = require("body-parser");
const Login = require("./routes/login");
const Signup = require("./routes/signup");
const database = require("./data/db-connection");
const cors = require("cors");
const API = require("./routes/api");

require("dotenv").config();

const app = express();
var port = process.env.PORT_PROD || 8080;

if (process.env.NODE_ENV === "test") {
  port = process.env.PORT_TEST;
}

app.use((err, req, res, next) => {
  console.log(err);
  next();
});

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/json" }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  ); //Origin, X-Requested-With, Content-Type, Accept
  res.header("Access-Control-Allow-Headers: Authentication");
  res.header("Access-Control-Allow-Headers: Token");
  next();
});

app.get("/", (req, res) => res.json({ message: "Server is running." }));

app.use("/signup", Signup);
app.use("/login", Login);
app.use("/api", API);

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});

module.exports = app;
