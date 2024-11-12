import React, { useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import WeatherMap from './components/WeatherMap'; // Import the WeatherMap component
import 'leaflet/dist/leaflet.css';

const App = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [searchedCity, setSearchedCity] = useState(''); // State to store the searched city
    const apiKey = '4ddc06d620fee14cc0f35a4b7a3f723f';

    // Function to handle city search
    const handleSearch = async (city) => {
        setSearchedCity(city); // Update searchedCity state

        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
            );
            const data = await response.json();

            // Check for a successful response
            if (response.ok) {
                setWeatherData(data);
                // Save weather data to MongoDB
                await saveWeatherToDatabase(city, data.main.temp, data.main.humidity, data.wind.speed, data.main.pressure);
            } else {
                alert(`City not found: ${data.message}`); // Show error message from OpenWeather API
            }
        } catch (error) {
            console.error("Error fetching weather data:", error);
            alert("An error occurred while fetching the weather data.");
        }
    };

    // Function to save weather data to MongoDB
    const saveWeatherToDatabase = async (city, temperature, humidity, windSpeed, pressure) => {
        try {
            const response = await fetch('http://localhost:5000/api/weather', { // Ensure the correct endpoint for saving weather data
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    city,
                    temperature,
                    humidity,
                    windSpeed,
                    pressure,
                }),
            });
            const result = await response.json();
            if (response.ok) {
                console.log('Weather data saved to MongoDB:', result);
            } else {
                console.error('Error saving weather data:', result.message);
            }
        } catch (error) {
            console.error('Error connecting to the backend:', error);
        }
    };

    return (
        <div className="app-container">
            <SearchBar onSearch={handleSearch} />
            {weatherData && <WeatherDisplay data={weatherData} />}
            <WeatherMap weatherData={weatherData} searchedCity={searchedCity} /> {/* Pass searchedCity and weatherData to WeatherMap */}
        </div>
    );
};

export default App;
