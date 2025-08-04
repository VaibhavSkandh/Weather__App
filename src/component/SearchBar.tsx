import React from "react";
import { MapPin } from "lucide-react";
import { Search_input_wrapper, Search_input, Search_dropdown, Suggestion_item, Suggestion_icon } from "../styles/SearchBar.module";

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
    <Search_input_wrapper>
      <Search_input
        type="text"
        value={value}
        placeholder="Search Location"
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSearch()}
      />
      {showSuggestions && suggestions.length > 0 && (
        <Search_dropdown>
          {suggestions.map((suggestion) => (
            <Suggestion_item
              key={suggestion.id}
              onClick={() => onSuggestionClick(suggestion)}
            >
              <Suggestion_icon>
                <MapPin size={16} />
              </Suggestion_icon>
              <span>
                {suggestion.name}, {suggestion.country}
              </span>
            </Suggestion_item>
          ))}
        </Search_dropdown>
      )}
    </Search_input_wrapper>
  );
};

export default SearchBar;