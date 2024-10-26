// routes/registerInternational.js

const express = require('express');
const RegistrationInternational = require('../models/RegistrationInternational');
const nodemailer = require('nodemailer');
const router = express.Router();

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use other email services too
  auth: {
    user: 'soberclub2024@gmail.com', // Your email
    pass: 'bjdtuagsfjlxajrh', // Your email password or app password
  },
});

// Registration route
router.post('/', async (req, res) => {
  const { email, fullName, university, location, internshipArea, comments } = req.body;

  try {
    const newRegistration = new RegistrationInternational({
      email,
      fullName,
      university,
      location,
      internshipArea,
      comments,
    });

    await newRegistration.save();

    // Email options
    const mailOptions = {
      from: '"Sober Club Rwanda" <soberclub2024@gmail.com>', // Sender address
      to: email, // List of recipients
      subject: 'Thank you for registering with Gama Global Network!', // Subject line
      text: `Dear ${fullName},\n\nThank you for your interest in Gama Global Network Internship Program. Your application is well received.\n\nBest regards,\n\nSober Club Rwanda Team.`, // Plain text body
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    return res.status(201).json({ message: 'Registration successful! A confirmation email has been sent.' });
  } catch (error) {
    console.error('Error saving registration:', error);
    return res.status(400).json({ message: 'Registration validation failed', errors: error.errors });
  }
});

module.exports = router;
