// src/hooks/useSearchSuggestions.tsx
import { useState } from "react";
import axios from "axios";
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
if (!API_KEY) {
  throw new Error("REACT_APP_WEATHER_API_KEY is not defined in the environment.");
}

interface SearchSuggestion {
  id: number;
  name: string;
  country: string;
  lat: number;
  lon: number;
}

interface SearchStatus {
  searchCity: string;
  setSearchCity: (city: string) => void;
  searchSuggestions: SearchSuggestion[];
  showSuggestions: boolean;
  fetchSuggestions: (query: string) => Promise<void>;
}

const useSearchSuggestions = (): SearchStatus => {
  const [searchCity, setSearchCity] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState<SearchSuggestion[]>(
    []
  );
  const [showSuggestions, setShowSuggestions] = useState(false);

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

  return {
    searchCity,
    setSearchCity,
    searchSuggestions,
    showSuggestions,
    fetchSuggestions,
  };
};

export default useSearchSuggestions;