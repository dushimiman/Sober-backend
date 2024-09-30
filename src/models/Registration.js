// models/Registration.js
const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  email: { type: String, required: true },
  fullName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  modeOfStudy: { type: String, required: true },
  languages: { type: [String], required: true },
  trainings: { type: [String], required: true },
  programOfStudy: { type: String, required: true },
  location: { type: String, required: true },
  comments: { type: String, required: false }
}, { timestamps: true }); // Optional: Add timestamps for createdAt and updatedAt

const Registration = mongoose.model('Registration', registrationSchema);

module.exports = Registration;
