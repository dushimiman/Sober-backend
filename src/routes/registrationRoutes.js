const express = require('express');
const nodemailer = require('nodemailer');
const Registration = require('../models/Registration'); // Ensure the path is correct
const router = express.Router();

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email service
  auth: {
    user: 'soberclub2024@gmail.com',    // Your email address
    pass: 'bjdtuagsfjlxajrh',      // Your email password (consider using an app password if 2FA is enabled)
  },
});

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

// API Route for registering a new user
router.post('/register', async (req, res) => {
  const { email, fullName, phoneNumber, modeOfStudy, languages, trainings, programOfStudy, location, comments } = req.body;

  try {
    // Check if the email already exists in the database
    const existingRegistration = await Registration.findOne({ email });
    if (existingRegistration) {
      return res.status(409).json({ message: 'This email is already registered. Please use a different email.' });
    }

    // Save registration data to the database
    const newRegistration = new Registration({
      email, 
      fullName, 
      phoneNumber, 
      modeOfStudy, 
      languages, 
      trainings, 
      programOfStudy, 
      location, 
      comments
    });
    await newRegistration.save();

    // Send email notification
    const transporter = nodemailer.createTransport({
      service: 'Gmail', 
      auth: {
        user: 'soberclub2024@gmail.com',
        pass: 'bjdtuagsfjlxajrh',
      },
    });

    const mailOptions = {
      from: '"Sober Club Rwanda" <soberclub2024@gmail.com>',
      to: email,
      subject: 'Thank you for registering with Sober Club!',
      text: `Dear ${fullName},\n\nThank you for your interest in Sober Club Languages and Trainings. Your application is well received.\n\nBest regards,\n\nSober Club Rwanda Team.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error sending email:', error);
        return res.status(500).json({ message: 'Registration successful, but failed to send email.' });
      }
      console.log('Email sent: ' + info.response);
    });

    return res.status(201).json({ message: 'Registration successful!' });
  } catch (error) {
    console.error('Error during registration:', error);
    return res.status(500).json({ message: 'Registration failed.' });
  }
});
module.exports = router;
