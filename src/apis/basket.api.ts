import axios from "axios";
import { api } from "./api";
import {
  DeleteBasketDataType,
  InsertBasketDataType,
  CountryAndRegion,
} from "../types/place.type";

// 장바구니 조회
export const readBasket = async ({
  countryName,
  regionName,
}: CountryAndRegion): Promise<InsertBasketDataType> => {
  const path = "/account/basket/read";

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
      // if()
      console.error("[readBasket] Axios 에러: ", error);
    } else {
      console.error("[readBasket] 일반 에러: ", error);
    }
    throw error;
  }
};

// 장바구니 데이터 삽입
export const insertBasketData = async ({
  countryName,
  regionName,
  places,
}: InsertBasketDataType) => {
  const path = "/account/basket/insert";

  try {
    const response = await api.post(path, {
      countryName,
      regionName,
      places,
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("[insertBasketData] Axios 에러: ", error);
    } else {
      console.error("[insertBasketData] 일반 에러: ", error);
    }
    throw error;
  }
};

// 장바구니 데이터 삭제
export const deleteBasketData = async ({
  countryName,
  regionName,
  placeId,
}: DeleteBasketDataType) => {
  const path = "/account/basket/delete";

  try {
    const response = await api.post(path, {
      countryName,
      regionName,
      placeId,
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("[deleteBasketData] Axios 에러: ", error);
    } else {
      console.error("[deleteBasketData] 일반 에러: ", error);
    }
    throw error;
  }
};
