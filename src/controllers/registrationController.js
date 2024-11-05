// controllers/registrationController.js
const RegistrationInternational = require('../models/RegistrationInternational');

// Function to get all registered entries
const getAllRegistrations = async (req, res) => {
  try {
    const registrations = await RegistrationInternational.find(); // Fetch all entries
    res.status(200).json(registrations); // Send response with all entries
  } catch (error) {
    res.status(500).json({ message: 'Error fetching registrations', error });
  }
};

module.exports = { getAllRegistrations };
