import React, { useEffect, useState } from "react";
import CurrentWeather from "./components/CurrentWeather";
import Forecast from "./components/Forecast";
// const searchCityUrl = 'https://api.weatherapi.com/v1/search.json?'
// const API_KEY = '86f338c7a7b34232b6353734230602'

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [citySuggestion, setCitySuggestion] = useState([]);
  const [weatherData, setWeatherData] = useState({});
  const handleClick = async (city) => {
    //fetch current and forecast weather
    const res = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=86f338c7a7b34232b6353734230602&q=${city}&days=7&aqi=no&alerts=no`
    );
    const data = await res.json();
    setWeatherData(data);
    setCity("");
    setCitySuggestion([]);
  };
  useEffect(() => {
    //fetch city suggestions from the weather api
    const fetchCitySuggestions = async () => {
      const res = await fetch(
        `https://api.weatherapi.com/v1/search.json?key=86f338c7a7b34232b6353734230602&q=${city}`
      );
      setCitySuggestion(await res.json());
    };
    if (city.length > 2) fetchCitySuggestions();
  }, [city]);
  return (
    <div className="weatherapp">
      <div className="weatherapp--container">
        <div className="weatherapp--container__finder">
          <h1>Weather App</h1>
          <input
            type="text"
            placeholder="Enter City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          {citySuggestion.length > 0 && (
            <ul className="city__sugg">
              {citySuggestion.map((city, i) => {
                return (
                  <li
                    key={i}
                    onClick={() =>
                      handleClick(city.name)
                    }>{`${city.name}, ${city.region}, ${city.country}`}</li>
                );
              })}
            </ul>
          )}
        </div>
        {Object.keys(weatherData).length > 0 && (
          <div className="weatherapp--container__current">
            <CurrentWeather data={weatherData} />
            <Forecast data={weatherData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
