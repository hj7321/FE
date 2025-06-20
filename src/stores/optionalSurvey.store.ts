import { create } from "zustand";
import { Transportation } from "../types/survey.type";

interface OptionalSurveyState {
  transportation: Transportation[];
  preferTravelPurpose: string[];
  nonPreferTravelPurpose: string[];
  preferAccommodation: string[];
  nonPreferAccommodation: string[];
  preferRestaurant: string[];
  nonPreferRestaurant: string[];
  setTransportation: (transportation: Transportation[]) => void;
  setPreferTravelPurpose: (purpose: string[]) => void;
  setNonPreferTravelPurpose: (purpose: string[]) => void;
  setPreferAccommodation: (accommodation: string[]) => void;
  setNonPreferAccommodation: (accommodation: string[]) => void;
  setPreferRestaurant: (restaurant: string[]) => void;
  setNonPreferRestaurant: (restaurant: string[]) => void;
  reset: () => void;
}

export const useOptionalSurveyStore = create<OptionalSurveyState>()((set) => ({
  transportation: [],
  preferTravelPurpose: [],
  nonPreferTravelPurpose: [],
  preferAccommodation: [],
  nonPreferAccommodation: [],
  preferRestaurant: [],
  nonPreferRestaurant: [],
  setTransportation: (transportation: Transportation[]) =>
    set({ transportation }),
  setPreferTravelPurpose: (purpose: string[]) =>
    set({ preferTravelPurpose: purpose }),
  setNonPreferTravelPurpose: (purpose: string[]) =>
    set({ nonPreferTravelPurpose: purpose }),
  setPreferAccommodation: (accommodation: string[]) =>
    set({ preferAccommodation: accommodation }),
  setNonPreferAccommodation: (accommodation: string[]) =>
    set({ nonPreferAccommodation: accommodation }),
  setPreferRestaurant: (restaurant: string[]) =>
    set({ preferRestaurant: restaurant }),
  setNonPreferRestaurant: (restaurant: string[]) =>
    set({ nonPreferRestaurant: restaurant }),
  reset: () =>
    set({
      transportation: [],
      preferTravelPurpose: [],
      nonPreferTravelPurpose: [],
      preferAccommodation: [],
      nonPreferAccommodation: [],
      preferRestaurant: [],
      nonPreferRestaurant: [],
    }),
}));
