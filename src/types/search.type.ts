import { TravelPlanButton } from "./button.type";
import { Place } from "./place.type";

export type Search = {
  latitude: number;
  longitude: number;
  pageToken: string | null;
};

export type TextSearch = Search & {
  text: string;
};

export type TypeSearch = Search & {
  type: TravelPlanButton;
};

export type SearchResult = {
  places: Place[];
  pageToken: string | null;
};
