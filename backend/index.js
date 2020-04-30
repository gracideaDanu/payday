const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Category = require("./models/category");
const Login = require("./routes/login");
const Signup = require("./routes/signup");
const { Client, Pool } = require("pg");

require("dotenv").config();

const app = express();

const port = process.env.PORT || 8080;
const url = process.env.DB_CONN;

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.log(err));

mongoose.Promise = global.Promise;

app.use((err, req, res, next) => {
  console.log(err);
  next();
});

const isProduction = process.env.NODE_ENV === "production";

const connectionString = `postgresql://postgres-payday-root:postgres-payday-password@postgres:5432/payday`;

const pool = new Pool({
  connectionString: connectionString,
});

pool.query("SELECT NOW()", (error, result) => {
  if (error) {
    throw error;
  }
  console.log(result);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/json" }));

app.get("/", (req, res) => res.json({ message: "Server is running." }));

app.post("/api/category", async (req, res) => {
  console.log("Zu erstellende Kategorie:");
  console.log(req.body);
  if (req.body.name && req.body.image) {
    await Category.create(req.body).then((data) => res.status(201).json(data));
  } else {
    res.json({
      error: "Kategorie konnte nicht erstellt werden.",
    });
  }
});

app.use("/signup", Signup);
app.use("/login", Login);

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});

module.exports = app;
