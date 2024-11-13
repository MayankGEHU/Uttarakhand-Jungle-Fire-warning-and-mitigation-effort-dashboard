import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherCard from './WeatherCard ';
import DailyForecast from './DailyForecast ';
import HourlyForecast from './HourlyForecast';
import '../WeatherForecast/WeatherDashboard.css'
const API_KEY = '710b86a2f99df3be61bf8ce424b35544';

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [hourlyData, setHourlyData] = useState([]);
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const fetchWeather = async (city) => {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
          params: {
            q: city,
            appid: API_KEY,
            units: 'metric', 
          },
        });
        setWeatherData(response.data);
        const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast`, {
          params: {
            q: city,
            appid: API_KEY,
            units: 'metric',
          },
        });
        setHourlyData(forecastResponse.data.list.slice(0, 8)); 
        setDailyData(forecastResponse.data.list); 
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };
    fetchWeather('Uttarakhand, IN');
  }, []);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const { name, main, weather, wind, visibility } = weatherData;

  return (
    <div className="weather-dashboard">
      <WeatherCard
        city={name}
        temp={main.temp}
        humidity={main.humidity}
        windSpeed={wind.speed}
        weatherDescription={weather[0].description}
        visibility={visibility}
      />
      <HourlyForecast hourlyData={hourlyData} />
      <DailyForecast dailyData={dailyData} />
    </div>
  );
};

export default WeatherDashboard;