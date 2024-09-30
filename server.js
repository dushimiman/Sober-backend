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
  .catch(err => console.log('MongoDB Atlas connection error:', err));

// API Route for form submission
app.post('/api/register', async (req, res) => {
  try {
    const {
      email,
      fullName,
      phoneNumber,
      yourEmails,
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
      yourEmails,
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
    console.error(err);
    res.status(500).json({ error: 'Server error, please try again' });
  }
});

// Use the routes
app.use('/', registrationRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
