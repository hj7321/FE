import { useQuery } from "@tanstack/react-query";
import { getPlaceInformation } from "../../apis/information.api";
import { WIKIPEDIA_SEARCH_WORD } from "../../constants/wikipedia";
import DOMPurify from "dompurify";

interface CityInfoProps {
  cardName: string;
}

const CityInfo = ({ cardName }: CityInfoProps) => {
  const city = cardName.split(" ")[1];
  const { data } = useQuery<string, Error>({
    queryKey: ["cityInfo"],
    queryFn: () => getPlaceInformation(WIKIPEDIA_SEARCH_WORD[city]),
  });

  const cleanHTML = DOMPurify.sanitize(data!);

  return (
    <div className="text-[14px] overflow-y-auto scrollbar-custom pr-[10px]">
      <div dangerouslySetInnerHTML={{ __html: cleanHTML }} />
    </div>
  );
};

export default CityInfo;
