import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface MapState {
  center: { lat: number; lng: number };
  placeName: string;
  setCenter: (lat: number, lng: number, placeName: string) => void;
}

export const useMapStore = create<MapState>()(
  persist(
    (set) => ({
      center: { lat: 0, lng: 0 },
      placeName: "",
      setCenter: (lat, lng, placeName) =>
        set({ center: { lat, lng }, placeName }),
    }),
    {
      name: "map-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
