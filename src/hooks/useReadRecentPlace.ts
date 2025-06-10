import { useQuery } from "@tanstack/react-query";
import { getRecentPlaceIds } from "../utils/getRecentPlaceIds";
import { RecentPlace } from "../types/place.type";
import { readRecentPlace } from "../apis/place.api";

const useReadRecentPlace = () => {
  const recentPlaceIds = getRecentPlaceIds();

  return useQuery<RecentPlace[], Error, RecentPlace[]>({
    queryKey: ["readRecentPlace", ...recentPlaceIds],
    queryFn: () => readRecentPlace(recentPlaceIds),
    staleTime: 60 * 60 * 1000, // 1시간 동안 fresh 상태로 유지
    gcTime: 2 * 60 * 60 * 1000, // 2시간 동안 캐시 유지 (garbage collection 대상 제외)
    refetchOnWindowFocus: false, // 윈도우 포커스 시 자동 refetch 비활성화
    retry: 1,
  });
};

export default useReadRecentPlace;
