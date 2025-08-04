import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { useAuth } from "../component/AuthContext";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  query,
  orderBy,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { MainWrapper } from "./styles";

// Components
import Header from "../component/Header";
import SearchBar from "../component/SearchBar";
import SavedLocations from "../component/SavedLocations";
import CurrentWeather from "../component/CurrentWeather";
import Forecast from "../component/Forecast";

// Icons
import { Cloud, CloudFog, CloudRain, Sun } from "lucide-react";

const API_KEY = "95b25569cafd431d8a4164845252707";

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

interface SavedLocation {
  id: string;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  savedAt: { seconds: number; nanoseconds: number };
  temp?: number;
  condition?: string;
}

interface SearchSuggestion {
  id: number;
  name: string;
  country: string;
  lat: number;
  lon: number;
}

const DisplayWeather: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherAPIResponse | null>(null);
  const [searchCity, setSearchCity] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState<SearchSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [savedLocations, setSavedLocations] = useState<SavedLocation[]>([]);
  const [saveStatus, setSaveStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  const { logout } = useAuth();
  const navigate = useNavigate();

  // Fetch weather
  const fetchWeather = async (query: string) => {
    setLoading(true);
    setError(null);
    setSaveStatus("");
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
      setSearchSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const fetchSuggestions = async (query: string) => {
    if (query.length < 3) return setShowSuggestions(false);
    try {
      const res = await axios.get(
        `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${query}`
      );
      setSearchSuggestions(res.data);
      setShowSuggestions(true);
    } catch {
      setSearchSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleToggleSave = async () => {
    if (!weatherData) return setSaveStatus("No weather data to save.");
    const existing = savedLocations.find(
      (loc) =>
        loc.name === weatherData.location.name &&
        loc.country === weatherData.location.country
    );
    try {
      if (existing) {
        await deleteDoc(doc(db, "savedLocations", existing.id));
        setSaveStatus(`'${existing.name}' removed.`);
      } else {
        await addDoc(collection(db, "savedLocations"), {
          name: weatherData.location.name,
          country: weatherData.location.country,
          latitude: weatherData.location.lat,
          longitude: weatherData.location.lon,
          savedAt: serverTimestamp(),
        });
        setSaveStatus(`'${weatherData.location.name}' saved!`);
      }
    } catch {
      setSaveStatus("Error saving/removing location.");
    }
  };

  const handleDeleteSavedLocation = async (id: string) => {
    try {
      await deleteDoc(doc(db, "savedLocations", id));
      setSavedLocations((prev) => prev.filter((loc) => loc.id !== id));
    } catch {
      console.error("Error deleting location");
    }
  };

  const getIcon = (text: string) => {
    const lower = text.toLowerCase();
    if (lower.includes("rain") || lower.includes("drizzle") || lower.includes("shower")) return <CloudRain className="icon-main text-blue-600" />;
    if (lower.includes("cloud") || lower.includes("overcast")) return <Cloud className="icon-main text-gray-500" />;
    if (lower.includes("fog") || lower.includes("mist")) return <CloudFog className="icon-main text-gray-400" />;
    if (lower.includes("sun") || lower.includes("clear")) return <Sun className="icon-main text-yellow-500" />;
    return <Sun className="icon-main text-yellow-500" />;
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed");
    }
  };

  const handleSearch = () => {
    if (searchCity.trim()) fetchWeather(searchCity);
  };

  const handleSuggestionClick = (sugg: SearchSuggestion) => {
    setSearchCity(sugg.name);
    fetchWeather(sugg.name);
    setShowSuggestions(false);
  };

  // Effects
  useEffect(() => {
    const auth = getAuth();
    const unsub = onAuthStateChanged(auth, (user: User | null) => {
      const name = user?.displayName || user?.email?.split("@")[0];
      setUserName(name ?? "User");
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    navigator.geolocation?.getCurrentPosition(
      ({ coords }) => fetchWeather(`${coords.latitude},${coords.longitude}`),
      () => {
        setError("Geolocation denied. Using default.");
        fetchWeather("Bengaluru");
      }
    );
  }, []);

  useEffect(() => {
    const q = query(collection(db, "savedLocations"), orderBy("savedAt", "desc"));
    const unsub = onSnapshot(q, async (snapshot) => {
      const updated = await Promise.all(snapshot.docs.map(async (docSnap) => {
        const loc = docSnap.data() as SavedLocation;
        try {
          const res = await axios.get(
            `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${loc.latitude},${loc.longitude}`
          );
          return {
            ...loc,
            id: docSnap.id,
            temp: res.data.current.temp_c,
            condition: res.data.current.condition.text,
          };
        } catch {
          return { ...loc, id: docSnap.id };
        }
      }));
      setSavedLocations(updated);
    });
    return () => unsub();
  }, []);

  return (
    <MainWrapper>
      <div className="app-container">
        <Header userName={userName} onLogout={handleLogout} />

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
                  onToggleSave={handleToggleSave}
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
