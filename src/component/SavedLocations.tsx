import React from "react";
import { X } from "lucide-react";
import {
  SavedLocationList,
  SavedHeader,
  SavedItem,
  SavedLocationCard,
  SavedIcon,
  SavedTemp,
  SavedCity,
  SavedCountry,
  DeleteSavedButton,
} from "../styles/SavedLocations.module";

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
    <SavedLocationList>
      <SavedHeader>Saved Locations</SavedHeader>
      {locations.map((loc) => (
        <SavedItem key={loc.id}>
          <SavedLocationCard
            onClick={() => onSelect(loc.latitude, loc.longitude)}
          >
            <SavedIcon>{getIcon(loc.condition || "")}</SavedIcon>
            <SavedTemp>
              {loc.temp !== undefined ? `${loc.temp.toFixed(1)}°` : "--"}
            </SavedTemp>
            <SavedCity>
              {loc.name}, <SavedCountry>{loc.country}</SavedCountry>
            </SavedCity>
          </SavedLocationCard>
          <DeleteSavedButton onClick={() => onDelete(loc.id)}>
            <X className="icon-delete" />
          </DeleteSavedButton>
        </SavedItem>
      ))}
    </SavedLocationList>
  );
};

export default SavedLocations;