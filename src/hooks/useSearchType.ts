import { useInfiniteQuery } from "@tanstack/react-query";
import { SearchResult } from "../types/search.type";
import { searchType } from "../apis/search.api";
import { TravelPlanButton } from "../types/button.type";
import { Place } from "../types/place.type";

interface UseSearchTypeOptions {
  enabled?: boolean;
}

const useSearchType = (
  typeValue: TravelPlanButton,
  latitude: number,
  longitude: number,
  options?: UseSearchTypeOptions
) => {
  return useInfiniteQuery<
    SearchResult,
    Error,
    Place[],
    string[],
    string | null
  >({
    queryKey: ["searchType", typeValue],
    queryFn: ({ pageParam = null }) =>
      searchType({
        type: typeValue,
        latitude,
        longitude,
        pageToken: pageParam,
      }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.pageToken,
    staleTime: 60 * 60 * 1000, // 1시간 동안 fresh 상태로 유지
    gcTime: 2 * 60 * 60 * 1000, // 2시간 동안 캐시 유지 (garbage collection 대상 제외)
    refetchOnWindowFocus: false, // 윈도우 포커스 시 자동 refetch 비활성화
    refetchInterval: 10 * 60 * 1000, // 10분마다 자동 refetch (배경 refetch 포함)
    retry: 1,
    enabled: options?.enabled,
    select: ({ pages }) => {
      console.log(pages);
      return pages.flatMap((page) => page.places);
    },
  });
};

export default useSearchType;
