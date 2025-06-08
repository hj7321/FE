import axios from "axios";
import {
  CountryAndRegion,
  PlaceId,
  Places,
  ReadPlaceDetailResponse,
  ReadPlaceListRequestType,
  ReadPlaceListResponse,
} from "../types/place.type";
import { api } from "./api";

// 장소 목록 요청
export const readPlaceList = async ({
  countryName,
  regionName,
  pageToken,
}: ReadPlaceListRequestType): Promise<ReadPlaceListResponse> => {
  const path = "/discovery/places";

  try {
    const response = await api.get(path, {
      params: {
        countryName,
        regionName,
        pageToken,
      },
    });
    const data = response.data;
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("[readPlaceList] Axios 에러: ", error);
    } else {
      console.error("[login] 일반 에러: ", error);
    }
    throw error;
  }
};

// 장소 세부정보 요청
export const readPlaceDetail = async ({
  placeId,
}: PlaceId): Promise<ReadPlaceDetailResponse> => {
  const path = `/discovery/details/${placeId}`;

  try {
    const response = await api.get(path);
    const data = response.data;
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("[readPlaceDetail] Axios 에러: ", error);
    } else {
      console.error("[readPlaceDetail] 일반 에러: ", error);
    }
    throw error;
  }
};

// 인기 장소 top20 요청
export const readPopularPlace = async ({
  countryName,
  regionName,
}: CountryAndRegion): Promise<Places[]> => {
  const path = "/discovery/popularPlaces";

  try {
    const response = await api.get(path, {
      params: {
        countryName,
        regionName,
      },
    });
    const data = response.data;
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("[readPlaceDetail] Axios 에러: ", error);
    } else {
      console.error("[readPlaceDetail] 일반 에러: ", error);
    }
    throw error;
  }
};
