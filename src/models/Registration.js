// models/Registration.js
const mongoose = require('mongoose');

const RegistrationSchema = new mongoose.Schema({
  email: { type: String, required: true },
  fullName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  modeOfStudy: { type: String, required: true },
  languages: { type: [String], required: true },
  trainings: { type: [String], required: true },
  programOfStudy: { type: String, required: true },
  location: { type: String, required: true },
  comments: { type: String, required: false },
});

module.exports = mongoose.model('Registration', RegistrationSchema);
