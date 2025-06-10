import { useInfiniteQuery } from "@tanstack/react-query";
import { searchText } from "../apis/search.api";
import { SearchResult } from "../types/search.type";
import { Place } from "../types/place.type";

interface UseSearchTextOptions {
  enabled?: boolean;
}

const useSearchText = (
  searchValue: string,
  latitude: number,
  longitude: number,
  options?: UseSearchTextOptions
) => {
  return useInfiniteQuery<
    SearchResult,
    Error,
    Place[],
    string[],
    string | null
  >({
    queryKey: ["searchText", searchValue],
    queryFn: ({ pageParam = null }) =>
      searchText({
        text: searchValue,
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

export default useSearchText;
