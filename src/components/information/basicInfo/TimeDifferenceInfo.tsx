import { getCityInfo } from "../../../utils/getCityInfo";
import { COUNTRY_BASIC_INFO } from "../../../constants/countryBasicInfo";

interface TimeDifferenceInfoProps {
  cardName: string;
}

const TimeDifferenceInfo = ({ cardName }: TimeDifferenceInfoProps) => {
  const [country, city] = cardName.split(" ");
  const information = COUNTRY_BASIC_INFO[country];

  return (
    <div className="flex gap-[15px] items-center">
      <div className="flex w-[53px] justify-between items-center">
        <img
          src="/images/time-difference.svg"
          alt="time-difference"
          className="w-[20px] h-[20px] text-[10px]"
        />
        <p className="text-[#8A8A8A] text-[15px]">시차</p>
      </div>
      <p className="text-[15px]">{getCityInfo(city, information, "시차")}</p>
    </div>
  );
};

export default TimeDifferenceInfo;
