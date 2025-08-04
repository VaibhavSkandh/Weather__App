// src/hooks/useSavedLocations.tsx
import { useState, useEffect } from "react";
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
import axios from "axios";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

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

interface SavedLocationsStatus {
  savedLocations: SavedLocation[];
  saveStatus: string;
  handleToggleSave: (
    location: { name: string; country: string; lat: number; lon: number }
  ) => Promise<void>;
  handleDeleteSavedLocation: (id: string) => Promise<void>;
}

const useSavedLocations = (): SavedLocationsStatus => {
  const [savedLocations, setSavedLocations] = useState<SavedLocation[]>([]);
  const [saveStatus, setSaveStatus] = useState("");

  const handleToggleSave = async (location: {
    name: string;
    country: string;
    lat: number;
    lon: number;
  }) => {
    const existing = savedLocations.find(
      (loc) => loc.name === location.name && loc.country === location.country
    );
    try {
      if (existing) {
        await deleteDoc(doc(db, "savedLocations", existing.id));
        setSaveStatus(`'${existing.name}' removed.`);
      } else {
        await addDoc(collection(db, "savedLocations"), {
          name: location.name,
          country: location.country,
          latitude: location.lat,
          longitude: location.lon,
          savedAt: serverTimestamp(),
        });
        setSaveStatus(`'${location.name}' saved!`);
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

  useEffect(() => {
    const q = query(
      collection(db, "savedLocations"),
      orderBy("savedAt", "desc")
    );
    const unsub = onSnapshot(q, async (snapshot) => {
      const updated = await Promise.all(
        snapshot.docs.map(async (docSnap) => {
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
        })
      );
      setSavedLocations(updated);
    });
    return () => unsub();
  }, []);

  return {
    savedLocations,
    saveStatus,
    handleToggleSave,
    handleDeleteSavedLocation,
  };
};

export default useSavedLocations;