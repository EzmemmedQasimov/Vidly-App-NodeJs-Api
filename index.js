const mongoose = require("mongoose");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const express = require("express");
const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/vidly")

  .then(() => console.log("Connected to mongodb"))

  .catch((err) => console.log("Connection in error", err));

app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
