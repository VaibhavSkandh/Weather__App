import React from "react";
import { MapPin } from "lucide-react";

interface SearchSuggestion {
  id: number;
  name: string;
  country: string;
  lat:number;
  lon:number;
}

interface Props {
  value: string;
  onChange: (val: string) => void;
  onSearch: () => void;
  suggestions: SearchSuggestion[];
  onSuggestionClick: (sugg: SearchSuggestion) => void;
  showSuggestions: boolean;
}

const SearchBar: React.FC<Props> = ({
  value,
  onChange,
  onSearch,
  suggestions,
  onSuggestionClick,
  showSuggestions,
}) => {
  return (
    <div className="search-input-wrapper">
      <input
        type="text"
        value={value}
        placeholder="Search Location"
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSearch()}
        className="search-input"
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul className="search-dropdown">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              className="suggestion-item"
              onClick={() => onSuggestionClick(suggestion)}
            >
              <MapPin size={16} className="suggestion-icon" />
              <span>{suggestion.name}, {suggestion.country}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
