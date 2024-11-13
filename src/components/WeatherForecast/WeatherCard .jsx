import React from 'react';

const WeatherCard = ({ city, temp, humidity, windSpeed, weatherDescription, visibility }) => {
  return (
    <div className="weather-card">
      <h2>{city}</h2>
      <p>Temperature: {temp}°C</p>
      <p>Humidity: {humidity}%</p>
      <p>Wind Speed: {windSpeed} m/s</p>
      <p>Description: {weatherDescription}</p>
      <p>Visibility: {visibility / 1000} km</p>
    </div>
  );
};

export default WeatherCard;
