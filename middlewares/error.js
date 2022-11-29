module.exports = function (err, req, res, next) {
  // ToDo : Log the exception
  res.status(500).send("Something went wrong.");
};
