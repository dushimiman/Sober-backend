// routes/registrationRoutes.js
const express = require('express');
const Registration = require('../models/Registration'); // Adjust the path as needed
const router = express.Router();

// API Route for getting all registrations
router.get('/api/registrations', async (req, res) => {
  try {
    const registrations = await Registration.find();
    res.status(200).json(registrations);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch registrations' });
  }
});

module.exports = router;
