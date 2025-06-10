import { useQuery } from "@tanstack/react-query";
import { getLatLngByAddress } from "../apis/geocoding.api";

const useLatLng = (address: string) => {
  return useQuery({
    queryKey: ["latLng", address],
    queryFn: async () => {
      const geoData = await getLatLngByAddress(address);
      if (geoData.status !== "OK" || !geoData.results.length) {
        throw new Error("주소 변환 실패");
      }
      return geoData.results[0].geometry.location; // { lat, lng }
    },
    staleTime: 60 * 60 * 1000, // 1시간 동안 fresh 상태로 유지
    gcTime: 2 * 60 * 60 * 1000, // 2시간 동안 캐시 유지 (garbage collection 대상 제외)
    refetchOnWindowFocus: false, // 윈도우 포커스 시 자동 refetch 비활성화
    refetchInterval: 10 * 60 * 1000, // 10분마다 자동 refetch (배경 refetch 포함)
    retry: 1,
    enabled: !!address,
  });
};

export default useLatLng;
