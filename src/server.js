// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const registrationRoutes = require('./routes/registrationRoutes'); // Import the routes
const Registration = require('./models/Registration'); // Import the Registration model

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB Atlas
const mongoURI = 'mongodb+srv://dushimediane12:R3ZBQfPzIOQ6OpDc@soberregistration.hdkn6.mongodb.net/';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB Atlas connection error:', err));

// Use the routes
app.use('/', registrationRoutes);

// API Route for form submission
app.post('/api/register', async (req, res) => {
  try {
    const {
      email,
      fullName,
      phoneNumber,
      modeOfStudy,
      languages,
      trainings,
      programOfStudy,
      location,
      comments
    } = req.body;

    // Create a new registration entry
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

    // Save the registration data to the database
    await newRegistration.save();

    res.status(201).json({ message: 'Registration successful' });
  } catch (err) {
    console.error('Error saving registration:', err); // Log the actual error
    res.status(500).json({ error: 'Server error, please try again' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
