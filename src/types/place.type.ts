export type Place = {
  placeId: string;
  placeName: string;
  placeType: string;
  address: string;
  latitude: number;
  longitude: number;
};

export type CountryAndRegion = {
  countryName: string;
  regionName: string;
};

export type InsertBasketDataType = CountryAndRegion & {
  places: Place[];
};

export type DeleteBasketDataType = CountryAndRegion & {
  placeId: string[];
};
