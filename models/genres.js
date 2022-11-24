const Joi = require("joi");
const mongoose = require("mongoose");

const Genre = mongoose.model(
  "Genre",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
  })
);

function validate(genre) {
  const schema = Joi.object({
    name: Joi.string().required().min(3),
  });

  return schema.validate(genre);
}

exports.Genre = Genre;
exports.validate = validate;
