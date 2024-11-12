const express = require('express');
const axios = require('axios');
const WeatherData = require('../models/WeatherData');
const router = express.Router();

router.get('/weather', async (req, res) => {
  const city = req.query.city;

  if (!city) {
    return res.status(400).json({ message: 'City is required' });
  }

  try {
    // Fetch data from OpenWeather API
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`);
    const data = response.data;

    // Create a new weather record
    const newWeather = new WeatherData({
      city: data.name,
      temperature: data.main.temp,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      pressure: data.main.pressure,
    });

    // Save the weather data to MongoDB
    await newWeather.save();

    res.status(200).json({ message: 'Weather data saved successfully', data: newWeather });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching weather data' });
  }
});

module.exports = router;
