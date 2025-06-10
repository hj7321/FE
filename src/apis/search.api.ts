import axios from "axios";
import {
  Search,
  SearchResult,
  TextSearch,
  TypeSearch,
} from "../types/search.type";
import { api } from "./api";

// 여행 계획 페이지에서 주변 검색
export const searchNearby = async ({
  latitude,
  longitude,
  pageToken,
}: Search): Promise<SearchResult> => {
  const path = "/search/nearbySearch";

  try {
    const response = await api.get(path, {
      params: {
        latitude,
        longitude,
        pageToken,
      },
    });
    const data = response.data;
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("[searchNearby] Axios 에러: ", error);
    } else {
      console.error("[searchNearby] 일반 에러: ", error);
    }
    throw error;
  }
};

// 여행 계획 페이지에서 텍스트 검색
export const searchText = async ({
  text,
  latitude,
  longitude,
  pageToken,
}: TextSearch): Promise<SearchResult> => {
  const path = "/search/searchByText";

  try {
    const response = await api.get(path, {
      params: {
        text,
        latitude,
        longitude,
        pageToken,
      },
    });
    const data = response.data;
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("[searchText] Axios 에러: ", error);
    } else {
      console.error("[searchText] 일반 에러: ", error);
    }
    throw error;
  }
};

// 여행 계획 페이지에서 타입 검색(관광, 맛집, 숙소)
export const searchType = async ({
  type,
  latitude,
  longitude,
  pageToken,
}: TypeSearch): Promise<SearchResult> => {
  const path = "/search/searchByType";

  try {
    const response = await api.get(path, {
      params: {
        type,
        latitude,
        longitude,
        pageToken,
      },
    });
    const data = response.data;
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("[searchType] Axios 에러: ", error);
    } else {
      console.error("[searchType] 일반 에러: ", error);
    }
    throw error;
  }
};
