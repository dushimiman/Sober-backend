// routes/registrationRoutes.js
const express = require('express');
const Registration = require('../models/Registration'); // Ensure the path is correct
const router = express.Router();

// API Route for getting all registrations
router.get('/registrations', async (req, res) => {
  console.log("GET /api/registrations called"); // Debugging line
  try {
    const registrations = await Registration.find();
    res.status(200).json(registrations);
  } catch (error) {
    console.error("Error fetching registrations:", error); // Log the error
    res.status(500).json({ message: 'Failed to fetch registrations' });
  }
});

module.exports = router;
