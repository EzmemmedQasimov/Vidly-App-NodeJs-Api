require("express-async-errors");
const winston = require("winston");
require("winston-mongodb");
const mongoose = require("mongoose");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const users = require("./routes/users");
const auth = require("./routes/auth");
const express = require("express");
const error = require("./middlewares/error");
const app = express();

process.on("uncaughtException", (ex) => {
  winston.error(ex.message, ex);
});

winston.add(new winston.transports.File({ filename: "logfile.log" }));
winston.add(
  new winston.transports.MongoDB({
    db: "mongodb://127.0.0.1:27017/vidly",
  })
);

const p = Promise.reject(new Error("Test unhandled Promise Rejections"));
p.then(() => {
  console.log("Done");
});

mongoose
  .connect("mongodb://127.0.0.1:27017/vidly")

  .then(() => console.log("Connected to mongodb"))

  .catch((err) => console.log("Connection in error", err));

app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use(error);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
