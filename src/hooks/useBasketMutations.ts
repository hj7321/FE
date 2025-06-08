import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import {
  DeleteBasketDataType,
  InsertBasketDataType,
} from "../types/place.type";
import { deleteBasketData, insertBasketData } from "../apis/basket.api";

const useBasketMutations = (countryName: string, regionName: string) => {
  const {
    mutate: insertBasketDataMutate,
    mutateAsync: insertBasketDataMutateAsync,
  } = useMutation<AxiosResponse, Error, InsertBasketDataType>({
    mutationKey: ["insertBasketData", countryName, regionName],
    mutationFn: insertBasketData,
    networkMode: "always", // <- 추가!
    onSuccess: (response) => {
      console.log("✅ 장바구니 추가 api 요청 성공", response);
    },
    onError: (err) => {
      console.error("❌ 장바구니 추가 api 요청 실패", err);
      console.error(err.message);
    },
  });

  const {
    mutate: deleteBasketDataMutate,
    mutateAsync: deleteBasketDataMutateAsync,
  } = useMutation<AxiosResponse, Error, DeleteBasketDataType>({
    mutationKey: ["deleteBasketData", countryName, regionName],
    mutationFn: deleteBasketData,
    networkMode: "always", // <- 추가!
    onSuccess: (response) => {
      console.log("✅ 장바구니 삭제 api 요청 성공", response);
    },
    onError: (err) => {
      console.error("❌ 장바구니 삭제 api 요청 실패", err);
      console.error(err.message);
    },
  });

  return {
    insertBasketDataMutate,
    insertBasketDataMutateAsync,
    deleteBasketDataMutate,
    deleteBasketDataMutateAsync,
  };
};

export default useBasketMutations;
