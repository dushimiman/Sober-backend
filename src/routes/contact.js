const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// Set up transporter for Nodemailer with hardcoded credentials
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use 'gmail' or any other email service provider
  auth: {
    user: 'soberclub2024@gmail.com',       // Replace with your email
    pass: 'bjdtuagsfjlxajrh',          // Replace with your email password
  },
});

// Route to handle contact form submissions
router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const mailOptions = {
    from: email,
    to: 'soberclub2024@gmail.com',          // Replace with your email to receive messages
    subject: `Contact Form: ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Your message has been sent. Thank you!' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while sending your message' });
  }
});

module.exports = router;
