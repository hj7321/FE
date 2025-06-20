import { TRANSPORT_OPTIONS } from "../constants/transport";

export type Transportation = (typeof TRANSPORT_OPTIONS)[number];

export type PreferenceCategory = {
  prefer: string[];
  nonPrefer: string[];
};

export type TravelPeriod = {
  start_date: string; // "YYYY-MM-DD"
  end_date: string; // "YYYY-MM-DD"
};

export type GroupInfo = {
  num_people: number;
};

export type BudgetRange = {
  min: number;
  max: number;
};

export interface TravelPlanPreferences {
  travel_period: TravelPeriod;
  group: GroupInfo;
  budget: BudgetRange;
  region: string;
  transportation_preferences: Transportation[];
  travel_style_preferences: PreferenceCategory;
}
