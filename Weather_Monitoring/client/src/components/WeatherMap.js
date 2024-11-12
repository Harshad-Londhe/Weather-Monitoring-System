import React, { useState, useEffect } from 'react';
import './WeatherMap.css'
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const WeatherMap = ({ weatherData, searchedCity }) => {
    const [zoom, setZoom] = useState(1);
    const [center, setCenter] = useState([0, 20]); // Initial map center
    const [history, setHistory] = useState([]);

    // Update center and zoom when a new city is searched
    useEffect(() => {
        if (weatherData && weatherData.coord) {
            const { lon, lat } = weatherData.coord;
            setCenter([lon, lat]);
            setZoom(4); // Zoom in on the searched city
            // Add the current city to the history if not already added
            setHistory((prevHistory) => {
                const exists = prevHistory.some(
                    (city) => city.lon === lon && city.lat === lat
                );
                return exists ? prevHistory : [...prevHistory, { lon, lat, name: searchedCity }];
            });
        }
    }, [weatherData, searchedCity]);

    // Zoom-in and Zoom-out functions
    const zoomIn = () => setZoom((z) => Math.min(z + 1, 10));
    const zoomOut = () => setZoom((z) => Math.max(z - 1, 1));

    // Function to calculate marker size based on zoom level
    const getMarkerSize = () => {
        // Marker size will increase with zoom level
        return Math.max(6, 10 - zoom); // This makes the marker smaller as you zoom out
    };

    return (
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            {/* Zoom In/Out Controls */}
            <div style={{ textAlign: "center", margin: "10px 0" }}>
                <button onClick={zoomIn}>Zoom In</button>
                <button onClick={zoomOut}>Zoom Out</button>
            </div>

            {/* Map */}
            <ComposableMap>
                <ZoomableGroup center={center} zoom={zoom} onMoveEnd={(position) => setZoom(position.zoom)}>
                    <Geographies geography={geoUrl}>
                        {({ geographies }) =>
                            geographies.map((geo) => (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    fill="#DDD"
                                    stroke="#AAA"
                                    style={{
                                        default: { outline: "none" },
                                        hover: { fill: "#F53", outline: "none" },
                                        pressed: { fill: "#E42", outline: "none" },
                                    }}
                                />
                            ))
                        }
                    </Geographies>
                    {/* Display markers for all visited cities in history */}
                    {history.map(({ lon, lat, name }, index) => (
                        <Marker key={index} coordinates={[lon, lat]}>
                            <circle r={getMarkerSize()} fill={name === searchedCity ? "#FF5533" : "#00aaff"} />
                            <text
                                textAnchor="middle"
                                y={-10}
                                style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
                            >
                                {name}
                            </text>
                        </Marker>
                    ))}
                </ZoomableGroup>
            </ComposableMap>
        </div>
    );
};

export default WeatherMap;
