import React, { useState } from "react";
import {
  AppContainer,
  MainArea,
  SearchArea,
  RightSection
} from "./styles";

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
  const {
    searchCity,
    setSearchCity,
    searchSuggestions,
    fetchSuggestions,
  } = useSearchSuggestions();

  // New state to manage the visibility of the suggestions
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSearch = () => {
    if (searchCity.trim()) {
      fetchWeather(searchCity);
      setShowSuggestions(false); // Hide suggestions after a search
    }
  };

  const handleSuggestionClick = (sugg: { name: string; lat: number; lon: number }) => {
    setSearchCity(sugg.name);
    fetchWeather(sugg.name);
    setShowSuggestions(false); // Hide suggestions after a suggestion is clicked
  };
  
  const toggleSaveCurrentLocation = () => {
    if (weatherData) {
      handleToggleSave(weatherData.location);
    }
  };

  return (
    <AppContainer>
      <Header userName={userName} onLogout={logout} />

      <MainArea>
        <SearchArea>
          <SearchBar
            value={searchCity}
            onChange={(val) => {
              setSearchCity(val);
              fetchSuggestions(val);
              setShowSuggestions(val.length > 0); // Show suggestions when there's input
            }}
            onSearch={handleSearch}
            suggestions={searchSuggestions}
            showSuggestions={showSuggestions}
            onSuggestionClick={handleSuggestionClick}
            onHideSuggestions={() => setShowSuggestions(false)} // Pass a function to hide suggestions
          />

          <SavedLocations
            locations={savedLocations}
            onSelect={(lat, lon) => fetchWeather(`${lat},${lon}`)}
            onDelete={handleDeleteSavedLocation}
            getIcon={getIcon}
          />
        </SearchArea>

        <RightSection>
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
        </RightSection>
      </MainArea>
    </AppContainer>
  );
};

export default DisplayWeather;