import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Droplet,
  Sun,
  Cloud,
  CloudRain,
  CloudFog,
  Sunrise,
  Sunset,
  Bookmark,
  Wind,
  Thermometer,
  LogOut,
  List,
  X
}from "lucide-react";
import { MainWrapper } from "./styles";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  doc,
  query,
  orderBy,
  deleteDoc,
  onSnapshot
} from "firebase/firestore";
import { useAuth } from "../component/AuthContext";
import { useNavigate } from "react-router-dom";

interface WeatherAPIResponse {
  location: {
    name: string;
    country: string;
    lat: number;
    lon: number;
  };
  current: {
    temp_c: number;
    humidity: number;
    wind_kph: number;
    feelslike_c: number;
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
interface SavedLocation {
  id: string;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  savedAt: {
    seconds: number;
    nanoseconds: number;
  };
  temp?: number;
  condition?: string;
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
  const [saveStatus, setSaveStatus] = useState<string>("");
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [savedLocations, setSavedLocations] = useState<any[]>([]);
  const [showSaved, setShowSaved] = useState(false);

  const fetchWeather = async (query: string) => {
    setLoading(true);
    setError(null);
    setSaveStatus("");
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

  useEffect(() => {
  const unsubscribe = onSnapshot(
    query(collection(db, "savedLocations"), orderBy("savedAt", "desc")),
    async (snapshot) => {
      const locations = await Promise.all(
        snapshot.docs.map(async (doc) => {
          const loc = doc.data() as SavedLocation;
          const id = doc.id;
          try {
            const res = await axios.get(
              `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${loc.latitude},${loc.longitude}`
            );
            return {
              ...loc,
              id,
              temp: res.data.current.temp_c,
              condition: res.data.current.condition.text,
            };
          } catch (error) {
            console.error("Weather fetch failed for saved location", error);
            return { ...loc, id };
          }
        })
      );
      setSavedLocations(locations);
    }
  );

  return () => unsubscribe();
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
 const toggleSaveLocation = async () => {
  if (!weatherData) {
    setSaveStatus("No weather data to save.");
    return;
  }

  const existing = savedLocations.find(
    (loc) =>
      loc.name === weatherData.location.name &&
      loc.country === weatherData.location.country
  );

  if (existing) {
    // ❌ Location is already saved – delete it
    try {
      await deleteDoc(doc(db, "savedLocations", existing.id));
      setSaveStatus(`'${existing.name}' removed from saved locations.`);
    } catch (e) {
      console.error("Error removing location: ", e);
      setSaveStatus("Error removing location. Please try again.");
    }
  } else {
    // ✅ Location not saved – add it
    try {
      const docRef = await addDoc(collection(db, "savedLocations"), {
        name: weatherData.location.name,
        country: weatherData.location.country,
        latitude: weatherData.location.lat,
        longitude: weatherData.location.lon,
        savedAt: serverTimestamp(),
      });
      setSaveStatus(`'${weatherData.location.name}' saved!`);
    } catch (e) {
      console.error("Error saving location: ", e);
      setSaveStatus("Error saving location. Please try again.");
    }
  }
};


  const deleteSavedLocation = async (id: string) => {
  try {
    await deleteDoc(doc(db, "savedLocations", id));
    setSavedLocations((prev) => prev.filter((loc) => loc.id !== id));
  } catch (error) {
    console.error("Error deleting location:", error);
  }
};


  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err: any) {
      console.error("Error logging out:", err.message);
    }
  };

  return (
    <MainWrapper>
      <div className="app-container">
        <div className="nav-bar">
          <h1>Weather</h1>
          <button onClick={handleLogout} className="logout-button">
            <LogOut className="logout-icon" />
          </button>
        </div>
        <div className="main-area">
          <div className="search-area">
            <input
              type="text"
              placeholder="Search Location"
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="search-input"/>
              {savedLocations.length > 0 && (
  <div className="saved-location-list">
    <h4 className="saved-header">Saved Locations</h4>
    {savedLocations.map((loc) => (
  <div key={loc.id} className="saved-item">
    <div
      className="saved-location-card"
      onClick={() => fetchWeather(`${loc.latitude},${loc.longitude}`)}
    >
      <span className="saved-icon">{getIcon(loc.condition || "")}</span>
      <span className="saved-temp">
        {loc.temp !== undefined ? `${loc.temp.toFixed(1)}°` : "--"}
      </span>
      <span className="saved-city">
        {loc.name}, <span className="saved-country">{loc.country}</span>
      </span>
    </div>
    <button
      className="delete-saved-button"
      onClick={() => deleteSavedLocation(loc.id)}
    >
      <X className="icon-delete" />
    </button>
  </div>
))}

  </div>
)}

          </div>
          <div className="right-section">
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
                  <div className="save-location-area">
                    <button  onClick={toggleSaveLocation}
                              className="save-button"
                              aria-label="Save or remove current location">
                    <Bookmark className="icon-save" />
                    </button>

                    {saveStatus && (
                      <p className="save-status-message">{saveStatus}</p>
                    )}
                  </div>
                  <h1 className="city-name">{weatherData.location.name},</h1>
                  <p className="country-name">{weatherData.location.country}</p>
                  <h2 className="condition-text">
                    {weatherData.current.condition.text}
                  </h2>
                  <div className="weather-icon-display">
                    {getIcon(weatherData.current.condition.text)}
                    <h1 className="current-temp">
                      {weatherData.current.temp_c.toFixed(0)}&deg;C
                    </h1>
                  </div>
                  <div className="other-info">
                    <div className="wind-info">
                      <Wind className="icon-Wind" />
                      Wind:{weatherData.current.wind_kph}kmph{" "}
                    </div>
                    <div className="humidity-info">
                      <Droplet className="icon-humidity" />
                      Humidity: {weatherData.current.humidity}%{" "}
                    </div>
                  </div>
                  <div className="sun-time-section">
                    <div className="sun-time-item">
                      <Thermometer className="icon thermometer"/>High Temperature:{" "}
                      {weatherData.forecast.forecastday[0].day.maxtemp_c.toFixed(1)}&deg;C
                    </div>
                    <div className="sun-time-item">
                      <span className="icon">⬇️</span> Low Temperature:{" "}
                      {weatherData.forecast.forecastday[0].day.mintemp_c.toFixed(
                        1
                      )}
                      &deg;C
                    </div>
                    <div className="sun-time-item">
                      <Sunset className="icon-sunset" />
                      <span className="sun-time-label">Sunset:</span>{" "}
                      <span className="sun-time-value">
                        {weatherData.forecast.forecastday[0].astro.sunset}
                      </span>
                    </div>
                    <div className="sun-time-item">
                      <Sunrise className="icon-sunrise" />
                      <span className="sun-time-label">Sunrise:</span>{" "}
                      <span className="sun-time-value">
                        {weatherData.forecast.forecastday[0].astro.sunrise}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="forecast-section">
                  <h2 className="forecast-title">Today</h2>
                  <div className="hourly-forecast-list">
                    {weatherData.forecast.forecastday[0].hour
                      .slice(0, 9)
                      .map((hour, idx) => (
                        <div key={idx} className="hourly-item">
                          <p className="hourly-time">
                            {hour.time.split(" ")[1]}
                          </p>
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
      </div>
    </MainWrapper>
  );
};

export default App;

