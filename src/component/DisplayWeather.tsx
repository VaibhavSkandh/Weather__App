import React from "react";
import { MainWrapper } from "./styles";

// Hooks
import useAuthStatus from "../hooks/useAuthStatus";
import useWeather from "../hooks/useWeather";
import useSavedLocations from "../hooks/useSavedLocations";
import useSearchSuggestions from "../hooks/useSearchSuggestions";

// Components
import Header from "../component/Header";
import SearchBar from "../component/SearchBar";
import SavedLocations from "../component/SavedLocations";
import CurrentWeather from "../component/CurrentWeather";
import Forecast from "../component/Forecast";

// Icons
import { Cloud, CloudFog, CloudRain, Sun } from "lucide-react";

const getIcon = (text: string) => {
  const lower = text.toLowerCase();
  if (lower.includes("rain") || lower.includes("drizzle") || lower.includes("shower")) return <CloudRain className="icon-main text-blue-600" />;
  if (lower.includes("cloud") || lower.includes("overcast")) return <Cloud className="icon-main text-gray-500" />;
  if (lower.includes("fog") || lower.includes("mist")) return <CloudFog className="icon-main text-gray-400" />;
  if (lower.includes("sun") || lower.includes("clear")) return <Sun className="icon-main text-yellow-500" />;
  return <Sun className="icon-main text-yellow-500" />;
};

const DisplayWeather: React.FC = () => {
  const { userName, logout } = useAuthStatus();
  const { weatherData, loading, error, fetchWeather } = useWeather();
  const { savedLocations, saveStatus, handleToggleSave, handleDeleteSavedLocation } = useSavedLocations();
  const { searchCity, setSearchCity, searchSuggestions, showSuggestions, fetchSuggestions } = useSearchSuggestions();

  const handleSearch = () => {
    if (searchCity.trim()) {
      fetchWeather(searchCity);
    }
  };

  const handleSuggestionClick = (sugg: { name: string; lat: number; lon: number }) => {
    setSearchCity(sugg.name);
    fetchWeather(sugg.name);
  };
  
  const toggleSaveCurrentLocation = () => {
    if (weatherData) {
      handleToggleSave(weatherData.location);
    }
  };

  return (
    <MainWrapper>
      <div className="app-container">
        <Header userName={userName} onLogout={logout} />

        <div className="main-area">
          <div className="search-area">
            <SearchBar
              value={searchCity}
              onChange={(val) => {
                setSearchCity(val);
                fetchSuggestions(val);
              }}
              onSearch={handleSearch}
              suggestions={searchSuggestions}
              showSuggestions={showSuggestions}
              onSuggestionClick={handleSuggestionClick}
            />

            <SavedLocations
              locations={savedLocations}
              onSelect={(lat, lon) => fetchWeather(`${lat},${lon}`)}
              onDelete={handleDeleteSavedLocation}
              getIcon={getIcon}
            />
          </div>

          <div className="right-section">
            {loading ? (
              <div className="loading-message">
                <p className="loading-text">Fetching weather data...</p>
              </div>
            ) : error ? (
              <div className="error-message">
                <p className="error-text">{error}</p>
              </div>
            ) : weatherData ? (
              <>
                <CurrentWeather
                  location={weatherData.location}
                  current={weatherData.current}
                  forecast={{
                    sunrise: weatherData.forecast.forecastday[0].astro.sunrise,
                    sunset: weatherData.forecast.forecastday[0].astro.sunset,
                    maxtemp_c: weatherData.forecast.forecastday[0].day.maxtemp_c,
                    mintemp_c: weatherData.forecast.forecastday[0].day.mintemp_c,
                  }}
                  saveStatus={saveStatus}
                  onToggleSave={toggleSaveCurrentLocation}
                  getIcon={getIcon}
                />
                <Forecast
                  hourly={weatherData.forecast.forecastday[0].hour}
                  daily={weatherData.forecast.forecastday}
                  getIcon={getIcon}
                />
              </>
            ) : (
              <div className="loading-message">
                <p className="loading-text">Enter a city to see weather data.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainWrapper>
  );
};

export default DisplayWeather;