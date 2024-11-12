require('dotenv').config(); // Loads environment variables from a .env file
// const express = require('express');
// const axios = require('axios');
// const Weather = require('../models/Weather');
// const router = express.Router();

// // Define route to fetch and store weather data
// router.get('/', async (req, res) => {
//   const city = req.query.city;
  
//   // Check if city is provided in the query
//   if (!city) {
//     return res.status(400).json({ error: 'City is required' });
//   }

//   try {
//     // Fetch weather data from OpenWeather API
//     const response = await axios.get(
//       `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
//     );
    
//     const weatherData = response.data;

//     // Prepare the data according to the schema
//     const newWeatherEntry = new Weather({
//       city: city,
//       temperature: weatherData.main.temp,
//       humidity: weatherData.main.humidity,
//       windSpeed: weatherData.wind.speed,
//       pressure: weatherData.main.pressure,
//     });

//     // Save the weather data to MongoDB
//     await newWeatherEntry.save();

//     // Send the saved weather entry as the response
//     res.json(newWeatherEntry);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Error fetching or saving weather data' });
//   }
// });

// module.exports = router;

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/db'); // Assuming you have a separate file for MongoDB connection
const weatherRoutes = require('./routes/weather'); // Import weather routes

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // For parsing JSON request bodies
app.use(cors()); // Enable CORS for frontend to communicate with the backend

// Connect to MongoDB
connectDB();

// Use the weather routes for the /api/weather endpoint
app.use('/api/weather', weatherRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
