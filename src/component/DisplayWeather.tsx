import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Droplet,
  Sun,
  Cloud,
  CloudRain,
  CloudFog,
  Search,
  Sunrise,
  Sunset,
} from "lucide-react";
import { MainWrapper } from "./styles";

interface WeatherAPIResponse {
  location: {
    name: string;
    country: string;
  };
  current: {
    temp_c: number;
    humidity: number;
    condition: {
      text: string;
    };
  };
  forecast: {
    forecastday: {
      date: string;
      day: {
        maxtemp_c: number;
        mintemp_c: number;
        condition: {
          text: string;
        };
      };
      hour: {
        time: string;
        temp_c: number;
        condition: {
          text: string;
        };
      }[];
      astro: {
        sunrise: string;
        sunset: string;
      };
    }[];
  };
}

const API_KEY = "95b25569cafd431d8a4164845252707";

const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherAPIResponse | null>(
    null
  );
  const [city, setCity] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${query}&days=7&aqi=no&alerts=no`;
      const res = await axios.get<WeatherAPIResponse>(url);
      setWeatherData(res.data);
      setCity(res.data.location.name);
    } catch (err) {
      console.error("Error fetching weather data:", err);
      setWeatherData(null);
      setError(
        "Could not fetch weather data. Please try again or enter a city name."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather(`${latitude},${longitude}`);
        },
        (geoError) => {
          console.error("Error getting geolocation:", geoError);
          setError(
            "Geolocation denied or unavailable. Falling back to default city."
          );
          fetchWeather("Bengaluru");
        }
      );
    } else {
      setError(
        "Geolocation is not supported by your browser. Falling back to default city."
      );
      fetchWeather("Bengaluru");
    }
  }, []);

  const handleSearch = () => {
    if (searchCity.trim() !== "") {
      fetchWeather(searchCity);
      setSearchCity("");
    }
  };

  const getIcon = (text: string) => {
    const condition = text.toLowerCase();
    if (
      condition.includes("rain") ||
      condition.includes("drizzle") ||
      condition.includes("showers")
    )
      return <CloudRain className="icon-main text-blue-600" />;
    if (
      condition.includes("cloud") ||
      condition.includes("overcast") ||
      condition.includes("partly cloudy")
    )
      return <Cloud className="icon-main text-gray-500" />;
    if (condition.includes("fog") || condition.includes("mist"))
      return <CloudFog className="icon-main text-gray-400" />;
    if (
      condition.includes("sun") ||
      condition.includes("clear") ||
      condition.includes("sunny")
    )
      return <Sun className="icon-main text-yellow-500" />;
    return <Sun className="icon-main text-yellow-500" />;
  };

  return (
    <MainWrapper>
      <div className="app-container">
        <div className="weather-card">
          <div className="search-area">
            <input
              type="text"
              placeholder="Enter a city"
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="search-input"
            />
            <button
              onClick={handleSearch}
              className="search-button"
              aria-label="Search weather"
            >
              <Search className="icon-search" />
            </button>
          </div>

          {loading ? (
            <div className="loading-message">
              <p className="loading-text">
                Detecting your location and fetching weather...
              </p>
              <p className="loading-subtext">
                Please allow location access if prompted.
              </p>
            </div>
          ) : error ? (
            <div className="error-message">
              <p className="error-text">{error}</p>
              <p className="error-subtext">
                You can try searching for a city manually above.
              </p>
            </div>
          ) : weatherData ? (
            <>
              <div className="current-weather">
                <h1 className="city-name">{weatherData.location.name}</h1>
                <p className="country-name">{weatherData.location.country}</p>
                <div className="weather-icon-display">
                  {getIcon(weatherData.current.condition.text)}
                </div>
                <h1 className="current-temp">
                  {weatherData.current.temp_c.toFixed(0)}&deg;C
                </h1>
                <h2 className="condition-text">
                  {weatherData.current.condition.text}
                </h2>
                <p className="humidity-info">
                  Humidity: {weatherData.current.humidity}%{" "}
                  <Droplet className="icon-humidity" />
                </p>
              </div>

              <div className="sun-time-section">
                <div className="sun-time-item">
                  <Sunrise className="icon-sunrise" />
                  <span className="sun-time-label">Sunrise:</span>{" "}
                  <span className="sun-time-value">
                    {weatherData.forecast.forecastday[0].astro.sunrise}
                  </span>
                </div>
                <div className="sun-time-item">
                  <Sunset className="icon-sunset" />
                  <span className="sun-time-label">Sunset:</span>{" "}
                  <span className="sun-time-value">
                    {weatherData.forecast.forecastday[0].astro.sunset}
                  </span>
                </div>
              </div>

              <div className="forecast-section">
                <h2 className="forecast-title">
                  Hourly Forecast (Next 6 Hours)
                </h2>
                <div className="hourly-forecast-list">
                  {weatherData.forecast.forecastday[0].hour
                    .slice(0, 6)
                    .map((hour, idx) => (
                      <div key={idx} className="hourly-item">
                        <p className="hourly-time">{hour.time.split(" ")[1]}</p>
                        <div className="hourly-icon">
                          {getIcon(hour.condition.text)}
                        </div>
                        <p className="hourly-temp">
                          {hour.temp_c.toFixed(0)}&deg;C
                        </p>
                      </div>
                    ))}
                </div>

                <h2 className="forecast-title daily-title">
                  Daily Forecast (Next 7 Days)
                </h2>
                <div className="daily-forecast-list">
                  {weatherData.forecast.forecastday
                    .slice(0, 7)
                    .map((day, idx) => (
                      <div key={idx} className="daily-item">
                        <p className="daily-date">{day.date}</p>
                        <div className="daily-icon">
                          {getIcon(day.day.condition.text)}
                        </div>
                        <p className="daily-temp">
                          {day.day.mintemp_c.toFixed(0)}&deg; /{" "}
                          {day.day.maxtemp_c.toFixed(0)}&deg;C
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            </>
          ) : (
            <div className="loading-message">
              <p className="loading-text">
                Enter a city to get weather information.
              </p>
            </div>
          )}
        </div>
      </div>
    </MainWrapper>
  );
};

export default App;
