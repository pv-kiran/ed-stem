const mongoose = require("mongoose");

const surveySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  education: {
    type: String,
  },
  gender: {
    type: String,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
});

const Survey = mongoose.model("Survey", surveySchema);
module.exports = { Survey };
