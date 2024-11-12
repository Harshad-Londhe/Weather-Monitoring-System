import React from 'react';
import './WeatherDisplay.css';

const WeatherDisplay = ({ data, loading }) => {
    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="weather-display">
            <h2>Weather in {data.name}, {data.sys.country}</h2>
            <div className="weather-info">
                <p>Temperature: {data.main.temp}°C</p>
                <p>Humidity: {data.main.humidity}%</p>
                <p>Wind Speed: {data.wind.speed} km/h</p>
                <p>Pressure: {data.main.pressure} hPa</p>
            </div>
        </div>
    );
};

export default WeatherDisplay;
