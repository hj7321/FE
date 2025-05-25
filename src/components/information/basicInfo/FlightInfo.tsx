import { COUNTRY_BASIC_INFO } from "../../../constants/countryBasicInfo";
import { getCityInfo } from "../../../utils/getCityInfo";

interface FlightInfoProps {
  cardName: string;
}

const FlightInfo = ({ cardName }: FlightInfoProps) => {
  const [country, city] = cardName.split(" ");
  const information = COUNTRY_BASIC_INFO[country];

  return (
    <div className="flex gap-[15px] items-center">
      <div className="flex w-[47px] justify-between items-center">
        <img
          src="/images/flight.svg"
          alt="flight"
          className="w-[15px] h-[14px] text-[10px]"
        />
        <p className="text-[#aaaaaa] text-[15px]">항공</p>
      </div>
      <p className="text-[15px]">{getCityInfo(city, information, "항공")}</p>
    </div>
  );
};

export default FlightInfo;
