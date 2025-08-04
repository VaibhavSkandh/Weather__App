// src/hooks/useWeather.tsx
import { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

interface WeatherAPIResponse {
  location: { name: string; country: string; lat: number; lon: number };
  current: {
    temp_c: number;
    humidity: number;
    wind_kph: number;
    feelslike_c: number;
    condition: { text: string };
  };
  forecast: {
    forecastday: {
      date: string;
      day: {
        maxtemp_c: number;
        mintemp_c: number;
        condition: { text: string };
      };
      hour: {
        time: string;
        temp_c: number;
        condition: { text: string };
      }[];
      astro: { sunrise: string; sunset: string };
    }[];
  };
}

interface WeatherStatus {
  weatherData: WeatherAPIResponse | null;
  loading: boolean;
  error: string | null;
  fetchWeather: (query: string) => Promise<void>;
}

const useWeather = (): WeatherStatus => {
  const [weatherData, setWeatherData] = useState<WeatherAPIResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${query}&days=7&aqi=no&alerts=no`
      );
      setWeatherData(res.data);
    } catch (err) {
      setError("Could not fetch weather data. Try again.");
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    navigator.geolocation?.getCurrentPosition(
      ({ coords }) => fetchWeather(`${coords.latitude},${coords.longitude}`),
      () => {
        setError("Geolocation denied. Using default.");
        fetchWeather("Bengaluru");
      }
    );
  }, []);

  return { weatherData, loading, error, fetchWeather };
};

export default useWeather;