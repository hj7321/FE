import { useQuery } from "@tanstack/react-query";
import { getPlaceInformation } from "../../apis/information.api";

interface CityInfoProps {
  cardName: string;
}

const CityInfo = ({ cardName }: CityInfoProps) => {
  const city = cardName.split(" ")[1];
  const { data } = useQuery<string, Error>({
    queryKey: ["cityInfo"],
    queryFn: () => getPlaceInformation(city),
  });

  console.log(data);

  return (
    <p className="text-[14.5px] overflow-y-auto scrollbar-custom pr-[10px]">
      {data}
    </p>
  );
};

export default CityInfo;
