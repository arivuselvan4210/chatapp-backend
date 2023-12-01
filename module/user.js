const mongoose = require("mongoose");

const userSchma = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  isAvthar: {
    type: Boolean,
    default: false,
  },
  isAvtharImg: {
    type: String,
    default: "",
  },
});
module.exports = mongoose.model("User", userSchma);
