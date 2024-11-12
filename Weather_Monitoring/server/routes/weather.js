require('dotenv').config(); // Loads environment variables from a .env file
const express = require('express');
const axios = require('axios');
const Weather = require('../models/Weather');
const router = express.Router();

// Define route to fetch and store weather data
router.get('/', async (req, res) => {
  const city = req.query.city;
  
  // Check if city is provided in the query
  if (!city) {
    return res.status(400).json({ error: 'City is required' });
  }

  try {
    // Fetch weather data from OpenWeather API
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
    );
    
    const weatherData = response.data;

    // Prepare the data according to the schema
    const newWeatherEntry = new Weather({
      city: city,
      temperature: weatherData.main.temp,
      humidity: weatherData.main.humidity,
      windSpeed: weatherData.wind.speed,
      pressure: weatherData.main.pressure,
    });

    // Save the weather data to MongoDB
    await newWeatherEntry.save();

    // Send the saved weather entry as the response
    res.json(newWeatherEntry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching or saving weather data' });
  }
});

// Define POST route to manually save weather data
router.post('/', async (req, res) => {
  const { city, temperature, humidity, windSpeed, pressure } = req.body;

  if (!city || !temperature || !humidity || !windSpeed || !pressure) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Create a new weather entry
    const newWeatherEntry = new Weather({
      city,
      temperature,
      humidity,
      windSpeed,
      pressure,
    });

    // Save the weather data to MongoDB
    await newWeatherEntry.save();

    // Send the saved weather entry as the response
    res.json(newWeatherEntry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error saving weather data' });
  }
});

module.exports = router;
