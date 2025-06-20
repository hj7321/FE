import { TRANSPORT_OPTIONS } from "../constants/transport";

export type Transportation = (typeof TRANSPORT_OPTIONS)[number];

export type PreferenceCategory = {
  prefer: string[];
  nonPrefer: string[];
};

export type TravelPreference = {
  travelPurpose: PreferenceCategory;
  accommodation: PreferenceCategory;
  restaurant: PreferenceCategory;
};

export type TravelPeriod = {
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
};

export interface TravelPlanPreferences {
  numOfPeople: number;
  travelPeriod: TravelPeriod;
  travelBudget: number;
  transportation: Transportation[];
  region: string;
  preference: TravelPreference;
}
