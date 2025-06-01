import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { COUNTRY_CITY } from "../constants/countries";
import { WIKIPEDIA_SEARCH_WORD } from "../constants/wikipedia";
import { getPlaceInformation } from "../apis/information.api";

// 도시 정보들을 react-query 캐시에 미리 불러오는 커스텀 훅 정의
const usePrefetchCityInfos = () => {
  // 쿼리 클라이언트 인스턴스를 가져옴 (캐시 저장/조회에 사용)
  const queryClient = useQueryClient();

  // 컴포넌트가 처음 마운트될 때 한 번 실행
  useEffect(() => {
    // 비동기 함수로 도시 정보를 순회하여 프리패치함
    const preloadCityInfos = async () => {
      // COUNTRY_CITY는 { "대한민국": ["서울", "부산"], ... } 구조이므로
      // 모든 도시들을 평탄화(flat)해서 하나의 배열로 만듦
      const cityList = Object.values(COUNTRY_CITY).flat();

      // 각 도시마다 위키 검색어를 이용해 프리패치 요청
      for (const city of cityList) {
        // WIKIPEDIA_SEARCH_WORD에서 해당 도시의 검색어를 가져옴
        const searchWord = WIKIPEDIA_SEARCH_WORD[city];
        if (!searchWord) continue; // 검색어가 없으면 건너뜀

        // react-query의 캐시에 미리 쿼리 요청을 보내고 응답 데이터를 저장함
        queryClient.prefetchQuery({
          queryKey: ["cityInfo", city], // 쿼리 키는 도시 이름
          queryFn: () => getPlaceInformation(searchWord), // 호출할 비동기 API 함수
          staleTime: 60 * 60 * 1000, // fresh 상태를 1시간 유지
          gcTime: 2 * 60 * 60 * 1000, // 캐시는 2시간 동안 유지되고 이후 정리됨
        });
      }
    };

    preloadCityInfos(); // 위에 정의한 preload 함수를 바로 실행
  }, [queryClient]); // queryClient가 바뀌면 다시 실행 (일반적으로 바뀌지 않음)
};

export default usePrefetchCityInfos;
