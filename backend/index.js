const express = require("express");
const bodyParser = require("body-parser");
const Login = require("./routes/login");
const Signup = require("./routes/signup");
const database = require("./data/db-connection");
const cors = require("cors");

require("dotenv").config();

const app = express();
var port = process.env.PORT_PROD || 8080;

if (process.env.NODE_ENV === "test") {
  port = process.env.PORT_TEST;
}

const test = process.env.DB_NAME || "no";
console.log(test);

const test2 = process.env.DB_CONN_STRING || "no";
console.log(test2);

app.use((err, req, res, next) => {
  console.log(err);
  next();
});

//Kann raus, momentan zum testen drin
// database.query("SELECT NOW()", (error, result) => {
//   if (error) {
//     throw error;
//   }
//   console.log(result);
// });

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
  res.header("Access-Control-Allow-Headers: Authorization");
  res.header("Access-Control-Allow-Headers: Token");
  next();
});

app.get("/", (req, res) => res.json({ message: "Server is running." }));

app.use("/signup", Signup);
app.use("/login", Login);

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});

module.exports = app;
