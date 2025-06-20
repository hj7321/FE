export type MarkerDTO = {
  id: string; // React key & Marker key
  daySeq: number; // Day 1, 2 …
  order: number; // 하루 안에서 1,2,3…
  lat: number;
  lng: number;
  placeName: string;
};
