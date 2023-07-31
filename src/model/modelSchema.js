const mongoose = require("mongoose");

const Model = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  highScore: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Users", Model);
