const mongoose = require("mongoose");

const UserAuth = mongoose.model(
  "UserAuth",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String
  })
);

module.exports = UserAuth;