import axios from "axios";
import { GeocodingResponse } from "../types/geocoding.type";

const GOOGLE_PLACES_KEY = import.meta.env.VITE_GOOGLE_PLACES_KEY;

export const getLatLngByAddress = async (
  address: string
): Promise<GeocodingResponse> => {
  const path = "https://maps.googleapis.com/maps/api/geocode/json";

  try {
    const response = await axios.get(path, {
      params: {
        address: address,
        key: GOOGLE_PLACES_KEY,
      },
    });
    const data = response.data;
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("[getLatLngByAddress] Axios 에러: ", error);
    } else {
      console.error("[getLatLngByAddress] 일반 에러: ", error);
    }
    throw error;
  }
};
