import React, { useState, useEffect } from "react";
import weatherServices from "../services/weather"

const CityWeather = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null);

  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    weatherServices.getAll(city, apiKey)
      .then((initialData) => {
        setWeatherData(initialData);
      })
      .catch((error) => {
        console.error("Error fetching weather data: ", error);
      });
  }, [city, apiKey]);

  const convertToCelsius = (kelvin) => {
    return kelvin - 273.15;
  };

  if (!weatherData) {
    return <p>Loading weather...</p>;
  }

  return (
    <div>
      <p>
        Temperature {convertToCelsius(weatherData.main.temp).toFixed(1)} Celsius
      </p>
      <img
        src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
      />

      <p>Wind {weatherData.wind.speed} m/s</p>
    </div>
  );
};

export default CityWeather;
