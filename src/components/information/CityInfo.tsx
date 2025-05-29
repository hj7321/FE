import { useQuery } from "@tanstack/react-query";
import { getPlaceInformation } from "../../apis/information.api";
import { WIKIPEDIA_SEARCH_WORD } from "../../constants/wikipedia";
import DOMPurify from "dompurify";

interface CityInfoProps {
  cardName: string;
}

const CityInfo = ({ cardName }: CityInfoProps) => {
  const city = cardName.split(" ")[1];
  const { data, error, isError } = useQuery<string, Error>({
    queryKey: ["cityInfo", city],
    queryFn: () => getPlaceInformation(WIKIPEDIA_SEARCH_WORD[city]),
    staleTime: 60 * 60 * 1000, // 1시간 동안 fresh 상태로 유지
    gcTime: 2 * 60 * 60 * 1000, // 2시간 동안 캐시 유지 (garbage collection 대상 제외)
    refetchOnWindowFocus: false, // 윈도우 포커스 시 자동 refetch 비활성화
    refetchInterval: 10 * 60 * 1000, // 10분마다 자동 refetch (배경 refetch 포함)
  });

  // 받아온 HTML 문자열을 XSS 방지를 위해 정화
  const cleanHTML = DOMPurify.sanitize(data!);

  return (
    <div className="text-[14px] overflow-y-auto scrollbar-custom pr-[10px]">
      {/* 정제된 HTML을 dangerouslySetInnerHTML을 통해 렌더링 */}
      <div dangerouslySetInnerHTML={{ __html: cleanHTML }} />
    </div>
  );
};

export default CityInfo;
