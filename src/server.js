// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const registrationRoutes = require('./routes/registrationRoutes'); 
const registerInternationalRoutes = require('./routes/registerInternational'); 

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

// Use the registration routes
app.use('/api', registrationRoutes);
app.use('/api/registerinternational', registerInternationalRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
