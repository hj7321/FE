import { useQuery } from "@tanstack/react-query";
import { InsertBasketDataType, Place } from "../types/place.type";
import { readBasket } from "../apis/basket.api";
import { useAuthStore } from "../stores/auth.store";

const useReadBasket = (countryName: string, regionName: string) => {
  const isLogin = useAuthStore((state) => state.isLogin);

  const { data: basketData } = useQuery<
    InsertBasketDataType,
    Error,
    Place[],
    string[]
  >({
    queryKey: ["readBasket", countryName, regionName],
    queryFn: () => readBasket({ countryName, regionName }),
    staleTime: 60 * 60 * 1000, // 1시간 동안 fresh 상태로 유지
    gcTime: 2 * 60 * 60 * 1000, // 2시간 동안 캐시 유지 (garbage collection 대상 제외)
    refetchOnWindowFocus: false, // 윈도우 포커스 시 자동 refetch 비활성화
    enabled: isLogin && !!countryName && !!regionName,
    retry: 2,
    select: (data) => data.places,
  });

  return basketData;
};

export default useReadBasket;
