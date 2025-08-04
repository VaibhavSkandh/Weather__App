import React from "react";
import { X } from "lucide-react";
import {
  Saved_location_list,
  Saved_header,
  Saved_item,
  Saved_location_card,
  Saved_icon,
  Saved_temp,
  Saved_city,
  Saved_country,
  Delete_saved_button,
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
    <Saved_location_list>
      <Saved_header>Saved Locations</Saved_header>
      {locations.map((loc) => (
        <Saved_item key={loc.id}>
          <Saved_location_card
            onClick={() => onSelect(loc.latitude, loc.longitude)}
          >
            <Saved_icon>{getIcon(loc.condition || "")}</Saved_icon>
            <Saved_temp>
              {loc.temp !== undefined ? `${loc.temp.toFixed(1)}°` : "--"}
            </Saved_temp>
            <Saved_city>
              {loc.name}, <Saved_country>{loc.country}</Saved_country>
            </Saved_city>
          </Saved_location_card>
          <Delete_saved_button onClick={() => onDelete(loc.id)}>
            <X className="icon-delete" />
          </Delete_saved_button>
        </Saved_item>
      ))}
    </Saved_location_list>
  );
};

export default SavedLocations;