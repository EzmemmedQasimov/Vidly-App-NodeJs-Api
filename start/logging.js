require("express-async-errors");
const winston = require("winston");
require("winston-mongodb");

module.exports = function () {
  process.on("uncaughtException", (ex) => {
    winston.error(ex.message, ex);
  });

  winston.add(new winston.transports.File({ filename: "logfile.log" }));
  winston.add(
    new winston.transports.MongoDB({
      db: "mongodb://127.0.0.1:27017/vidly",
    })
  );
};
