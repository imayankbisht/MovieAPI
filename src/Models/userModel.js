const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String
  },
  password: {
    type: String
  },
  email: {
    type: String
  },
  phone: {
    type: String
  },
  profession: {
    type: String
  }
});

const userschema = mongoose.model("User", userSchema);

module.exports = userschema;
