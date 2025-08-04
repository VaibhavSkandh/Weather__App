import React from "react";
import {
  Wind,
  Droplet,
  Thermometer,
  Sunset,
  Sunrise,
  Bookmark,
} from "lucide-react";

interface Props {
  location: {
    name: string;
    country: string;

  };
  current: {
    temp_c: number;
    humidity: number;
    wind_kph: number;
    condition: { text: string };
  };
  forecast: {
    sunrise: string;
    sunset: string;
    maxtemp_c: number;
    mintemp_c: number;
  };
  onToggleSave: () => void;
  saveStatus: string;
  getIcon: (text: string) => React.ReactNode;
}

const CurrentWeather: React.FC<Props> = ({
  location,
  current,
  forecast,
  onToggleSave,
  saveStatus,
  getIcon,
}) => (
  <div className="current-weather">
    <div className="save-location-area">
      <button onClick={onToggleSave} className="save-button" aria-label="Save or remove current location">
        <Bookmark className="icon-save" />
      </button>
      {saveStatus && <p className="save-status-message">{saveStatus}</p>}
    </div>

    <h1 className="city-name">{location.name},</h1>
    <p className="country-name">{location.country}</p>
    <h2 className="condition-text">{current.condition.text}</h2>

    <div className="weather-icon-display">
      {getIcon(current.condition.text)}
      <h1 className="current-temp">{current.temp_c.toFixed(0)}°C</h1>
    </div>

    <div className="other-info">
      <div className="wind-info">
        <Wind /> Wind: {current.wind_kph} kmph
      </div>
      <div className="humidity-info">
        <Droplet /> Humidity: {current.humidity}%
      </div>
    </div>

    <div className="sun-time-section">
      <div className="sun-time-item">
        <Thermometer /> High: {forecast.maxtemp_c.toFixed(1)}°C
      </div>
      <div className="sun-time-item">
        ⬇️ Low: {forecast.mintemp_c.toFixed(1)}°C
      </div>
      <div className="sun-time-item">
        <Sunset /> Sunset: {forecast.sunset}
      </div>
      <div className="sun-time-item">
        <Sunrise /> Sunrise: {forecast.sunrise}
      </div>
    </div>
  </div>
);

export default CurrentWeather;
