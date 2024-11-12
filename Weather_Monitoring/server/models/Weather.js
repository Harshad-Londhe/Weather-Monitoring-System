const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
  city: { type: String, required: true },
  temperature: { type: Number, required: true },
  humidity: { type: Number, required: true },
  windSpeed: { type: Number, required: true },
  pressure: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

const Weather = mongoose.model('Weather', weatherSchema);

module.exports = Weather;
