
# Weather Monitoring System

Weather Monitoring System is a full-stack MERN application that retrieves and displays real-time weather data for various cities. The app allows users to search for city-specific weather information and view weather details on an interactive map, with past searched cities stored in MongoDB.

## Features

- Retrieve real-time weather data using the OpenWeather API.
- Display weather details, including temperature, humidity, wind speed, and pressure.
- Interactive map with markers for searched cities.
- Search history stored in MongoDB.
- Zoom in/out functionality on the map.

## Installation

Clone the repository and use the package manager [npm](https://www.npmjs.com/) to install dependencies.

```bash
git clone https://github.com/Harshad-Londhe/Weather-Monitoring-System.git
cd weather-monitoring-system
```

### Install Dependencies

- **Backend** (Express and Node.js):
  ```bash
  cd server
  npm install
  ```

- **Frontend** (React):
  ```bash
  cd ../client
  npm install
  ```

## Environment Variables

In the **server** directory, create a `.env` file with the following variables:

```plaintext
OPENWEATHER_API_KEY=your_openweather_api_key
MONGO_URI=your_mongodb_uri
PORT=5000
```

Replace `your_openweather_api_key` with your OpenWeather API key and `your_mongodb_uri` with the MongoDB URI.

## Usage

Start both the backend and frontend servers:

1. **Start the Backend Server**:
   ```bash
   cd server
   node server.js
   ```

2. **Start the Frontend Server**:
   ```bash
   cd ../client
   npm start
   ```

The application should now be running locally. Access it in your browser at `http://localhost:3000`.

## Example API Calls

- To get weather data for a city (GET request):
  ```
  http://localhost:5000/api/weather?city=<city_name>
  ```
  Replace `<city_name>` with the desired city name.

- To store weather data in MongoDB (POST request):
  ```json
  {
    "city": "CityName",
    "temperature": 25,
    "humidity": 60,
    "windSpeed": 5,
    "pressure": 1012
  }
  ```

## Contributing

Pull requests are welcome. For major changes, please open an issue to discuss the changes you'd like to make.

Ensure all relevant tests are updated accordingly.

## License

[Apache](http://www.apache.org/licenses/LICENSE-2.0)
