const express = require('express');
const router = express.Router();
const RegistrationInternational = require('../models/RegistrationInternational');

// GET all international registrations
router.get('/registrations', async (req, res) => {
  try {
    const registrations = await RegistrationInternational.find();
    res.json(registrations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching registrations' });
  }
});

module.exports = router;
