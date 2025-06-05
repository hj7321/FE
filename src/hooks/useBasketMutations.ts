import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import {
  DeleteBasketDataType,
  InsertBasketDataType,
} from "../types/place.type";
import { deleteBasketData, insertBasketData } from "../apis/basket.api";

const useBasketMutations = (place: string) => {
  const { mutate: insertBasketDataMutate } = useMutation<
    AxiosResponse,
    Error,
    InsertBasketDataType
  >({
    mutationKey: ["insertBasketData", place],
    mutationFn: insertBasketData,
    onSuccess: (response) => {
      console.log("✅ 장바구니 추가 api 요청 성공", response);
    },
    onError: (err) => {
      console.error("❌ 장바구니 추가 api 요청 실패", err);
      console.error(err.message);
    },
  });

  const { mutate: deleteBasketDataMutate } = useMutation<
    AxiosResponse,
    Error,
    DeleteBasketDataType
  >({
    mutationKey: ["deleteBasketData", place],
    mutationFn: deleteBasketData,
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
    deleteBasketDataMutate,
  };
};

export default useBasketMutations;
