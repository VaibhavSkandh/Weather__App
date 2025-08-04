// src/components/SavedLocations.tsx
import React from "react";
import { X } from "lucide-react";

interface SavedLocation {
  id: string;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  temp?: number;
  condition?: string;
}

interface Props {
  locations: SavedLocation[];
  onSelect: (lat: number, lon: number) => void;
  onDelete: (id: string) => void;
  getIcon: (text: string) => React.ReactNode;
}

const SavedLocations: React.FC<Props> = ({
  locations,
  onSelect,
  onDelete,
  getIcon,
}) => {
  if (locations.length === 0) return null;

  return (
    <div className="saved-location-list">
      <h4 className="saved-header">Saved Locations</h4>
      {locations.map((loc) => (
        <div key={loc.id} className="saved-item">
          <div
            className="saved-location-card"
            onClick={() => onSelect(loc.latitude, loc.longitude)}
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
            onClick={() => onDelete(loc.id)}
          >
            <X className="icon-delete" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default SavedLocations;
