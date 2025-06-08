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
  type: "관광" | "맛집" | "숙소";
};

export type SearchResult = {
  places: Place[];
  pageToken: string | null;
};
