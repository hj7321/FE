import { useQuery } from "@tanstack/react-query";
import { ReadPlaceDetailResponse } from "../types/place.type";
import { readPlaceDetail } from "../apis/place.api";

const useReadPlaceDetail = (placeId: string) => {
  return useQuery<
    ReadPlaceDetailResponse,
    Error,
    ReadPlaceDetailResponse,
    string[]
  >({
    queryKey: ["readPlaceDetail", placeId],
    queryFn: () => readPlaceDetail({ placeId }),
    staleTime: 60 * 60 * 1000, // 1시간 동안 fresh 상태로 유지
    gcTime: 2 * 60 * 60 * 1000, // 2시간 동안 캐시 유지 (garbage collection 대상 제외)
    refetchOnWindowFocus: false, // 윈도우 포커스 시 자동 refetch 비활성화
    enabled: false,
    retry: 2,
  });
};

export default useReadPlaceDetail;
