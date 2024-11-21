import React, { useState, useEffect } from "react";
import "../Forcaset/WeatherApp.css";

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(false);

  const apiKey = "9505fd1df737e20152fbd78cdb289b6a";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${apiKey}`;

  const fetchWeatherData = async (city) => {
    try {
      const response = await fetch(`${apiUrl}&q=${city},Uttarakhand,IN`);
      const data = await response.json();
      if (data.cod === 200) {
        setWeatherData(data);
        setError(false);
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      fetchWeatherData(searchTerm);
    }
  };

  useEffect(() => {
    fetchWeatherData("Dehradun"); // Default city on load
  }, []);

  return (
    <div className="main-page-container">
      <main className={error ? "error" : ""}>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            id="name"
            placeholder="Search for a city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoComplete="off"
          />
          <button type="submit">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>

        {weatherData && (
          <section className="result">
            <figure className="name">
              <figcaption>{weatherData.name}</figcaption>
              <img
                src={`https://flagsapi.com/${weatherData.sys.country}/shiny/32.png`}
                alt={weatherData.sys.country}
              />
            </figure>

            <figure className="temperature">
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
                alt="weather icon"
              />
              <figcaption>
                <span>{Math.round(weatherData.main.temp)}</span>
                <sup>o</sup>
              </figcaption>
            </figure>

            <p className="description">{weatherData.weather[0].description}</p>

            <ul>
              <li>
                <span>Clouds</span>
                <i className="fa-solid fa-cloud"></i>
                <span id="clouds">{weatherData.clouds.all}</span>%
              </li>
              <li>
                <span>Humidity</span>
                <i className="fa-solid fa-droplet"></i>
                <span id="humidity">{weatherData.main.humidity}</span>%
              </li>
              <li>
                <span>Pressure</span>
                <i className="fa-solid fa-gauge"></i>
                <span id="pressure">{weatherData.main.pressure}</span>hPa
              </li>
            </ul>
          </section>
        )}

        {error && <p className="error-message">City not found. Try again.</p>}
      </main>
    </div>
  );
};

export default WeatherApp;
