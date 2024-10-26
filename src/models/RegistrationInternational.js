// models/RegistrationInternational.js

const mongoose = require('mongoose');

const registrationInternationalSchema = new mongoose.Schema({
  email: { type: String, required: true },
  fullName: { type: String, required: true },
  university: { type: String, required: true },
  location: { type: String, required: true },
  internshipArea: { type: [String], required: true }, // Array to store multiple areas
  comments: { type: String },
});

const RegistrationInternational = mongoose.model('RegistrationInternational', registrationInternationalSchema);

module.exports = RegistrationInternational;
