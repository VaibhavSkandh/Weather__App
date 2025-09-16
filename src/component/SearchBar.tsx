import React from "react";
import { MapPin } from "lucide-react";
import { SearchInputWrapper, SearchInput, SearchDropdown, SuggestionItem, SuggestionIcon } from "../styles/SearchBar.module";

interface SearchSuggestion {
  id: number;
  name: string;
  country: string;
  lat: number;
  lon: number;
}

interface Props {
  value: string;
  onChange: (val: string) => void;
  onSearch: () => void;
  suggestions: SearchSuggestion[];
  onSuggestionClick: (sugg: SearchSuggestion) => void;
  showSuggestions: boolean;
  onHideSuggestions: () => void; // Add a new prop to handle hiding suggestions
}

const SearchBar: React.FC<Props> = ({
  value,
  onChange,
  onSearch,
  suggestions,
  onSuggestionClick,
  showSuggestions,
  onHideSuggestions, // Destructure the new prop
}) => {
  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    onSuggestionClick(suggestion);
    onHideSuggestions(); // Call the new function to hide the suggestions
  };

  return (
    <SearchInputWrapper>
      <SearchInput
        type="text"
        value={value}
        placeholder="Search Location"
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSearch()}
      />
      {showSuggestions && suggestions.length > 0 && (
        <SearchDropdown>
          {suggestions.map((suggestion) => (
            <SuggestionItem
              key={suggestion.id}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <SuggestionIcon>
                <MapPin size={16} />
              </SuggestionIcon>
              <span>
                {suggestion.name}, {suggestion.country}
              </span>
            </SuggestionItem>
          ))}
        </SearchDropdown>
      )}
    </SearchInputWrapper>
  );
};

export default SearchBar;